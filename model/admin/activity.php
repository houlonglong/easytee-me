<?php
use PtLib as PtLib;

/**
 * 众筹管理
 */
class Model_Admin_Activity extends Model_Admin_Abstract
{
    static $table = "et_activity_info";

    function __construct()
    {
        parent::__construct();
    }

    /**
     * 重新生成活动图片
     * @param $id
     * @param $url
     */
    function action_re_gen_img($id,$url){
        self::_db()->update("activities",array("thumb_img_url"=>"","thumb_svg_url"=>""),array("id"=>$id));
        self::_db()->update("et_activity_info",array("thumb_img_url"=>"","thumb_svg_url"=>""),array("id"=>$id));
        self::_db()->delete("et_activity_product",array("activity_id"=>$id));
        self::_location($url);
    }

    /**
     * 成功结束活动
     * @param $id
     * @return array
     */
    function action_do_success($id){
        //self::_db()->update("et_activity_info",array("status"=>3),array("id"=>$id));
        return array("操作成功");
    }

    /**
     * 使活动设为失败
     * @param $id
     * @return array
     */
    function action_do_fail($id){
        //self::_db()->update("et_activity_info",array("status"=>2),array("id"=>$id));
        return array("操作成功");
    }
    /**
     * 活动详情
     * @return array
     */
    static function activity_detail($id)
    {
        $activity_info = Model_Activity::detail_info($id);
        return $activity_info;
    }


    /**
     * 活动列表
     */
    function action_list()
    {
        $table = self::$table;
        $table_alias = 'a';
        $join = ' inner join et_user as u on u.id = a.uid ';
        if (empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("verify","production_status","ship_status","uid","rows", "page", "sidx", "sord", "activity_id", "activity_name", "username", "mobile", 'startDate', 'endDate', 'pass', 'status', 'success');
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];
        $username = $request['username'];

        //fields
        $select_fields = " a.*";
        //where
        $args = array();
        if (empty($limit)) $limit = 20;
        if (empty($page)) $page = 1;
        if (empty($sort)) {
            $sort = "id";
            $sort_type = "desc";
        } else {
            if (empty($sort_type)) $sort_type = "desc";
        }

        $where = " where 1=1 ";
        $args =array();

        if($request['uid']){
            $where .= 'and a.uid = ? ';
            $args[] = $request['uid'];
        }

        if ($request['verify'] === "0" || $request['verify'] > 0) {
            $where .= 'and a.verify = ? ';
            $args[] = $request['verify'];
        }

        if ($request['status'] === "0" || $request['status'] > 0) {
            if($request['status'] == 1){//进行中
                $where .= 'and a.start_time < now() and now() < a.end_time and a.status = 1';
            }
            if($request['status'] == 10){//结束
                $where .= 'and now() > a.end_time and a.status > 0';
            }
            if($request['status'] == 0){//草稿
                $where = 'and a.status = 0 ';
            }
            if($request['status'] == 2){//失败的
                $where = 'and a.status = 2 ';
            }
            if($request['status'] == 3){//成功的
                $where = 'and a.status = 3 ';
            }
        }

        if ($request['activity_id']) {
            $where .= " and a.id = ? ";
            $args[] = $request['activity_id'];
        }
        if ($request['activity_name']) {
            $where .= " and a.name like '%" . mysql_escape($request['activity_name']) . "%' ";
        }


        //order
        $order = "";
        if ($sort)
            $order = "order by a." . addslashes($sort) . " " . $sort_type;
        $sql = "select count(a.id) as total from $table as a $join $where ";
        //$count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql, $args);
        $records = $count_res['total'];
        $response = new stdClass();
        $response->page = $page;  //cur page

        if ($records > 0) {
            $total_pages = ceil($records / $limit);
        } else {
            $total_pages = 1;
        }
        if ($page > $total_pages) $page = $total_pages;

        $response->total = $total_pages;      //total pages
        $response->records = $records; //count

        $skip = ($page - 1) * $limit;

        $sql = "select $select_fields from $table as a $join $where $order limit $skip,$limit ";
        //$rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql, $args);
        foreach ($rows as $row) {
            $response->rows[] = array(
                'id' => $row['id'],
                "cell" => $row
            );
        }
        return $response;
    }

    /**
     * 导出活动订单
     * @param $id
     * @throws Exception
     */
    static function action_download_excel($id)
    {
        if(!$id) throw new Exception("ID 不能为空");
        $table = self::$table;
        //fields
        $select_fields = "ship.name,ship.tel,ship.province,ship.city,ship.county,ship.addr,
                p.name as product_name,style.color_name as style_name,
                o.exp_price ,o.order_no,
                goods.quantity,goods.pro_size,man.short_name,
                brand.name as brand_name,pay.pay_status ";

        $join = " left join et_order as o on o.id = goods.order_id
                    left join et_order_activity as act on act.order_id = o.id
                    left join et_order_pay as pay on pay.order_id = o.id
                    left join et_order_ship as ship on ship.order_id = o.id
                    left join et_product_style as style on style.id = goods.style_id
                    left join et_product as p on p.id = style.product_id
                    left join et_product_brand as brand on brand.id = p.brand_id
                    left join et_product_manufacturer as man on man.id = brand.man_id";
        $where = 'where act.activity_id = ? and pay.pay_status > 0';

        $sql = "select $select_fields from et_order_goods as goods $join $where";

        $csv = "活动ID,订单号,付款状态,收件人,联系电话,收货地址,厂家,品类,产品名,款式,尺码,数量\r\n";
        $rows = self::_db()->select_rows($sql, $_REQUEST['id']);
        foreach ($rows as $row) {
            $csv .= $_REQUEST['id'] . ",";
            $csv .= $row['order_no'] . ",";
            $csv .= ($row['pay_status'] == 1) ? "已付款,":"已退款,";
            $csv .= $row['name'] . ",";
            $csv .= $row['tel'] . ",";
            $csv .= $row['province'] . $row['city'] . $row['county'] . $row['addr'] . ",";
            $csv .= $row['short_name'] . ",";
            $csv .= $row['brand_name'] . ",";
            $csv .= $row['product_name'] . ",";
            $csv .= $row['style_name'] . ",";
            $csv .= $row['pro_size'] . ",";
            $csv .= $row['quantity'];
            $csv .= "\r\n";
        }
        response_csv($csv,"order_".date("Y-m-d-H-i-s").".csv");

    }

    /**
     * 审核活动
     */

    function action_audit($id)
    {
        if ($id) {
            PtLib\db()->update('activities', array('pass' => 1), array('id' => $id));
        }
    }

    /**
     * 删除活动
     * @param $id
     * @return array
     */
    function action_remove($id){
        self::_db()->delete("activities",array("id"=>$id));
        self::_db()->delete("et_activity_info",array("id"=>$id));
        return "删除成功";
    }

    function action_audit_back()
    {
        $id = $this->_request('id');
        if ($id) {
            $fields['activity_id'] = $id;
            $reason = $this->_request('reason');
            $notes = $this->_request('notes');
            if ($reason) {
                $fields['reason'] = $reason;
            }
            if ($notes) {
                $fields['notes'] = $notes;
            }
            $fields['username'] = 1;
            $fields['create_time'] = date('Y-m-d H:i:s');
            self::_db()->insert('audit_reasons', $fields);
            PtLib\db()->update('activities', array('pass' => 2), array('id' => $id));
        }

    }

    /**
     * 批量发货
     */
    function action_bulk_shipment()
    {
        $stringId = $this->_request('ids');
        if ($stringId) {
            try {
                $rows = PtLib\db()->run_sql('update orders set status="已发货" where id in (' . $stringId . ')');
                if (!$rows) {
                    throw new Exception('发货失败');
                }
                $count = count(explode(',', $stringId));
                $rows = Ptlib\db()->run_sql('update activity_produces set order_shipped_count= `order_shipped_count`+' . $count .
                    ' where activity_id = ' . $this->_request('activity_id') . ' and order_count != `order_shipped_count`+' . $count);
                if (!$rows) {
                    $row = Ptlib\db()->run_sql('update activity_produces set order_shipped_count= `order_shipped_count`+' . $count .
                        ',status="已发货" where activity_id = ' . $this->_request('activity_id') . ' and order_count = `order_shipped_count`+' . $count);
                    if (!$rows) {
                        throw new Exception('发货失败');
                    }
                }
                return array(1);
            } catch (Exception $e) {
                return array(0);
            }
        }
    }

    /**
     * 添加快递单号
     */
    function action_add_order_no()
    {
        $expressId = $this->_request('express_id');
        $orderId = $this->_request('id');
        $expressNo = $this->_request('express_no');
        if($expressId){
            $datas['express_id'] = $expressId;
        }
        if($expressNo){
            $datas['express_no'] = $expressNo;
        }
        $datas[ 'order_id'] = $orderId;

        if ($orderId) {
            $orderExpressId = PtLib\db()->select_row('select id from order_expresses where order_id=?', $orderId);
            // 存在更新，不存在创建
            if ($orderExpressId) {
                PtLib\db()->update('order_expresses', $datas,array('id'=>$orderExpressId['id']));
            } else {
                PtLib\db()->insert('order_expresses', $datas);
            }
        }
    }

    static function get_express_info()
    {
        $rows = PtLib\db()->select_rows('select id,name from expresses');
        return $rows;
    }
}
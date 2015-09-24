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
    function action_get_act_info(){

        $act = self::_db()->select_row("select a.name,a.id,a.design_id,region.region,a.default_product_style_id,image.imgurl,ps.color,ps.color_name,d.svg_front,d.svg_front_image
        from activities as a
        left join design_svgs as d on d.design_id = a.design_id
left join app_product_styles as aps on aps.id = a.default_product_style_id
left join product_styles as ps on ps.id = aps.product_style_id
left join product_style_images as image on image.side = 'front' and image.product_style_id = aps.product_style_id
left join product_style_image_regions as region on  region.product_style_image_id = image.id
where a.default_product_style_id is not null and a.thumb is null and a.uid <> 0 and d.svg_front is not null order by a.id asc
limit 1");
        $act['imgurl'] = replace_cdn($act['imgurl']);
        if(!$act['svg_front_image']){
            $act['svg_front_image'] = Model_Aliyun_Oss::upload_content($act['svg_front'],"design/svg/".$act['design_id']."/front.svg");
            self::_db()->update("design_svgs",array("svg_front_image"=>$act['svg_front_image']),array("design_id"=>$act['design_id']));
        }
        return $act;
    }
    function action_re_gen_img($id,$url){
        self::_db()->update("activities",array("thumb_img_url"=>"","thumb_svg_url"=>""),array("id"=>$id));
        self::_db()->update("et_activity_info",array("thumb_img_url"=>"","thumb_svg_url"=>""),array("id"=>$id));
        self::_db()->delete("et_activity_product",array("activity_id"=>$id));
        self::_location($url);
    }
    /**
     * 详情
     * @return array
     */
    static function activity_detail($id)
    {
        $activity_info = Model_Activity::detail_info($id);
        return $activity_info;
    }

    /**
     * 详情
     * @param $id
     * @return array
     */
    static function detail($id)
    {
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?", $id);
        return $row;
    }

    static function action_detail_list()
    {

        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = ' inner join users as u on u.id = ' . $table_alias . '.uid  inner join orders as o on o.activity_id = ' . $table_alias . '.id' .
            ' left join order_expresses as oe on oe.order_id = o.id left join expresses as e on e.id = oe.express_id ';
//            ' inner join products as p on p.id = ps.product_id inner join manufacturer_brands as m on m.id = p.manufacturer_brand_id
//                   ';
        if (empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows", "page", "sidx", "sord", "status");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " o.*,oe.express_no,e.name as express_name ";

        if (empty($limit)) $limit = 20;
        if (empty($page)) $page = 1;
        if (empty($sort)) {
            $sort = "id";
            $sort_type = "desc";
        } else {
            if (empty($sort_type)) $sort_type = "desc";
        }
        $where = 'where ' . $table_alias . '.id = ?';
        $args[] = $_REQUEST['id'];
        //order
        $order = "";
        if ($sort)
            $order = "order by $table_alias." . addslashes($sort) . " " . $sort_type;
        $sql = "select count($table_alias.id) as total from $table $join $where ";
        //$count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql, $_REQUEST['id']);
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
        if ($request['status']) {
            $where .= ' and o.status=?';
            $args[] = $request['status'];
        }

        $sql = "select $select_fields from $table $join $where $order limit $skip,$limit ";
        //$rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql, $args);
        foreach ($rows as $row) {
            $response->rows[] = array(
                'id' => $row['id'],
                "cell" => $row
            );
        }
//        var_dump($sql);exit;
        return $response;
    }


    /**
     * 列表
     */
    function action_list()
    {
        return self::table_list();
    }


    function view_detail_design()
    {
        $table = self::$table;
        $request = PtLib\http_request("id");
        $act_id = $request['id'];

        $act_product_styles = PtLib\db_select_rows("select
              aps.*,p.name as p_name,psi.imgurl,psi.side,ps.color,psir.x,psir.y,psir.w,psir.h,psir.region
                      from activity_product_styles as aps
                      left join products as p on p.id = aps.product_id
                      left join product_style_images as psi on psi.product_style_id = aps.product_style_id and psi.product_id = aps.product_id
                      left join product_styles as ps on ps.id = aps.product_style_id
                      left join product_style_image_regions as psir on psi.id = psir.product_style_image_id
                      where aps.activity_id = ?", $act_id);

        //PtLib\print_json($act_product_styles);
        $act = self::detail($act_id);
        $design_id = $act['design_id'];

        $design_svgs = PtLib\db()->select_rows("select * from design_svg_side where design_id = ?", $design_id);
        $design_product = PtLib\db()->select_rows("select * from design_product_maps where design_id = ?", $design_id);
        $canvas = PtLib\db()->select_rows("select * from canvas where design_id = ?", $design_id);

        $canvas_objects = PtLib\db()->select_rows("select co.*,a.url from canvas_objects as co
              left join canvas as c on c.id = co.canvas_id
              left join arts as a on a.id = co.art_id
              where c.design_id = ?", $design_id);
        $_act_product_styles = array();
        foreach($act_product_styles as $act_product_style){
            $act_product_style['imgurl'] = replace_cdn($act_product_style['imgurl']);
            $_act_product_styles[$act_product_style['app_product_id']][] = $act_product_style;
        }
        //print_pre($design_svgs);
        $svgs = array();
        foreach($design_svgs as $design_svg){
            $svgs[$design_svg['side']] = $design_svg['svg_url'];
        }

        $res = array(
            "design_product" => $design_product,
            "canvas" => $canvas,
            "svgs" => $svgs,
            "canvas_objects" => $canvas_objects,
            "design_svgs" => $design_svgs,
            "act_product_styles" => $_act_product_styles,
        );
        //print_pre($res);
        return $res;
    }


    /**
     * 修改
     */
    function action_edit()
    {
        return self::table_edit();
    }


    /*
    * 修改
    */
    static function table_edit()
    {
        $table = self::$table;
        if (empty($table)) throw new ErrorException("table is not defined");
        $request = PtLib\http_request("oper");
        $oper = $request['oper'];
        $id = empty($_REQUEST['id']) ? "" : $_REQUEST['id'];
        $condition = array("id" => $id);
        $data = PtLib\http_request("name", 'status', 'real_end_time', 'pass');
        $data['real_end_time'] = date('Y-m-d H:i:s', strtotime($data['real_end_time']));
        if ($oper == 'edit' && $id && $data) {
            PtLib\db()->update($table, $data, $condition);
        }
        if ($oper == 'add') {
            PtLib\db()->insert($table, $data);
        }
        if ($oper == 'del' && $id && $data) {
            PtLib\db()->delete($table, $condition);
        }
        return array();
    }


    /*
    * 列表
    */
    static function table_list()
    {
        $table = self::$table;
        $table_alias = 'a';
        $join = ' inner join et_user as u on u.id = a.uid ';
        if (empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("verify","production_status","ship_status","rows", "page", "sidx", "sord", "activity_id", "activity_name", "username", "mobile", 'startDate', 'endDate', 'pass', 'status', 'success');
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

        if ($request['verify'] === "0" || $request['verify'] > 0) {
            $where .= 'and a.verify = ? ';
            $args[] = $request['verify'];
        }

        if ($request['status'] === "0" || $request['status'] > 0) {
            if($request['status'] == 1){//进行中
                $where .= 'and a.start_time < now() and now() < a.end_time ';
            }
            if($request['status'] == 10){//结束
                $where .= 'and now() > a.end_time ';
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

//        if ($request['production_status'] >= 0 ) {
//            if($request['production_status'] == 0){//
//                $where .= 'and a.production_status = 0 ';
//            }
//            if($request['production_status'] == 1){//
//                $where .= 'and a.production_status = 1 ';
//            }
//            if($request['production_status'] == 2){//
//                $where .= 'and a.production_status = 2 ';
//            }
//        }
//        if ($request['ship_status'] >= 0 ) {
//            if($request['ship_status'] == 0){//
//                $where .= 'and a.ship_status = 0 ';
//            }
//            if($request['ship_status'] == 1){//
//                $where .= 'and a.ship_status = 1 ';
//            }
//            if($request['ship_status'] == 2){//
//                $where .= 'and a.ship_status = 2 ';
//            }
//        }
        if ($request['activity_id']) {
            $where .= " and a.id = ? ";
            $args[] = $request['activity_id'];
        }
        if ($request['activity_name']) {
            $where .= " and a.name like '%" . mysql_escape($request['activity_name']) . "%' ";
        }
//        if ($request['startDate']) {
//            $where .= ' and ' . $table_alias . '.start_time >="' . date('Y-m-d 00:00:00', strtotime($request['startDate'])) . '"';
//        }
//
//        if ($request['endDate']) {
//            $where .= ' and ' . $table_alias . '.real_end_time <="' . date('Y-m-d 23:59:59', strtotime($request['endDate'])) . '"';
//        }


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
     * @param
     * @return
     *
     * function action_test(){
     * $request = PtLib\http_request("id");
     * $data = array();
     * $data['id'] = $request;
     * return $data;
     * }
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
                brand.name as brand_name";

        $join = " left join et_order as o on o.id = goods.order_id
                    left join et_order_activity as act on act.order_id = o.id
                    left join et_order_pay as pay on pay.order_id = o.id
                    left join et_order_ship as ship on ship.order_id = o.id
                    left join et_product_style as style on style.id = goods.style_id
                    left join et_product as p on p.id = style.product_id
                    left join et_product_brand as brand on brand.id = p.brand_id
                    left join et_product_manufacturer as man on man.id = brand.man_id";
        $where = 'where act.activity_id = ? and pay.pay_status = 1';

        $sql = "select $select_fields from et_order_goods as goods $join $where";

        $csv = "活动ID,订单号,付款状态,收件人,联系电话,收货地址,厂家,品类,产品名,款式,尺码,数量\r\n";
        $rows = self::_db()->select_rows($sql, $_REQUEST['id']);
        foreach ($rows as $row) {
            $csv .= $_REQUEST['id'] . ",";
            $csv .= $row['order_no'] . ",";
            $csv .= "已付款,";
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

    function action_audit()
    {
        $id = $this->_request('id');
        if ($id) {
            PtLib\db()->update('activities', array('pass' => 1), array('id' => $id));
        }
    }
    function action_remove($id){
        self::_db()->delete("activities",array("id"=>$id));
        self::_db()->delete("et_activity_info",array("id"=>$id));
        return array();
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
    static function success()
    {
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = ' inner join users as u on u.id = ' . $table_alias . '.uid ';
        if (empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows", "page", "sidx", "sord", "activity_id", "activity_name", "username", "mobile", 'startDate', 'endDate', 'pass', 'status', 'success');
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];
        $username = $request['username'];

        //fields
        $select_fields = " $table_alias.*,u.nick_name ";
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
        if ($request['status']) {
            $where = 'where ' . $table_alias . '.status =? ';
            $args[] = $request['status'];

        } else {
            $where = 'where ' . $table_alias . '.status !="create" ';
        }


        if ($request['mobile']) {
            $where .= " and u.mobile = ? ";
            $args[] = $request['mobile'];
        }
        if ($username) {
            $where .= " and u.nick_name = ? ";
            $args[] = $username;
        }
        if ($request['activity_id']) {
            $where .= " and id = ? ";
            $args[] = $request['activity_id'];
        }
        if ($request['activity_name']) {
            $where .= " and " . $table_alias . ".name like '%" . mysql_escape($request['activity_name']) . "%' ";
        }
        if ($request['startDate']) {
            $where .= ' and ' . $table_alias . '.start_time >="' . date('Y-m-d 00:00:00', strtotime($request['startDate'])) . '"';
        }

        if ($request['endDate']) {
            $where .= ' and ' . $table_alias . '.real_end_time <="' . date('Y-m-d 23:59:59', strtotime($request['endDate'])) . '"';
        }
        //order
        $order = "";
        if ($sort)
            $order = "order by $table_alias." . addslashes($sort) . " " . $sort_type;
        //$count_res = db()->select_row($sql,$args);
//        $count_res = PtLib\db()->select_row($sql, $args);


        $sql = "select $select_fields from $table $join $where $order  ";
        //$rows = db()->select_rows($sql,$args);

        $rows = PtLib\db()->select_rows($sql, $args);

        $response = array();
        foreach ($rows as $row) {
            //筛选出成功的众筹
            $profie = Model_Cost::calculate_profie($row['id']);
            if ($profie <= 0 && $row['status'] != 'fabrication') {
                continue;
            }
            $response[] = $row;

        }
        $records = count($response);
        $return = new stdClass();
        $return->page = $page;  //cur page

        if ($records > 0) {
            $total_pages = ceil($records / $limit);
        } else {
            $total_pages = 1;
        }
        if ($page > $total_pages) $page = $total_pages;

        $return->total = $total_pages;      //total pages
        $return->records = $records; //count

        $skip = ($page - 1) * $limit;
        $count = $limit + $skip;
        if ($count > $records) {
            $count = $records;
        }

        for ($i = $skip; $i < $count; $i++) {
            $return->rows[] = array(
                'id' => $response[$i]['id'],
                "cell" => $response[$i]
            );
        }
        return $return;

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
     *添加快递单号
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
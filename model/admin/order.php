<?php
/**
 * 订单管理
 */
class Model_Admin_Order extends Model_Admin_Abstract{
    static $table = "et_order";
    function __construct(){
        parent::__construct();
    }
    /**
     * 详情
     * @return array
     */
    function action_order_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }

    /**
     * 详情
     * @param $id
     * @return array
     */
    static function order_detail($id){
        $order = self::_db()->select_row('SELECT
                          act.activity_id,a.end_time,a.thumb_img_url,pay.*,ship.*,o.*
                         FROM et_order AS o
                         LEFT JOIN et_order_activity as act on act.order_id = o.id
                         LEFT JOIN et_order_pay as pay on pay.order_id = o.id
                         LEFT JOIN et_order_ship as ship on ship.order_id = o.id
                         LEFT JOIN et_activity_info AS a ON a.id = act.activity_id
                         where o.id = ? ',$id);

        return $order;
    }
    /**
     * 详情
     * @param $id
     * @return array
     */
    static function goods_list($id){
        return self::_db()->select_rows('SELECT g.*,brand.name as brand_name,style.color,style.color_name,p.name as product_name,ap.img_url FROM et_order_goods as g
                        left join et_product_style as style on style.id = g.style_id
                        left join et_activity_product as ap on ap.activity_id = g.activity_id and style.product_id=ap.product_id
                        left join et_product as p on p.id = style.product_id
                        left join et_product_brand as brand on brand.id = p.brand_id WHERE g.order_id = ?',$id);

    }

    function action_goods_list($id)
    {

        $rows = self::_db()->select_rows('SELECT
                goods.*, brand.name as brand_name,
                p.name as product_name,
                ps.color_name as style_name,
                (goods.quantity * goods.sell_price) as total_price,
                cat.name as cat_name,
                date_add(a.end_time, interval 7 day) as end_time
            FROM
                et_order_goods AS goods
            LEFT JOIN et_order AS o ON o.id = goods.order_id
            LEFT JOIN et_order_activity AS act ON act.order_id = o.id
            LEFT JOIN et_activity_info AS a ON a.id = act.activity_id
            LEFT JOIN et_product_style AS ps ON ps.id = goods.style_id
            LEFT JOIN et_product AS p on p.id = ps.product_id
            LEFT JOIN et_product_brand AS brand ON brand.id = p.brand_id
            LEFT JOIN et_product_cat_map as map on map.product_id = p.id
            LEFT JOIN et_product_cat as cat on cat.id = map.cat_id where o.id = ?', $id);

        return $rows;
    }
    /**
     * 列表
     **/
    function action_list($rows,$page,$sidx,$sord,$order_no,$activity_name,$mobile,$pay_status,$ship_status,$activity_id,$exp_no){

        $table = self::$table;
        $table_alias = "o";
        $join = ' left join et_user as u on u.id = o.uid
        left join et_order_activity as act on act.order_id = o.id
        left join et_activity_info as a on a.id = act.activity_id
        left join et_order_ship as ship on ship.order_id = o.id
        left join et_order_pay as pay on pay.order_id = o.id ';


        $limit = $rows;
        $sort = $sidx;
        $sort_type = $sord;

        //fields
        $select_fields = "a.name as activity_name,u.nick_name,act.activity_id,pay.*,ship.*,o.*";

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)) $sort = "id";
        if(empty($sort_type)) $sort_type = "desc";

        //where
        $args = array();
        $where  = " where 1=1 and a.name is not null ";
        if($activity_name){
            $where .= 'and a.name like "%'.$activity_name.'%" ';
        }
        if($order_no){
            $where .= 'and o.order_no = ? ';
            $args[] = $order_no;
        }
        if($exp_no){
            $where .= 'and ship.exp_no = ? ';
            $args[] = $exp_no;
        }
        if($mobile){
            $where .= 'and u.mobile = ? ';
            $args[] = $mobile;
        }
        if($pay_status === '0' || $pay_status == '1'){
            $where .= 'and pay.pay_status = ? ';
            $args[] = $pay_status;

        }
        if($ship_status === '0' || $ship_status == '1'){
            $where .= 'and pay.ship_status = ? ';
            $args[] = $ship_status;
        }

        if($activity_id){
            $where .= 'and a.id = ? ';
            $args[] = $activity_id;
        }
        //order
        $order = "o.id desc";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table as o $join $where ";
        $count_res = self::_db()->select_row($sql,$args);
        $records = $count_res['total'];
        $response = new stdClass();
        $response->page    = $page;  //cur page

        if( $records > 0 ) {
            $total_pages = ceil($records/$limit);
        }
        else {
            $total_pages = 1;
        }
        if ($page > $total_pages) $page=$total_pages;

        $response->total   = $total_pages;      //total pages
        $response->records = $records; //count

        $skip = ($page - 1) * $limit;
        $sql = "select $select_fields from $table as o $join $where $order limit $skip,$limit ";
        $rows = self::_db()->select_rows($sql,$args);
        foreach($rows as $row){
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }


    /**
     * 修改
     **/
    function action_edit(){
        return self::table_edit();
    }


    /*
    * 修改
    **/
    static function table_edit(){
        $table = self::$table;
        if(empty($table)) throw new ErrorException("table is not defined");
        $request = PtLib\http_request("oper");
        $oper = $request['oper'];
        $id = empty($_REQUEST['id'])?"":$_REQUEST['id'];
        $condition = array("id"=>$id);
        $data = PtLib\http_request("status");
        if($oper == 'edit' && $id && $data){
            //pt_log($data);
            //pt_log($condition);
            PtLib\db()->update($table,$data,$condition);
        }
        if($oper == 'add'){
            PtLib\db()->insert($table,$data);
        }
        if($oper == 'del'&& $id && $data){
            PtLib\db()->delete($table,$condition);
        }
        return array();
    }


}
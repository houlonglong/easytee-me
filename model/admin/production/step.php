<?php
/**
 * 待生产
 */
class Model_Admin_Production_Step extends Model_Admin_Abstract{
    static $table = "activities";
    function __construct(){
        //parent::__construct();
    }
    /**
     * 详情视图
     */
    function view_detail($id){
        $info = Model_Activity::detail_info($id);

        foreach($info['styles'] as $product_id => $styles){
            foreach($styles as $style_key =>$style){
                $style_id = $style['product_style_id'];
                $info["styles"][$product_id][$style_key]["sizes"] = self::_db()->select_rows("select
                        goods.pro_size,sum(goods.quantity) as quantity,brand.name as brand_name ,product.name as product_name
                        from et_order_goods as goods
                        left join et_product_style as style on style.id = goods.style_id
                        left join et_product as product on product.id = style.product_id
                        left join et_product_brand as brand on brand.id = product.brand_id
                        where goods.activity_id = ? and goods.style_id = ?  group by goods.pro_size ",$id,$style_id);
            }
        }

        $manufacturers = self::_db()->select_rows("select * from et_product_manufacturer");

        $produce = self::_db()->select_row("select
              produce.*,m.name as m_name
              from et_activity_produce as produce
              left join et_product_manufacturer as m on m.id = produce.man_id
              where produce.id = ?",$id);
        $res = array(
            "produce"=>$produce,
            "info"=>$info,
            "manufacturers"=>$manufacturers,
        );
        //print_r($res);exit;
        return $res;
    }
    function action_do_confirm($activity_id,$craft,$manufacturer_id,$operator_id){
        $produce = self::_db()->select_row("select * from et_activity_produce where id = ?",$activity_id);
        $res = self::_db()->select_row('select count(ord.order_id) as count from et_order_activity as ord left join et_order_pay as pay on pay.order_id = ord.order_id where pay.pay_status = 1 and ord.activity_id = ?',$activity_id);

        self::_db()->update("et_activity_info",array(
            "production_status"=>1,
        ),array("id"=>$activity_id));
        if($produce){
            self::_db()->update("et_activity_produce",array(
                "craft"=>$craft,
                "man_id"=>$manufacturer_id,
                "operator_id"=>$operator_id,
                "create_time"=>date('Y-m-d H:i:s'),
                "order_count"=>$res['count']
            ),array(
                "id"=>$activity_id,
            ));
        }else{
            self::_db()->insert("et_activity_produce",array(
                "id"=>$activity_id,
                "craft"=>$craft,
                "man_id"=>$manufacturer_id,
                "operator_id"=>$operator_id,
                "create_time"=>date('Y-m-d H:i:s'),
                "order_count"=>$res['count']
            ));
        }

        return array("ok");

    }
    function view_confirm(){
        $request = PtLib\http_request("id");
        $activity = self::detail($request['id']);
        return array("activity"=>$activity);
    }
    function view_finish(){
        $request = PtLib\http_request("id");
        $activity = self::detail($request['id']);
        return array("activity"=>$activity);
    }

    /**
     * 列表
     *
    function action_list(){
        return self::table_list();
    }
     */

    /**
     * 详情
     * @return array
     *
    function action_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }
     */

    /*
    * 列表
    *
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = PtLib\get_table_list($table,$table_alias);
        return $response;
    }
    */
    /**
     * 详情
     * @param $id
     * @return array
     */
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }


    /**
     * 修改
     *
    function action_edit(){
        return self::table_edit();
    }
     */

    /*
    * 修改
    *
    static function table_edit(){
        $table = self::$table;
        return PtLib\table_edit($table);
    }
    */

    /**
     * @param
     * @return
     *
    function action_test(){
        $request = PtLib\http_request("id");
        $data = array();
        $data['id'] = $request;
        return $data;
    }
     */
}
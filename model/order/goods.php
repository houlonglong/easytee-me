<?php
/**
 * 订单产品
 */
class Model_Order_Goods extends BaseModel {
    static $table = "order_goods";
    function __construct(){
        //parent::__construct();
    }

    /**
     * 保存订单产品
     *
     * @param $order_id
     * @param $goods
     * @return array
     * @throws Exception
     */
    static function save($order_id,$goods){
        if(!is_array($goods)) throw new Exception("非法提交产品格式");
        if(count($goods) == 0) throw new Exception("没有选择产品");
        $styles_ids = array();
        $_styles = array();
        foreach($goods as $goods){
            $styles_ids[] = $goods['style_id'];
            $_styles[$goods['style_id']] = array(
                "quantity"=>$goods['quantity'],
                "pro_size"=>$goods['size'],
            );
        }

        $styles = Model_Product::get_product_styles_by($styles_ids);
        $order_goods = array();
        $goods_price = 0;
        $quantity    = 0;
        foreach($styles as $style){
            $_style = $_styles[$style['id']];
            unset($style['id']);
            $style['order_id'] = $order_id;
            $style['quantity'] = $_style['quantity'];
            $style['pro_size'] = $_style['pro_size'];
            $order_goods[] = $style;
            $quantity    += $style['quantity'];
            $goods_price += $style['unit_price'];
        }
        //print_r($order_goods);exit;
        self::_db(NEW_DB)->insert(self::$table,$order_goods);

        return array(
            "quantity"=>$quantity,
            "goods_price"=>$goods_price,
        );
    }
    /**
     * 详情视图
     *
    function view_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }
     */

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
     *
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
     */

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
<?php
/**
 * 用户订单
 */
class Model_User_Order extends Model_User_Abstract {
    static $table = "";
    function __construct(){
        parent::__construct();
    }
    function view_index(){
        $uid = self::get_uid();
        $p = self::_request("p");
        $page = (empty($p)  || intval($p) == 0) ? 1 : intval($p);
        $limit = 2;
        $row_total = self::_db()->select_row("select count(id) as total from `orders` where uid = ?",$uid);
        $total = $row_total['total'];
        if( $total > 0 )
            $total_pages = ceil($total/$limit);
        else
            $total_pages = 1;

        if ($page > $total_pages) $page = $total_pages;

        $skip = ($page - 1) * $limit;

        $rows = self::_db()->select_rows("select * from `orders` where uid = ? limit {$skip},{$limit}",$uid);

        $params = array(
            'total_rows'=>$total, #(必须)
            'list_rows'=>$limit,
            'now_page'  =>$page,  #(必须),
            'base_url' => "/user/order/index"
        );
        $pager = new PtPager($params);
        return array("pager"=>$pager,'rows'=>$rows);
    }
    function view_detail(){
        $id = $_GET['id'];
        $order = self::_db()->select_row("select * from orders where id = ?",$id);
        return array("order"=>$order);
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
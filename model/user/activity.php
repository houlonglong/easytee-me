<?php
/**
 * 用户活动
 */
class Model_User_Activity extends Model_User_Abstract {
    function __construct(){
        parent::__construct();
    }
    function view_index(){
        $status = self::_request("status");
        if($status == "") $status = "进行中";


        $where = 'where 1=1 ';
        if($status != "全部"){
            $_status_array = array(
                "进行中"=>"ongoing",
                "成功"=>"success",
                "编辑中"=>"create",
                "已结束"=>"create",
                "成功"=>"success",
            );
            $_status = $_status_array[$status];
            $where .= " and status = '{$_status}'";
        }

        $uid = Model_Design_Tool_Beta::get_uid();
        $p = self::_request("p");
        $page = (empty($p)  || intval($p) == 0) ? 1 : intval($p);
        $limit = 10;
        $row_total = self::_db()->select_row("select count(id) as total from activities $where and uid = ?",$uid);
        $total = $row_total['total'];
        if( $total > 0 )
            $total_pages = ceil($total/$limit);
        else
            $total_pages = 1;

        if ($page > $total_pages) $page = $total_pages;

        $skip = ($page - 1) * $limit;

        $rows = self::_db()->select_rows("select * from activities $where and uid = ? order by id desc limit {$skip},{$limit} ",$uid);
        //var_dump($rows);exit;
        $params = array(
            'total_rows'=>$total, #(必须)
            'list_rows'=>$limit,
            'now_page'  =>$page,  #(必须),
            'base_url' => "/user/activity/index"
        );
        $pager = new PtPager($params);

        $money = Model_User_Setting::get_balance_tx();
        $money_all = Model_User_Setting::get_total_earn();
        return array("pager"=>$pager,'rows'=>$rows,"money"=>$money,"money_all"=>$money_all,"status"=>$status);
    }
    function view_detail(){
        $id = self::_request("id");
        $uid = self::get_uid();
        $detail = self::_db(NEW_DB)->select_row("select * from activity where uid = ? and id = ?",$uid,$id);
        return array("detail"=>$detail);
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
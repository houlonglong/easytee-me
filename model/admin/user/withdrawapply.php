<?php
/**
 * 提现申请
 */
class Model_Admin_User_Withdrawapply{
    static $table = "user_withdraw_applies";
    function __construct(){
        //parent::__construct();
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
     */
    function action_list(){
        return self::table_list();
    }


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
    */
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = ' inner join users as u on u.id = '.$table_alias.'.uid';
        //fields
        $select_fields = " $table_alias.*,u.nick_name ";
        if(empty($table_alias)) throw new ErrorException("table is not defined");
//        $request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord","username","mobile","startDate","endDate");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //where
        $args = array();
        $where  = " where 1=1 ";

        if ($request['mobile']) {
            $where = " and u.mobile = ? ";
            $args[] = $request['mobile'];
        }
        if ($request['username']) {
            $where = " and u.nick_name = ? ";
            $args[] = $request['username'];
        }
        if ($request['startDate']) {
            $where .= ' and ' . $table_alias . '.create_time >="' . date('Y-m-d 00:00:00', strtotime($request['startDate'])) . '"';
        }

        if ($request['endDate']) {
            $where .= ' and ' . $table_alias . '.create_time <="' . date('Y-m-d 23:59:59', strtotime($request['endDate'])) . '"';
        }

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)){
            $sort = "id";
            $sort_type = "desc";
        }else{
            if(empty($sort_type)) $sort_type = "desc";
        }
        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table as $table_alias $join $where ";
//        $count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql,$args);
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

        $sql = "select $select_fields from $table as $table_alias $join $where $order limit $skip,$limit ";
//        $rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql,$args);
        foreach($rows as $row){
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }

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
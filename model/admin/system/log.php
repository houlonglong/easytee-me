<?php
/**
 * 系统日志
 */
class Model_Admin_System_Log extends Model_Admin_Abstract{
    static $table = "sys_user";
    function __construct(){
        parent::__construct();
    }
    /**
     * 详情
     * @return array
     *
    function action_detail(){
        $request = pt_http_request("id");
        return self::detail($request['id']);
    }
     */

    /**
     * 详情
     * @param $id
     * @return array
     *
    static function detail($id){
        $table = self::$table;
        $row = db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
     */

    /**
     * 列表
     */
    function action_list(){
        return self::table_list();
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
        return pt_table_edit($table);
    }
    */

    /*
    * 列表
    */
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        $request = PtLib\http_request("rows","page","sidx","sord");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " $table_alias.* ";

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)) $sort = "id";
        if(empty($sort_type)) $sort_type = "desc";

        //where
        $args = array();
        $where  = " where 1=1 ";

        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $join = "";
        $sql = "select count($table_alias.id) as total from $table $join $where ";
        $count_res = PtLib\db()->select_row($sql,$args);
        $records = $count_res['total'];
        $response = new stdClass();
        $response->page    = $page;  //cur page

        if( $records > 0 ) {
            $total_pages = ceil($records/$limit);
        }
        else {
            $total_pages = 0;
        }
        if ($page > $total_pages) $page=$total_pages;

        $response->total   = $total_pages;      //total pages
        $response->records = $records; //count

        $skip = ($page - 1) * $limit;

        $sql = "select $select_fields from $table $join $where $order limit $skip,$limit ";
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
     * @param
     * @return
     *
    function action_test(){
        $request = pt_http_request("id");
        $data = array();
        $data['id'] = $request;
        return $data;
    }
     */
}
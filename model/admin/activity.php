<?php
use PtLib as PtLib;
/**
 * 众筹管理
 */
class Model_Admin_Activity{
    static $table = "activities";
    function __construct(){
        //parent::__construct();
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
     * 列表
     */
    function action_list(){
        return self::table_list();
    }

    function view_detail(){
        $table = self::$table;
        $request = PtLib\http_request("id");
        $act_id = $request['id'];
        $act = self::detail($act_id);
        PtLib\print_json($act);
    }


    /**
     * 修改
     */
    function action_edit(){
        return self::table_edit();
    }


    /*
    * 修改
    */
    static function table_edit(){
        $table = self::$table;
        if(empty($table)) throw new ErrorException("table is not defined");
        $request = PtLib\http_request("oper");
        $oper = $request['oper'];
        $id = empty($_REQUEST['id'])?"":$_REQUEST['id'];
        $condition = array("id"=>$id);
        $data = PtLib\http_request("name",'status','real_end_time','pass');
//        return $data;
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


    /*
    * 列表
    */
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = '';
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord","activity_id");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " $table_alias.* ";

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)){
            $sort = "id";
            $sort_type = "desc";
        }else{
            if(empty($sort_type)) $sort_type = "desc";
        }

        //where
        $args = array();
        $where  = " where status <>'create' ";

        if($request['activity_id']){
            $where .= " and id = ? ";
            $args[] = $request['activity_id'];
        }

        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table $join $where ";
        //$count_res = db()->select_row($sql,$args);
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
        //$rows = db()->select_rows($sql,$args);
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
        $request = PtLib\http_request("id");
        $data = array();
        $data['id'] = $request;
        return $data;
    }
     */
}
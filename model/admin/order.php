<?php
/**
 * 订单管理
 */
class Model_Admin_Order{
    static $table = "orders";
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
     *
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
     */

    /**
     * 列表
     **/
    function action_list(){
        return self::table_list();
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


    /*
    * 列表
    **/
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = ' left join users as u on u.id = '.$table_alias.'.uid inner join activities as a on a.id = '.$table_alias.'.activity_id ';
        //$join = '';
        if(empty($table_alias)) throw new ErrorException("table is not defined");
//        $request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord",'order_no','activity_name','username','status');
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];
        $activity_name = $request['activity_name'];
        $order_no = $request['order_no'];
        $username = $request['username'];
        $status = $request['status'];

        //fields
        $select_fields = " $table_alias.*,u.nick_name AS username,a.id AS activity_id";

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)) $sort = "id";
        if(empty($sort_type)) $sort_type = "desc";

        //where
        $args = array();
        $where  = " where 1=1 ";
        if($activity_name){
            $where .= 'and orders.name = ? ';
            $args[] = $activity_name;
        }
        if($order_no){
            $where .= 'and orders.order_no = ? ';
            $args[] = $order_no;
        }
        if($username){
            $where .= 'and u.nick_name = ? ';
            $args[] = $username;
        }
        if($status){
            $where .= 'and orders.status = ? ';
            $args[] = $status;
        }
        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table $join $where ";
//        $count_res = db()->select_row($sql,$args);
//        return $sql;
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
<?php
/**
 * admin/campus
 */
class Model_Admin_Campus extends BaseModel {
    static $table = "user_campus";
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
        $table_alias =$table = self::$table;
        $select_fields = " $table_alias.* ";
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        $request = PtLib\http_request("rows","page","sidx","sord","username","real_name","student_no","mobile","school");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];
        $join = ' inner join users as u on u.app_uid = '.$table_alias.'.uid ';
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
        $where  = " where 1=1 ";
        if($request['student_no']){
            $where .=' and '.$table_alias.'.student_no = ?';
            $args[] = $request['student_no'];
        }
        if($request['real_name']){
            $where .=' and '.$table_alias.'.real_name like"%'.$request['real_name'].'%"';
        }
        if($request['school']){
            $where .=' and '.$table_alias.'.school_name like "%'.$request['school'].'%"';
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

    function action_audit(){
        $id = $this->_request('id');
        if($id){
            $userDatas = self::_db()->select_row('select nu.invite_id,nu.id,u.id as new_uid from new_users as nu
inner join users as u on u.app_uid = nu.id
inner join user_campus as uc on uc.uid = u.id  where uc.id =?
',$id);
            $status = $this->_request('status');
            self::_db()->bt();
            $row = PtLib\db()->update('user_campus',array('status'=>$status),array('id'=>$id));
            $add_money_rows = self::_db()->run_sql('update users set money=money+'.$GLOBALS['setting']['campus']['add_money'].' where id = ?',$userDatas['id']);

            $add_new_money_rows = self::_db()->run_sql('update new_users set money=money+'.$GLOBALS['setting']['campus']['add_money'].' where id = ?',$userDatas['new_uid']);
            self::_db()->commit();
            $invite_row = 1;
            if($userDatas['invite_id']){
                $invite_row = self::_db()->run_sql('update new_users set invite_money=invite_money+'.$GLOBALS['setting']['campus']['invite_money'].' where id = ?',$userDatas['invite_id']);
            }
            if(!$add_money_rows || !$row || !$invite_row || !$add_new_money_rows){
                self::_db()->rollback();
                self::_db()->commit();
                echo 0;
            }else{
                self::_db()->commit();
                echo 1;
            }
        }else{
            echo 0;
        }
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
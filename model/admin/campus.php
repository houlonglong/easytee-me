<?php
/**
 * admin/campus
 */
class Model_Admin_Campus extends BaseModel {
    static $table = "et_user_campus";
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
        $join = ' ';
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
        $where  = " where real_name is not null ";
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

    function action_audit($id,$status){
        try{
            $userDatas = self::_db()->select_row(
                'select c.uid,c.real_name,i.invite_id ,u.mobile
                  from et_user_campus as c
                  left join et_user_invite as i on i.uid = c.uid
                  left join et_user as u on u.id = c.uid
                  where c.id =  ? ',$id);
            self::_db()->update('et_user_campus',array('status'=>$status,"up_time"=>date_time_now()),array('id'=>$id));
            $mobile = $userDatas['mobile'];
            $name = $userDatas['real_name'];
            $mobile = '15618265151';
            if($status == 1){//通过
                self::_db()->bt();
                $add_money = $GLOBALS['setting']['campus']['add_money'];
                self::_db()->run_sql("update et_user_finance set balance_ntx = balance_ntx + ".$add_money." where uid = ?",$userDatas['uid']);
                self::_db()->insert("et_user_finance_log",array(
                    "uid"=>$userDatas['uid'],
                    "amount"=>$add_money,
                    "type"=>11,
                    "note"=>"校园达人参与活动奖励",
                    "add_time"=>date_time_now()
                ));

                $userDatas = self::_db()->select_row('select invite_id from et_user_invite  where uid =  ? ',$userDatas['uid']);
                if(!empty($userDatas['invite_id'])){
                    $invite_money = $GLOBALS['setting']['campus']['invite_money'];
                    self::_db()->run_sql("update et_user_finance set balance_ntx = balance_ntx + ".$invite_money." where uid = ?",$userDatas['invite_id']);
                    self::_db()->insert("et_user_finance_log",array(
                        "uid"=>$userDatas['invite_id'],
                        "amount"=>$invite_money,
                        "type"=>12,
                        "note"=>"校园达人邀请奖励",
                        "add_time"=>date_time_now()
                    ));
                }
                self::_db()->commit();
                if($mobile){
                    $res = Model_Tools_Sms::sendsms($mobile,"oV3NQ3",array("name"=>$name));
                    //print_r($res);exit;
                }
            }else{//拒绝
                if($mobile){
                    $res = Model_Tools_Sms::sendsms($mobile,"flACZ1",array("name"=>$name));
                    //print_r($res);exit;
                }
            }

            return array("ok");
        }catch (Exception $e){
            self::_db()->rollback();
            throw new Exception($e->getMessage());
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
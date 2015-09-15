<?php

class Model_Admin_User extends Model_Admin_Abstract
{
    static $table = "users";

    function __construct()
    {
        parent::__construct();
    }
    function action_update($table,$field,$value,$uid){
        if($table == 'et_user') $key = "id";
        else $key = "uid";
        $row = self::_db()->select_row("select * from $table where $key = ?",$uid);
        if($row){
            self::_db()->update($table,array(
                $field=>$value
            ),array(
                $key=>$uid
            ));
        }else{
            self::_db()->insert($table,array(
                $field=>$value,
                $key=>$uid
            ));
        }
        return array("ok");
    }
    function view_modify($id)
    {

        $user = self::_db()->select_row("SELECT u.id,u.nick_name, u.mobile,u.email,u.password,
		                                f.balance_tx,f.balance_block,f.balance_ntx,f.total_earn,
                                        i.avatar,i.des,i.des,
                                        w.uid,w.withdraw_type,w.withdraw_account
                                        FROM et_user AS u LEFT JOIN et_user_finance  AS f  ON f.uid = u.id
                                        LEFT JOIN et_user_info AS i ON i.uid = u.id
                                        LEFT  JOIN  et_user_withdraw_account AS w  ON w.uid = u.id
                                        WHERE u.id = ?", $id);
      // var_dump($user);exit;
        return array("user" => $user,"uid"=>$id);
    }
    function view_withdraw_log($uid){
        return array('uid'=>$uid);
    }

    /**
     * @return array
     */
    function action_detail()
    {
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }

    /**
     * @param $id
     * @return array
     */
    static function detail($id)
    {
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?", $id);
        return $row;
    }

    function action_list()
    {
        return self::table_list();
    }

    function action_edit()
    {
        return self::table_edit();
    }

    static function table_edit()
    {
        $table = self::$table;
        return PtLib\table_edit($table);
    }

    static function table_list()
    {
        $table_alias = $table = self::$table = "et_user";
        $table_alias = 'u';
        $join = '';
        if (empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows", "page", "sidx", "sord");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " u.*";

        if (empty($limit)) $limit = 20;
        if (empty($page)) $page = 1;
        if (empty($sort)) {
            $sort = "id";
            $sort_type = "desc";
        } else {
            if (empty($sort_type)) $sort_type = "desc";
        }

        //where
        $args = array();
        $where = " where 1=1 ";
        //order
        $order = "";
        if ($sort)
            $order = "order by $table_alias." . addslashes($sort) . " " . $sort_type;
        $sql = "select count($table_alias.id) as total from $table as $table_alias $join $where ";
        //$count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql, $args);
        $records = $count_res['total'];
        $response = new stdClass();
        $response->page = $page;  //cur page

        if ($records > 0) {
            $total_pages = ceil($records / $limit);
        } else {
            $total_pages = 1;
        }
        if ($page > $total_pages) $page = $total_pages;

        $response->total = $total_pages;      //total pages
        $response->records = $records; //count

        $skip = ($page - 1) * $limit;

        $sql = "select $select_fields from $table as $table_alias $join $where $order limit $skip,$limit ";
        //$rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql, $args);
        foreach ($rows as $row) {
            $response->rows[] = array(
                'id' => $row['id'],
                "cell" => $row
            );
        }
        return $response;
    }

    function get_auth_user_info()
    {
        $auth = PtApp::$auth;
        return $auth;
    }


    function action_money_flow(){
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows", "page", "sidx", "sord","uid","username","mobile","startTime","endTime",'status');
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " l.*,u.mobile,u.nick_name";

        if (empty($limit)) $limit = 20;
        if (empty($page)) $page = 1;
        if (empty($sort)) {
            $sort = "id";
            $sort_type = "desc";
        } else {
            if (empty($sort_type)) $sort_type = "desc";
        }

        //where
        $args = array();
        $where = " where 1=1 ";

        if($request['uid']){
            $where .=' and u.id = ?';
            $args[] = $request['uid'];
        }

        if($request['username']){
            $where .=' and u.nick_name = ?';
            $args[] = $request['nick_name'];
        }
        if($request['startTime']){
            $where .=' and l.create_time >= ?';
            $args[] = date('Y-m-d 00:00:00',strtotime($request['startTime']));
        }
        if($request['endTime']){
            $where .=' and l.create_time <= ?';
            $args[] = date('Y-m-d 23:59:59',strtotime($request['endTime']));
        }
        if($request['mobile']){
            $where .=' and u.mobile = ?';
            $args[] = $request['mobile'];
        }
        //order
        $order = "";
        if ($sort)
            $order = "order by l." . addslashes($sort) . " " . $sort_type;
        $sql = "select count(l.id) as total from et_user_finance_log as l left join et_user as u on u.id = l.uid $where ";
        //$count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql, $args);
        $records = $count_res['total'];
        $response = new stdClass();
        $response->page = $page;  //cur page

        if ($records > 0) {
            $total_pages = ceil($records / $limit);
        } else {
            $total_pages = 1;
        }
        if ($page > $total_pages) $page = $total_pages;

        $response->total = $total_pages;      //total pages
        $response->records = $records; //count

        $skip = ($page - 1) * $limit;

        $sql = "select $select_fields from et_user_finance_log as l left join et_user as u on u.id = l.uid $where $order limit $skip,$limit ";
        $rows = PtLib\db()->select_rows($sql, $args);
        foreach ($rows as $row) {
            $response->rows[] = array(
                'id' => $row['id'],
                "cell" => $row
            );
        }
        return $response;
    }

}
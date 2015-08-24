<?php

class Model_Admin_User extends Model_Admin_Abstract
{
    static $table = "users";

    function __construct()
    {
        parent::__construct();
    }

    function view_modify()
    {
        $request = PtLib\http_request("id");
        $id = $request['id'];
        $user = self::_db()->select_row("select n.*,a.*,u.*
        from users as u left join new_users as n on n.id = u.app_uid
        left join user_attributes as a on a.uid = n.id where u.id = ?

        ", $id);
        //var_dump($user);exit;
        return array("user" => $user);
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
        $table_alias = $table = self::$table;
        $table_alias = 'u';
        $join = 'left join new_users as n on n.id = u.app_uid';
        if (empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows", "page", "sidx", "sord");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " u.*, n.create_time ";

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

    function action_updateStatus()
    {
        $id = $this->_request('id');
        if ($id) {
            $status = $this->_request('status');
            $row = PtLib\db()->update('user_withdraw_applies', array('status' => $status), array('id' => $id));
            echo $row;
        }
    }

    function action_withdraw_download()
    {
        $rows = PtLib\db()->select_rows('select uwa.*,u.mobile,u.nick_name from user_withdraw_applies as uwa inner join users as u on u.id = uwa.uid  where uwa.status="passed"');
        if ($rows) {

                $myval = array();
                $myval[] = "体现人名称,提现金额,联系电话,收款账号,支付类型";
                $myval[] = "\r\n";

                foreach ($rows as $row) {
                    $myval[] = "\t" . $row['nick_name'] . ",";
                    $myval[] = "\t" . $row['money'] - $row['fee'] . ",";
                    $myval[] = "\t" . $row['mobile'] . ",";
                    $myval[] = "\t" . $row['pay_account'] . ",";
                    $myval[] = $row['pay_type'] . ",";
                    $myval[] = "\r\n";
                }
//                var_dump($myval);exit;
                $content = iconv("UTF-8", "GBK", implode($myval));
                header("Content-Type: text/html; charset=GBK");
                header("Pragma: public");
                header("Expires: 0");
                header('Content-Encoding: none');
                header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                header("Cache-Control: public");
                header("Content-type: application/octet-stream\n");
                header("Content-Description: File Transfer");
                header('Content-Disposition: attachment; filename=申请提现明细.csv', $content);
                header("Content-Transfer-Encoding: binary");
                header('Content-Length: ' . strlen($content));
                echo $content;
                exit;
            }
    }

    function action_money_flow(){
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows", "page", "sidx", "sord","uid","username","mobile","start_time","end_time");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " umf.*,u.mobile,u.nick_name";

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
        if($request['start_time']){
            $where .=' and umf.create_time >= ?';
            $args[] = date('Y-m-d 00:00:00',strtotime($request['start_time']));
        }
        if($request['end_time']){
            $where .=' and umf.create_time <= ?';
            $args[] = date('Y-m-d 23:59:59',strtotime($request['end_time']));
        }
        if($request['mobile']){
            $where .=' and u.mobile = ?';
            $args[] = $request['mobile'];
        }
        //order
        $order = "";
        if ($sort)
            $order = "order by umf." . addslashes($sort) . " " . $sort_type;
        $sql = "select count(umf.id) as total from user_money_flows as umf inner join users as u on u.id = umf.uid $where ";
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

        $sql = "select $select_fields from user_money_flows as umf inner join users as u on u.id = umf.uid $where $order limit $skip,$limit ";
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
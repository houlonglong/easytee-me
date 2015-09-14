<?php
/**
 * 提现申请
 */
class Model_Admin_User_Withdrawapply extends Model_Admin_Abstract {
    static $table = "et_user_withdraw";
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
        $table_alias = 'w';

        //fields
        // select u.nick_name,u.mobile from user as u where id = 1;
        $select_fields = " w.*,u.nick_name ";
        if(empty($table_alias)) throw new ErrorException("table is not defined");
//        $request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord","username","mobile","startDate","endDate","status");
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

        if($request['status']){
            $where .=' and '.$table_alias.'.status = ?';
            $args[] = $request['status'];
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

        $join = ' left join  et_user as u on u.id = w.uid';
        $sql = "select count(w.id) as total from $table as $table_alias $join $where ";
        //echo $sql;exit;
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
        //echo $sql;exit;
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

    function action_updateStatus()
    {
        $id = $this->_request('id');
        if ($id) {
            $status = $this->_request('status');
            $fields = array('status' => $status);
            if($status == 'paid'){
                $fields['pay_time'] = date('Y-m-d H:i:s');
                try{
                    self::_db()->bt();
                    $status = PtLib\db()->update('user_withdraw_applies', $fields, array('id' => $id));
                    $money  = PtLib\db()->select_row('select money,uid from user_withdraw_applies where id = ?',$id);
                    $row = self::_db()->run_sql('update users set money_disabled =money_disabled-'.$money['money'] .' where id=?',$money['uid']);
                    if(!$row || !$status){
                       throw new Exception('提现失败');
                    }
                    self::_db()->commit();
                    echo 1;
                }catch (Exception $e){
                    self::_db()->rollback();
                    self::_db()->commit();
                }

            }else{
                $row = PtLib\db()->update('user_withdraw_applies', $fields, array('id' => $id));
                echo $row;
            }
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

}
<?php
/**
 * 数据库迁移
 */
class Model_Tools_Db_Merge1 extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }

    function cli_run(){

        //self::merge_user();
        $tables = array("product");
        foreach ($tables  as $table) {
            self::_db("to")->_truncate($table);
        }
        $products = self::_db("from")->select_rows("select * from products");
        foreach($products as $product){
            //print_r($product); exit;
            $pro_id = self::_db("to")->insert(
                "product",array(
                    "name"=>$product['name'],
                    "des"=>$product['small_description'],
                    "content"=>replace_cdn($product['long_description']),
                )
            );
            //echo $pro_id;exit;
        }
        print_r($products);

    }

    static function merge_user(){
        self::init_user_db();
        $users = self::_db("from")->select_rows("select n.id as app_uid,u.id ,n.password, n.email,n.mobile,n.create_time,
                    n.nickname,n.abstract,n.photo,u.token,u.money,u.money_disabled,u.money_all,a.location,a.homepage,
                    a.pay_type,a.pay_account
                    from new_users as n
                    left join users as u on n.id = u.app_uid
                    left join user_attributes as a on a.uid = n.id
                    ");
        foreach($users as $user){
            //print_r($user);exit;
            $user_id = self::_db("to")->insert("user",array(
                "nick_name"=>$user['nickname'],
                "mobile"=>$user['mobile'],
                "email"=>$user['email'],
                "password"=>md5($user['password']),
                "add_time"=>$user['create_time'],
            ));

            if($user['money'] > 0 || $user['money_disabled'] > 0 || $user['money_all'] > 0){
                self::_db("to")->insert("user_finance",array(
                    "uid"=>$user_id,
                    "balance_tx"=>$user["money"],
                    "balance_block"=>$user["money_disabled"],
                    "balance_ntx"=>0,
                    "total_earn"=>$user["money_all"],
                ));
            }

            $addrs = self::_db("from")->select_rows("select * from user_addresses where uid = ?",$user['id']);
            $user_auths = self::_db("from")->select_rows("select * from user_auths where uid = ?",$user['app_uid']);
            $user_money_flows = self::_db("from")->select_rows("select * from user_money_flows where uid = ?",$user['id']);
            $user_withdraw_applies = self::_db("from")->select_rows("select * from user_withdraw_applies where uid = ?",$user['id']);


            self::_db("to")->insert("user_merge",array(
                "uid"=>$user_id,
                "open_uid"=>$user["id"],
                "open_token"=>$user["token"],
                "new_uid"=>$user["app_uid"],
            ));

            foreach ($addrs as $addr) {
                self::_db("to")->insert("user_addr",array(
                    "uid"=>$user_id,
                    "province"=>$addr['province'],
                    "city"=>$addr['city'],
                    "county"=>$addr['county'],
                    "addr"=>$addr['address'],
                    "name"=>$addr['name'],
                    "tel"=>$addr['mobile'],
                    "hash"=>$addr['hash'],
                    "add_time"=>$addr['create_time'],
                    "from_wexin"=>($addr['source'] == 'wechat'?1:0),
                ));
            }
            foreach ($user_money_flows as $user_money_flow) {
                $type = 5;

                self::_db("to")->insert("user_finance_log",array(
                    "uid"=>$user_id,
                    "amount"=>$user_money_flow['money'],
                    "note"=>$user_money_flow['content'],
                    "type"=>$type,
                    "add_time"=>$user_money_flow['create_time'],
                ));
            }
            foreach ($user_withdraw_applies as $user_withdraw_apply) {
                self::_db("to")->insert("user_withdraw",array(
                    "uid"=>$user_id,
                    "account"=>$user_withdraw_apply['pay_account'],
                    "type"=>0,
                    "status"=>($user_withdraw_apply['status'] == 'passed' ? 2 : 0),
                    "add_time"=>$user_withdraw_apply['create_time'],
                    "amount"=>$user_withdraw_apply['money'],
                    "fee"=>0,
                ));
            }

            foreach ($user_auths as $user_auth) {
                self::_db("to")->insert("user_oauth",array(
                    "uid"=>$user_id,
                    "openid"=>$user_auth['openid'],
                    "platform"=>$user_auth['type'],
                    "access_token"=>$user_auth['access_token'],
                ));
            }

            //提现帐户
            if($user["pay_account"]){
                $pay_type = 0;
                if($user["pay_type"] == 'unionpay'){
                    $pay_type = 2;
                }
                self::_db("to")->insert("user_wd_account",array(
                    "uid"=>$user_id,
                    "type"=>$pay_type,
                    "account"=>$user["pay_account"],
                ));
            }
            //用户信息
            self::_db("to")->insert("user_info",array(
                "avatar"=>$user['photo'],
                "des"=>$user['abstract'],
                "wb_url"=>$user['homepage'],
                "wb_location"=>$user['location'],
                "uid"=>$user_id,
            ));

            //self::_redis("uid_".$user["id"],$user_id);
            //self::_redis("app_uid_".$user["app_uid"],$user_id);
            //self::_redis("token__".$user["token"],$user_id);
            //PtLib\log($user_id);
        }

    }

    static function init_user_db(){
        $tables = array("user","user_info","user_finance","user_finance_log","user_addr","user_merge","user_withdraw","user_wd_account","user_oauth");
        foreach ($tables  as $table) {
            self::_db("to")->_truncate($table);
        }
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
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
        if(PtApp::$ENV == 'product') return ;
        self::merge_act();
        self::merge_order();
        self::merge_user();

    }
    static function merge_order(){
        $tables = array("et_order","et_order_goods","et_order_pay","et_order_ship","et_order_activity");
        foreach ($tables  as $table) {
            self::_db()->_truncate($table);
        }

        $orders = self::_db()->select_rows("select * from orders as o left join order_attributes as a on a.order_id = o.id");

        foreach($orders as $order){
            $order_id = self::_db()->insert("et_order",array(
                "id"=>$order['id'],
                "order_no"=>$order['order_no'],
                "uid"=>$order['uid'],
                "status"=>$order['status'] == '已关闭' ? 0 : 1,
                "goods_price"=>$order['total_price'],
                "quantity"=>$order['quantity'],
                "subject"=>$order['name'],
                "body"=>$order['body'],
                "notes"=>$order['notes'],
                "add_time"=>$order['create_time'],
            ));

            $goods = self::_db()->select_rows("select * from order_goods where order_id = ?",$order['id']);

            foreach($goods as $good){
                self::_db()->insert("et_order_goods",array(
                    "id"=>$good['id'],
                    "order_id"=>$order['id'],
                    "sell_price"=>$good['purchase_price'],
                    "style_id"=>$good['product_style_id'],
                    "unit_price"=>$good['unit_price'],
                    "quantity"=>$good['quantity'],
                    "pro_size"=>$good['size'],
                    "activity_id"=>$good['activity_id'],
                    "activity_style_id"=>$good['activity_product_style_id'],
                ));
            }

            if($order['pay_no']){
                self::_db()->insert("et_order_pay",array(
                    "order_id"=>$order_id,
                    "pay_type"=>$order['pay_type'],
                    "pay_price"=>$order['pay_price'],
                    "pay_time"=>$order['pay_time'],
                    "pay_no"=>$order['pay_no'],
                    "pay_status"=>$order['pay_no'] == '待付款' ? 0:1,
                ));
            }
            self::_db()->insert("et_order_ship",array(
                "order_id"=>$order_id,
                "exp_price"=>$order['express_price'],
                "province"=>$order['ship_province'],
                "city"=>$order['ship_city'],
                "county"=>$order['ship_area'],
                "addr"=>$order['ship_addr'],
                "name"=>$order['ship_name'],
                "tel"=>$order['ship_mobile'],
                "ship_status"=>0,
            ));
            self::_db()->insert("et_order_activity",array(
                "order_id"=>$order_id,
                "activity_id"=>$order['activity_id'],
            ));

        }
    }
    static function get_order_status($status){
        return $status == '已关闭' ? 0 : 1;
    }
    static function get_order_pay_status($status){
        return $status == '待发货' ? 1 : 0;
    }

    static function merge_act(){
        $tables = array("et_activity_product_style","et_design_svg","et_activity_info");
        foreach ($tables  as $table) {
            self::_db()->_truncate($table);
        }
        $activities = self::_db()->select_rows("select * from activities where uid > 0");
        foreach($activities as $activity){
            self::_db()->insert("et_activity_info",array(
                'id'=>$activity['id'],
                "uid"=>$activity['uid'],
                'start_time'=>$activity['start_time'],
                'end_time'=>$activity['real_end_time'],
                'period'=>$activity['deadline'],
                'status'=>$activity['status'] == "create" ? 0:1,
                'verify'=>$activity['pass'] == "1" ? 1:0,
                'sale_profit'=>empty($activity['profie'])?0:$activity['profie'],
                'sale_total'=>$activity['total'],
                'sale_target'=>$activity['sales_target'],
                'sale_count'=>$activity['sales_count'],
                'production_status'=> $activity['status'] == "fabrication" ? 1:0,
            ));
        }
        self::_db()->run_sql("insert into et_activity_product_style(id,activity_id,style_id,sell_price) select id,activity_id,product_style_id as style_id,sell_price from activity_product_styles");
        self::_db()->run_sql("insert into et_design_svg(id,design_id,side,svg_url) select id,design_id,side,svg_url from design_svg_side");
        return;
    }
    static function get_uid_by_open_uid($open_uid){
        $row = self::_db("to")->select_row("select * from user_merge where open_uid = ?",$open_uid);
        if($row){
            return $row['uid'];
        }else{
            return 0;
        }
    }
    static function get_act_verify($pass){
        return $pass;
    }
    static function get_act_status($status  ){
        $res = 1;
        if($status == "create") $res = 0;
        return $res;
    }
    static function merge_product(){
        $tables = array("product","pro_style","pro_style_size","pro_img","pro_design_area");
        foreach ($tables  as $table) {
            self::_db("to")->_truncate($table);
        }
        $products = self::_db("from")->select_rows("select * from products");
        foreach($products as $product){
            //print_r($product); exit;
            $pid = $product['id'];
            $pro_id = self::_db("to")->insert(
                "product",array(
                    "name"=>$product['name'],
                    "des"=>$product['small_description'],
                    "brand_id"=>$product['manufacturer_brand_id'],
                    "content"=>replace_cdn($product['long_description']),
                    "man_sku"=>$product['manufacturer_sku'],
                    "sku"=>$product['sku'],
                    "status"=>$product['enable'] == 'Y' ? 1:0,
                )
            );
            $sides = array(
                "前胸"=>"front",
                "后背"=>"back",
                "左袖"=>"left",
                "右袖"=>"right",
            );

            $regions = self::_db("from")->select_rows("select distinct name,x,y,w,h,is_default,render_width_inches,sequence from product_style_image_regions where product_id = ?",$pid);
            foreach($regions as $region){
                $side = $sides[$region['name']];
                self::_db("to")->insert(
                    "pro_design_area",array(
                        "pro_id"=>$pro_id,
                        "side"=>$side,
                        "top"=>$region['y'],
                        "left"=>$region['x'],
                        "width"=>$region['w'],
                        "height"=>$region['h'],
                        "inche"=>$region['render_width_inches'],
                    )
                );
            }
            $sides = array(
                "front",
                "back",
                "third",
                "fourth",
            );
            foreach($sides as $side){
                $_side = $side;
                if($side == 'third') $_side = "left";
                if($side == 'fourth') $_side = "right";
                self::_db("to")->insert(
                    "pro_img",array(
                        "pro_id"=>$pro_id,
                        "side"=>$_side,
                        "img_url"=>"products/{$pid}/{$side}.png",
                    )
                );
            }
            $product_styles = self::_db("from")->select_rows("select ps.*,aps.selling_price as aps_selling_price from product_styles as ps left join app_product_styles as aps on aps.product_style_id = ps.id where ps.product_id = ?",$product['id']);
            foreach ($product_styles as $product_style) {
                self::_db("to")->insert(
                    "pro_style",array(
                        "pro_id"=>$pro_id,
                        "color"=>$product_style['color'],
                        "color_name"=>$product_style['color_name'],
                        "cost_price"=>$product_style['purchase_price'],
                        "cost_price1"=>$product_style['selling_price'],
                        "sale_price"=>$product_style['aps_selling_price'],
                        "is_default"=>$product_style['is_default'],
                    )
                );
                $sizes = self::_db("from")->select_rows("select * from product_style_sizes where enable = 'y' and product_style_id = ?",$product_style['id']);
                foreach($sizes as $size){
                    self::_db("to")->insert(
                        "pro_style_size",array(
                            "pro_id"=>$pro_id,
                            "color"=>$product_style['color'],
                            "size"=>$size['size']
                        )
                    );
                }

            }
            //echo $pro_id;exit;
        }
    }
    static function merge_user(){
        $tables = array("et_user_info","et_user","et_user_addr","et_user_finance","et_user_finance_log","et_user_oauth","et_user_withdraw","et_user_withdraw_account");
        foreach ($tables  as $table) {
            self::_db()->_truncate($table);
        }
        $users = self::_db()->select_rows("select n.id as app_uid,u.id ,n.password, n.email,n.mobile,n.create_time,
                    n.nickname,n.abstract,n.photo,u.token,u.money,u.money_disabled,u.money_all,a.location,a.homepage,
                    a.pay_type,a.pay_account
                    from users as u
                    left join new_users as n on n.id = u.app_uid
                    left join user_attributes as a on a.uid = n.id
                    ");

        foreach($users as $user){
            self::merge_user_info($user);
        }
        $users = self::_db()->select_rows("select n.id as app_uid,u.id ,n.password, n.email,n.mobile,n.create_time,
                    n.nickname,n.abstract,n.photo,u.token,u.money,u.money_disabled,u.money_all,a.location,a.homepage,
                    a.pay_type,a.pay_account
                    from new_users as n
                    left join users as u on n.id = u.app_uid
                    left join user_attributes as a on a.uid = n.id
                     where u.id is null
                    ");

        foreach($users as $user){
            $user_id = self::_db()->insert("et_user",array(
                "new_uid"=>$user['app_uid'],
                "nick_name"=>$user['nickname'],
                "mobile"=>$user['mobile'],
                "email"=>$user['email'],
                "password"=> $user['password']?md5($user['password']):null,
                "add_time"=>$user['create_time'],
            ));
            $user_auths = self::_db()->select_rows("select * from user_auths where uid = ?",$user['app_uid']);
            foreach ($user_auths as $user_auth) {
                self::_db()->insert("et_user_oauth",array(
                    "uid"=>$user_id,
                    "openid"=>$user_auth['openid'],
                    "platform"=>$user_auth['type'],
                    "access_token"=>$user_auth['access_token'],
                ));
            }
        }

    }
    static function merge_user_info($user){
        //print_r($user);exit;
        $user_id = $user['id'];
        self::_db()->insert("et_user",array(
            'id'=>$user_id,
            'new_uid'=>$user['app_uid'],
            "nick_name"=>$user['nickname'],
            "mobile"=>$user['mobile'],
            "email"=>$user['email'],
            "password"=>$user['password']?md5($user['password']):null,
            "add_time"=>$user['create_time'],
        ));
        if($user['money'] > 0 || $user['money_disabled'] > 0 || $user['money_all'] > 0){
            self::_db()->insert("et_user_finance",array(
                "uid"=>$user_id,
                "balance_tx"=>$user["money"],
                "balance_block"=>$user["money_disabled"],
                "balance_ntx"=>0,
                "total_earn"=>$user["money_all"],
            ));
        }

        $addrs = self::_db()->select_rows("select * from user_addresses where uid = ?",$user['id']);
        $user_auths = self::_db()->select_rows("select * from user_auths where uid = ?",$user['app_uid']);
        $user_money_flows = self::_db()->select_rows("select * from user_money_flows where uid = ?",$user['id']);
        $user_withdraw_applies = self::_db()->select_rows("select * from user_withdraw_applies where uid = ?",$user['id']);

        foreach ($addrs as $addr) {
            self::_db()->insert("et_user_addr",array(
                "id"=>$addr['id'],
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
            self::_db()->insert("et_user_finance_log",array(
                "uid"=>$user_id,
                "amount"=>$user_money_flow['money'],
                "note"=>$user_money_flow['content'],
                "type"=>$type,
                "add_time"=>$user_money_flow['create_time'],
            ));
        }
        foreach ($user_withdraw_applies as $user_withdraw_apply) {
            self::_db()->insert("et_user_withdraw",array(
                "uid"=>$user_id,
                "withdraw_account"=>$user_withdraw_apply['pay_account'],
                "withdraw_type"=>0,
                "withdraw_status"=>($user_withdraw_apply['status'] == 'passed' ? 2 : 0),
                "withdraw_add_time"=>$user_withdraw_apply['create_time'],
                "withdraw_amount"=>$user_withdraw_apply['money'],
                "withdraw_fee"=>0,
            ));
        }

        foreach ($user_auths as $user_auth) {
            self::_db()->insert("et_user_oauth",array(
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
            self::_db()->insert("et_user_withdraw_account",array(
                "uid"=>$user_id,
                "withdraw_type"=>$pay_type,
                "withdraw_account"=>$user["pay_account"],
            ));
        }
        //用户信息
        self::_db()->insert("et_user_info",array(
            "uid"=>$user_id,
            "avatar"=>$user['photo'],
            "des"=>$user['abstract'],
            "wb_url"=>$user['homepage'],
            "wb_location"=>$user['location'],
        ));
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
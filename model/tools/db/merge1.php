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
        self::merge_product();
        //self::merge_act();
        //self::merge_order();

    }
    static function merge_order(){
        $tables = array("order","order_activity","order_activity","order_goods","order_pay","order_ship");
        foreach ($tables  as $table) {
            self::_db("to")->_truncate($table);
        }
        $orders = self::_db("from")->select_rows("select * from orders as o left join order_attributes as a on a.order_id = o.id");
        foreach($orders as $order){

            $order_id = self::_db("to")->insert("order",array(
                "order_no"=>$order['order_no'],
                "uid"=>$order['uid'],
                "status"=>self::get_order_status($order['status']),
                "goods_price"=>$order['total_price'],
                "quantity"=>$order['quantity'],
                "subject"=>$order['name'],
                "body"=>$order['body'],
                "notes"=>$order['notes'],
                "add_time"=>$order['create_time'],
            ));
            $goods = self::_db("from")->select_rows("select * from order_goods  where order_id = ?",$order['id']);
            foreach($goods as $good){

                $style = self::_db("from")->select_row("select
                ps.*,p.name,mb.name as mb_name,pc.name as c_name
                from product_styles as ps
                left join products as p on p.id = ps.product_id
                left join product_category_maps as map on map.product_id = p.id
                left join product_categories as pc on pc.id = map.product_category_id
                left join manufacturer_brands as mb on mb.id = p.manufacturer_brand_id
                where ps.id = ?",$good['product_style_id']);
                //print_r($style);exit;
                self::_db("to")->insert("order_goods",array(
                    "order_id"=>$order_id,
                    "cost_price"=>$style['purchase_price'],
                    "unit_price"=>$good['unit_price'],
                    "quantity"=>$good['quantity'],
                    "pro_size"=>$good['size'],
                    "pro_id"=>$style['product_id'],
                    "act_id"=>$good['activity_id'],
                    "pro_color"=>$style['color'],
                    "pro_color_name"=>$style['color_name'],
                    "pro_name"=>$style['name'],
                    "brand_name"=>$style['mb_name'],
                    "pro_cat_name"=>$style['c_name'],
                ));
            }
            //print_r($goods);exit;
            if($order['pay_no']){
                self::_db("to")->insert("order_pay",array(
                    "order_id"=>$order_id,
                    "pay_type"=>$order['pay_type'],
                    "pay_price"=>$order['pay_price'],
                    "pay_time"=>$order['pay_time'],
                    "pay_no"=>$order['pay_no'],
                    "pay_status"=>self::get_order_pay_status($order['status']),
                ));
            }
            self::_db("to")->insert("order_ship",array(
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
            self::_db("to")->insert("order_activity",array(
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
        $tables = array("activity","act_produce","act_product","act_sale","design","material","material_art","act_product");
        foreach ($tables  as $table) {
            self::_db("to")->_truncate($table);
        }
        $activities = self::_db("from")->select_rows("select
        a.id,a.uid,a.design_id,a.name,a.sales_target,a.sales_count,a.start_time,a.end_time,a.real_end_time,
        a.abstract,a.description,a.pass,a.delivery_type,a.default_product_style_id,a.total,a.status,a.address_id,a.notes,a.deadline,a.profie,
        d.colors,s.svg_front,s.svg_back,s.svg_third,s.svg_fourth

        from activities as a
        left join designs as d on d.id = a.design_id
        left join design_svgs as s on s.design_id = a.design_id
        where a.uid > 0 and a.uid <> 202 and a.name is not null");


        foreach ($activities as $activity) {
            $design_id = $activity['design_id'];
            $sides = array("front","back","third","fourth");
            foreach($sides as $side){
                if(isset($activity['svg_'.$side])){
                    $svg = $activity['svg_'.$side];
                    $_side = $side;
                    if($side == "third") $_side = 'left';
                    if($side == "fourth") $_side = 'right';
                    $d_id = self::_db("to")->insert("design",array(
                        "act_id"=>$activity['id'],
                        "side"=>$_side,
                        "color_count"=>$activity['colors'],
                        "img_url"=>null,
                        "svg"=>$svg,
                        "svg_url"=>null,
                        "pro_img_url"=>null
                    ));

                    $canvases = self::_db("from")->select_rows("select
                    c.location as side,c.width,c.height,c.bgcolor,
                    c.colors as color_count,c.shadow,c.imgurl,
                    o.x,o.y,o.z,o.width as o_width,o.height as o_height,
                    o.rotate,o.colors as o_colors,o.stroke_width,o.shape,o.sweep,
                    o.wrap_mode,o.wrap_amount,o.kerning,o.type,o.private_fields,
                    a.type as a_type,a.can_screen_print,a.art_jit,a.art_colors,a.url as a_url,
                    a.colors as art_color_count,a.is_digitized,a.is_featured
                    from canvas_objects as o
                    left join canvas as c on c.id = o.canvas_id
                    left join arts as a on a.id = o.art_id
                    where c.location = ? and c.design_id = ?
                    ",$side,$design_id);

                    if($canvases){
                        foreach($canvases as $canvas){
                            $__side = $canvas['side'];
                            if($canvas['side'] == "third") $__side = "left";
                            if($canvas['side'] == "fourth") $__side = "right";
                            $canvas['act_id'] = $activity['id'];
                            $canvas['side'] = $__side;
                            self::_db("to")->insert("material_art",$canvas);

                        }
                    }
                }
            }
            $products = self::_db("from")->select_rows("select aps.sell_price as sale_price,ps.color,ps.product_id as pro_id,ps.color_name from activity_product_styles as aps left join product_styles as ps on ps.id = aps.product_style_id where aps.activity_id = ?",$activity['id']);
            foreach($products as $product){
                $product['act_id'] = $activity['id'];
                self::_db("to")->insert("act_product",$product);
                //print_r($activity);exit;
            }
            self::_db("to")->insert("act_sale",array(
                "act_id"=>$activity['id'],
                "sale_count"=>$activity['sales_count'],
                "profit"=>floatval($activity['profie']),
            ));

            //print_r($svg);exit;
            // echo $activity['name'];
            self::_db("to")->insert(
                "activity",array(
                    "id"=>$activity['id'],
                    "name"=>$activity['name'],
                    "uid"=>$activity['uid'],
                    "sale_target"=>$activity['sales_target'],
                    "start_time"=>$activity['start_time'],
                    "end_time"=>$activity['end_time'],
                    "real_end_time"=>$activity['real_end_time'],
                    "desc"=>$activity['abstract'],
                    "content"=>$activity['description'],
                    "verify"=>self::get_act_verify($activity['pass']),
                    "status"=>self::get_act_status($activity['status']),
                    "period"=>$activity['deadline']
                )
            );
        }
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
    static function get_act_status($status){
        $res = 2;
        if($status == "create") $res = 0;
        if($status == "ongoing") $res = 1;
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
        self::init_user_db();
        $users = self::_db("from")->select_rows("select n.id as app_uid,u.id ,n.password, n.email,n.mobile,n.create_time,
                    n.nickname,n.abstract,n.photo,u.token,u.money,u.money_disabled,u.money_all,a.location,a.homepage,
                    a.pay_type,a.pay_account
                    from users as u
                    left join new_users as n on n.id = u.app_uid
                    left join user_attributes as a on a.uid = n.id
                    ");
        foreach($users as $user){
            self::merge_user_info($user);
        }
        $users = self::_db("from")->select_rows("select n.id as app_uid,u.id ,n.password, n.email,n.mobile,n.create_time,
                    n.nickname,n.abstract,n.photo,u.token,u.money,u.money_disabled,u.money_all,a.location,a.homepage,
                    a.pay_type,a.pay_account
                    from new_users as n
                    left join users as u on n.id = u.app_uid
                    left join user_attributes as a on a.uid = n.id
                     where u.id is null
                    ");

        foreach($users as $user){

            $user_id = self::_db("to")->insert("user",array(
                "nick_name"=>$user['nickname'],
                "mobile"=>$user['mobile'],
                "email"=>$user['email'],
                "password"=> $user['password']?md5($user['password']):null,
                "add_time"=>$user['create_time'],
            ));
            $user_auths = self::_db("from")->select_rows("select * from user_auths where uid = ?",$user['app_uid']);
            foreach ($user_auths as $user_auth) {
                self::_db("to")->insert("user_oauth",array(
                    "uid"=>$user_id,
                    "openid"=>$user_auth['openid'],
                    "platform"=>$user_auth['type'],
                    "access_token"=>$user_auth['access_token'],
                ));
            }
        }

    }
    static function merge_user_info($user){
        $user_id = $user['id'];
        self::_db("to")->insert("user",array(
            "nick_name"=>$user['nickname'],
            "mobile"=>$user['mobile'],
            "email"=>$user['email'],
            "password"=>$user['password']?md5($user['password']):null,
            "add_time"=>$user['create_time'],
            'id'=>$user_id
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
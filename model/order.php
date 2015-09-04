<?php
/**
 * 订单
 */
class Model_Order extends Model_User_Abstract {
    static $table = "order";
    function __construct(){
        //parent::__construct();
    }
    static function get_user_address_list(){
        $uid = Model_Design_Tool_Beta::get_uid();
        $addresses = self::_db()->select_rows("select * from user_addresses where uid = ?",$uid);
        foreach($addresses as $key=>$address){
            if($address['default'] == 1){
                unset($addresses[$key]);
                array_unshift($addresses,$address);
                $addresses = array_values($addresses);
                break;
            }
        }
        return $addresses ? $addresses : array();
    }
    static function saveAddress(){
        $uid = Model_Design_Tool_Beta::get_uid();

        if (!empty($_REQUEST)) {
            if (!isset($_REQUEST['name']) || !$_REQUEST['name']) {
                throw new Exception("姓名不能为空");
            }
            if (!isset($_REQUEST['tel']) || !$_REQUEST['tel']) {
                throw new Exception("电话不能为空");
            }
            if (!isset($_REQUEST['province']) || !$_REQUEST['province']) {
                throw new Exception("省份不能为空");
            }
            if (!isset($_REQUEST['city']) || !$_REQUEST['city']) {
                throw new Exception("城市不能为空");
            }
            if (!isset($_REQUEST['area']) || !$_REQUEST['area']) {
                throw new Exception("地区不能为空");
            }
            // 过滤所有的html标签
            $info['name'] = $_REQUEST['name'];
            $info['mobile'] = $_REQUEST['tel'];
            $info['province'] = $_REQUEST['province'];
            $info['city'] = $_REQUEST['city'];
            $info['county'] = $_REQUEST['area'];
            $info['address'] = $_REQUEST['addr'];
            $hash = md5(str_replace(' ', '', $uid . $_REQUEST['name'] . $_REQUEST['tel'] . $_REQUEST['province'] . $_REQUEST['city'] . $_REQUEST['area'] . $_REQUEST['addr']));
            $info['hash'] = $hash;
            $info['uid'] = $uid;
            $arr = array(
                'status' => 1,
                'msg' => '地址添加成功',
            );
            $address = self::_db()->select_row("select * from user_addresses where id = ?",$id);
            if (isset($_REQUEST['id']) && $_REQUEST['id']) {
                $id = $_REQUEST['id'];


                if ($address && $address['uid'] == $uid) {

                    self::_db()->update("user_addresses",$info,array("id"=>$id));
                    $arr['id'] = $id;
                    $arr['msg'] = '地址修改成功';
                    return $arr;
                }
            }

            $addressinfo = '';
            if($address['hash'] != $hash){
                $info['create_time'] = date('Y-m-d H:i:s');
                $addressinfo['id'] = self::_db()->insert("user_addresses",$info);
            }
            $arr['id'] = $address['id'];
        }
        return $arr;
    }
    function view_beta(){
        $act_id = self::_request("act_id");
        if (!$act_id) {
            die("act_id不能为空");
        }
        if(!Model_User_Auth::is_logined()){
            $this->_location("/user/auth/login?redirect=".urlencode("/order/beta?act_id"+$act_id));
        }
        $activity = self::_db()->select_row("select delivery_type,name,pass,end_time from activities where id = ?",$act_id);

        if (time() > strtotime($activity['end_time'])) {
            die('当前活动已过期');
            exit;
        }
        if (2 == $activity['pass']) {
            die('活动审核未通过');
            exit;
        }
        if($activity['delivery_type'] == 'unity'){
            $addr = self::_db()->select_row('select * from user_addresses where id = ?',$activity['address_id']);
            $addresses[] = array('UserAddress'=>$addr);
        }else{
            //用户地址列表
            $addresses = self::get_user_address_list();
        }
        $express_area_price = self::_db()->select_rows("select * from express_prices");
        //使用微信收货地址回调
        if (isset($_GET['a_name'])) {
            //微信收货地址
            $wc_addr = array();
            $_REQUEST['name'] = @$_GET['a_name'];
            $_REQUEST['tel'] = @$_GET['a_mobile'];
            $_REQUEST['province'] = @$_GET['a_province'];
            $_REQUEST['city'] = @$_GET['a_city'];
            $_REQUEST['area'] = @$_GET['a_area'];
            $_REQUEST['addr'] = @$_GET['a_addr'];
            self::saveAddress();
            header("Location: /order?act_id=" . $act_id);
            exit;
        }
        //$this->set(compact('page_name', 'act_id', 'addresses', 'express_area_price','activity'));
        return array(
            "act_id"=>$act_id,
            "addresses"=>$addresses,
            "express_area_price"=>$express_area_price,
            "activity"=>$activity,
        );
    }
    function action_beta_pay(){

    }
    function action_beta_save(){
        try {
            $wx_browser = is_wechat_browser();
            $uid = Model_Design_Tool_Beta::get_uid();
            if($uid == 0){
                self::_location("/");
            }
            //支付类型
            $pay_type = @$_POST['pay_type'];
            if (!in_array($pay_type, array("wechat", "alipay")))
                throw new Exception("支付类型不合法");

            //地址ID
            $addr_id = intval(@$_POST['addr_id']);
            if (!$addr_id)
                throw new Exception("地址ID不合法");

            $address = self::_db()->select_row("select * from user_addresses where id = ?",$addr_id);
            if (!$address)
                throw new Exception("地址不存在");

            $express_price_res = self::_db()->select_row("select * from express_prices where area = ?",str_replace("市","",str_replace("省","",$address['province'])));

            if (!$express_price_res)
                throw new Exception("快递费没有配置,请联系网站管理员");

            //备注
            $notes = @$_POST['notes'];
            //活动ID
            $activityId = intval(@$_POST['act_id']);
            if (!$activityId)
                throw new EtException("活动ID不合法");

            $activity = self::_db()->select_row("select * from activities where id = ?",$activityId);

            if($activity['delivery_type'] == "unity"){
                $total_express = $express_price_res['price']/5;
            }else{
                $total_express = $express_price_res['price'];
            }

            if (!$activity)
                throw new Exception("活动不存在");
            if (time() < strtotime($activity['start_time']) || time() > strtotime($activity['end_time']))
                throw new Exception("当前活动已过期");#700001

            if (2 == $activity['pass'])
                throw new Exception("活动审核未通过");

            //订单产品
            $order_goods_row = array();
            //款式列表
            $product_list = @$_POST['product_list'];
            if (!$product_list)
                throw new Exception("款式不能为空");
            $product_list = @json_decode($product_list, true);
            if (!$product_list)
                throw new Exception("款式提交参数不合法");
            $temp = array();
            $app_id = 1;
            $enable = "y";
            $quantity = 0;
            $total_product_price = 0.00;
            self::_db()->bt();
            foreach ($product_list as $product) {
                $product_id = intval(@$product['product_id']);
                $style_id = intval(@$product['style_id']);
                $size = @$product['size'];
                $nums = intval(@$product['nums']);

                $product_style_size = self::_db()->select_row("select s.id,s.inventory,ap.selling_price as app_sell_pirce,apps.selling_price as app_ps_sell_pirce,aps.sell_price,ps.color_name from product_style_sizes as s
                                              left join product_styles as ps on ps.product_id = s.product_id and ps.id = s.product_style_id
                                              left join activity_product_styles as aps on aps.product_id = s.product_id and aps.product_style_id = s.product_style_id
                                              left join app_products as ap on ap.id = aps.app_product_id
                                              left join app_product_styles as apps on apps.id = aps.app_product_style_id
                                              where aps.app_product_id = ? and
                                              aps.app_product_style_id = ? and
                                              s.size = ? and
                                              aps.activity_id = ?", $product_id, $style_id, $size, $activityId);

                if (!$product_style_size)
                    throw new Exception("尺寸不存在");

                if (!$product_style_size['sell_price']) {
                    throw new Exception("售价不能为空");
                }
                //todo 库存
                $order_goods_row[] = array(
                    'product_style_size_id' => $product_style_size['id'],
                    'activity_product_style_id' => $product_style_size['id'],
                    'product_style_id' => $style_id,
                    'activity_id' => $activityId,
                    'quantity' => $nums,
                    'size' => $size,
                    'unit_price' => $product_style_size['sell_price'],
                    'purchase_price' => $product_style_size['app_ps_sell_pirce'] ? $product_style_size['app_ps_sell_pirce'] : $product_style_size['app_sell_pirce'],
                    'product_name' => $product['style_name'],
                    'product_style_name' => $product_style_size['color_name'],
                    'img_path' => $product['image'],
                    'notes' => "",
                );
                $quantity += $nums;
                $total_product_price += $product_style_size['sell_price'] * $nums;
                $temp[] = $size . '*' . $nums;
            }

            //计算下单产品总价
            $total_amount = $total_product_price;
            //pt_log($order_goods_row);
            //订单
            $order_row = array(
                "activity_id" => $activityId,
                "uid" => $uid,
                "total_price" => $total_amount,
                "quantity" => $quantity,
                "express_price" => $total_express,
                "cdkey_price" => 0.0,
                "name" => $activity['name'],
                "body" => $activity['name'] . '(' . implode(',', $temp) . ')',
                "status" => "待付款",
                "pay_type" => $pay_type,
                "address_id" => $addr_id,
                'notes' => $notes,
                "ship_name" => $address['name'],
                "ship_addr" => $address['address'],
                "ship_mobile" => $address['mobile'],
                "ship_tel" => $address['tel'],
                "ship_province" => $address['province'],
                "ship_city" => $address['city'],
                "ship_area" => $address['county'],
            );
            $order_no = date('ymdHis') . sprintf('%03d', floor(microtime() * 1000)) . mt_rand(10, 99);
            $now = date('Y-m-d H:i:s');
            $order_row['order_no'] = $order_no;
            $order_row['create_time'] = $now;
            $order_id = self::_db()->insert("orders",$order_row);
            if (!$order_id)
                throw new Exception("订单保存失败");

            //添加商品
            $_order_goods_row = array();
            foreach ($order_goods_row as &$v) {
                $v['order_id'] = $order_id;
                $_order_goods_row[] = $v;
            }
            self::_db()->insert("order_goods",$_order_goods_row);
            // 付值订单相关信息到属性表
            $payPrices = round($order_row['total_price'] + $order_row['express_price'], 2);

            $orderAttrebute['activity_info'] = $activity['description'];
            $orderAttrebute['pay_price'] = $payPrices;
            $orderAttrebute['order_id'] = $order_id;
            self::_db()->insert("order_attributes",$orderAttrebute);
            self::_db()->commit();
        } catch (Exception $e) {
            self::_db()->rollback();
            throw new Exception($e->getMessage());
        }
        $url = "/order/beta_pay?order_id={$order_id}&pay_type={$pay_type}";
        return array(
            "url" => $url,
        );
    }
    /**
     * 订单确认页
     */
    function view_confirm(){

    }

    /**
     * 订单保存API
     * @link http://git.ptphp.com/easytee/easytee-me/blob/master/docs/order.md
     *
     */
    function action_save(){

    }
    static function gen_order_no(){
        return date('ymdHis') . sprintf('%03d', floor(microtime() * 1000)) . mt_rand(10, 99);
    }
    /**
     *
     * 保存订单
     *
     * @param $uid
     * @param $goods_price
     * @param $exp_price
     * @param $quantity
     * @param $subject
     * @param $body
     * @param $img_url
     * @param $notes
     */
    static function save($uid,$goods_price,$exp_price,$quantity,$subject,$body,$img_url,$notes){
        $order_no = self::gen_order_no();
        $order_id = self::_db(NEW_DB)->insert("order",array(
            'uid'=>$uid,
            'order_no'=>$order_no,
            'goods_price'=>$goods_price,
            'exp_price'=>$exp_price,
            'quantity'=>$quantity,
            'subject'=>$subject,
            'body'=>$body,
            'img_url'=>$img_url,
            'notes'=>$notes,
            'add_time'=>date_time_now(),
        ));
        return $order_id;
    }
    static function bind_activity($order_id,$activity_id){
        self::_db(NEW_DB)->insert("order_activity",array(
            "order_id"=>$order_id,
            "activity_id"=>$activity_id,
        ));
    }
    static function get_order_info_by_id($id){
        return self::_db(NEW_DB)->select_row("
              select o.*,pay.*,ship.*
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              left join order_activity as ac on ac.order_id = o.id
              where o.id = ?
              ",$id);
    }
    static function get_order_info_by_order_no($order_no){
        return self::_db(NEW_DB)->select_row("
              select o.*,pay.*,ship.*
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              left join order_activity as ac on ac.order_id = o.id
              where o.order_no = ?
              ",$order_no);
    }

    static function get_order_status_by_id($id){
        return self::_db(NEW_DB)->select_row("
              select o.status,pay.pay_status,ship.ship_status
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              where o.id = ?
              ",$id);
    }

    static function get_order_status_by_order_no($order_no){
        return self::_db(NEW_DB)->select_row("
              select o.status,pay.pay_status,ship.ship_status
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              where o.id = ?
              ",$order_no);
    }

    /**
     * 关闭订单
     * @param $id
     * @throws Exception
     */
    static function close($id){
        self::_db(NEW_DB)->update("order",array(
            "status"=>0,
            "up_time"=>date_time_now()
        ),array("id"=>$id));
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
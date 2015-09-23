<?php
/**
 * 活动第三方接口
 */
class Model_Open_Activity extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    /**
     * 初始化设计工具
     * @return array
     */
    static function init($uid){
        #初始化设计
        $info = array(
            'app_id' => 1,
            'uid' => $uid,
        );
        $design_id = self::_db()->insert("designs",$info);

        #初始化活动
        $info['design_id'] = $design_id;
        $info['sales_target'] = 50;
        $info['status'] = 'create';
        $activity_id = self::_db()->insert("activities",$info);


        #保存canvas
        $canvas = array(
            'location' => 'front',
            'width' => '436',
            'height' => '87',
            'bgcolor' => '7B0B07',
            'colors' => 1,
            'region_name' => 1,
            'app_id' => 1,
            'uid' => 0,
            'design_id' => $design_id,
        );
        $canvasId = self::_db()->insert("canvas",$canvas);

        #保存Canvas object
        $canvasObject = array(
            'location' => 'FRONT',
            'canvas_id' => $canvasId,
            'x' => 43,
            'y' => 255,
            'z' => 0,
            'width' => 348,
            'height' => 69,
            'colors' => '{"fill_color":"FFFFFF","stroke_color":"FFFFFF"}',
            'shape' => 'arcup',
            'disable' => '{"disable_text_your_text_word":0,"disable_text_your_text_color":0,"disable_text_font_category":0,"disable_text_font_name":0,"disable_text_font_outline":0,"disable_size_width":0,"disable_size_height":0,"disable_size_rotation":0,"disable_size_spacing":0,"disable_size_curve":0,"disable_shape_select_shape":0,"disable_position_align":0,"disable_position_flip":0,"disable_position_nudge":0,"disable_layer_forwardback":0}',
            'type' => 'text',
            'app_id' => 1,
            'private_fields' => '{"value":"\u8bf7\u8f93\u5165\u6587\u5b57","fill_color":"FFFFFF","stroke_color":"FFFFFF","font_id":"136"}',
        );
        self::_db()->insert("canvas_objects",$canvasObject);

        return array(
            "design_id"   => $design_id,
            "activity_id" => $activity_id,
        );
    }
    function action_create($app_id,$uid,$mobile,$time,$return_url,$extra_price,$extra_percent,$sign){
        $app = self::_db()->select_row("select id,app_secret from et_application where app_id = ?",$app_id);
        if(!$app) throw new Exception("app 不存在");
        $request = array(
            "model"=>"open/activity",
            "action"=>"create",
            "app_id"=>$app_id,
            "uid"=>$uid,
            "extra_price"=>$extra_price,
            "extra_percent"=>$extra_percent,
            "mobile"=>$mobile,
            "time"=>$time,
            "return_url"=>$return_url,
        );
        $_sign =  md5(http_build_query($request).$app['app_secret']);
        if(!$mobile) throw new Exception("手机号不合法");
        if($_sign != $sign) throw new Exception("签名不正确");

        $app_user = self::_db()->select_row("select * from et_app_user where app_uid = ? and app_id = ?",$uid,$app["id"]);

        if(!$app_user){
            $et_uid = self::_db()->insert(
                "et_user",array(
                    "mobile"=>$mobile,
                    "nick_name"=>$mobile,
                    "add_time"=>date_time_now(),
                    "password"=>md5(time()),
                )
            );
            self::_db()->insert("et_app_user",array(
                "app_id"   => $app['id'],
                "uid"      => $et_uid,
                "app_uid"  => $uid,
                "add_time" => date_time_now(),
            ));
        }else{
            $et_uid = $app_user['uid'];
        }
        $info = self::init($et_uid);
        $act_id = $info['activity_id'];

        self::_db()->insert("et_app_activity",array(
            "id"=>$act_id,
            "app_id"=>$app['id'],
            "app_uid"=>$uid,
            "extra_price"=>$extra_price,
            "extra_percent"=>$extra_percent,
            "return_url"=>$return_url,
        ));
        switch(PtApp::$ENV){
            case "develop":
                $url = "http://11.dev.jzw.com";
                break;
            case "test":
                $url = "http://11.dev.jzw.la";
                break;
            default:
                $url = "http://www.easytee.me";
                break;
        }
        $url .= '/design/?DesignID='.$info['design_id'].'&ActivityID='.$info['activity_id'];
        //return self::get_app_return_url($app['id'],$uid,$info['activity_id']);
        self::_location($url);
    }
    static function get_app_return_url($app_id,$app_uid,$activity_id){
        $app = self::_db()->select_row("select act.return_url,app.app_secret from et_application as app left join et_app_activity as act on act.app_id = app.id where app.id = ? and act.id = ?",$app_id,$activity_id);
        $request = array(
            "uid"=>$app_uid,
            "activity_id"=>$activity_id,
            "time"=>time(),
        );
        $request['sign'] =  md5(http_build_query($request).$app['app_secret']);
        return $app['return_url']."&".http_build_query($request);
    }
    function action_detail($app_id,$activity_id,$time,$sign){
        $app = self::_db()->select_row("select id,app_secret from et_application where app_id = ?",$app_id);
        if(!$app) throw new Exception("app 不存在");
        $request = array(
            "model"=>"open/activity",
            "action"=>"detail",
            "app_id"=>$app_id,
            "activity_id"=>$activity_id,
            "time"=>$time
        );
        $_sign =  md5(http_build_query($request).$app['app_secret']);
        if($_sign != $sign) throw new Exception("签名不正确");
        return Model_Activity::detail_info($activity_id,$app['id']);
    }
    function action_order($app_id,$activity_id,$time,$sign){
        $app = self::_db()->select_row("select app_secret from et_application where app_id = ?",$app_id);
        if(!$app) throw new Exception("app 不存在");
        $request = array(
            "model"=>"open/activity",
            "action"=>"order",
            "app_id"=>$app_id,
            "activity_id"=>$activity_id,
            "time"=>$time
        );
        $_sign =  md5(http_build_query($request).$app['app_secret']);
        if($_sign != $sign) throw new Exception("签名不正确");
        $order = self::_db()->select_rows("select
            o.order_no,o.goods_price,o.quantity,o.subject,ship.exp_com,
            ship.exp_no,ship.ship_status,ship.ship_time from et_order as o
            left join et_order_activity as act on act.order_id = o.id
            left join et_order_ship as ship on ship.order_id = o.id
            where act.activity_id = ?",$activity_id);

        return $order;
    }
    function action_close($app_id,$activity_id,$status,$time,$sign){
        $app = self::_db()->select_row("select app_secret from et_application where app_id = ?",$app_id);
        if(!$app) throw new Exception("app 不存在");
        $request = array(
            "model"=>"open/activity",
            "action"=>"close",
            "app_id"=>$app_id,
            "status"=>$status,
            "activity_id"=>$activity_id,
            "time"=>$time
        );
        $_sign =  md5(http_build_query($request).$app['app_secret']);
        if($_sign != $sign) throw new Exception("签名不正确");
        //todo get activity and check status
        self::_db()->update("et_activity_info",array("status"=>$status),array("id"=>$activity_id));
        return array("结束活动成功");
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
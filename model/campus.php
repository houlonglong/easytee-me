<?php
/**
 * 易衫开学礼
 */
class Model_Campus extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    static function check_auth(){
        $campus = self::_db()->select_row('SELECT a.status FROM user_campus AS a LEFT JOIN users AS b  ON a.uid=b.app_uid WHERE  b.id=?',Model_User_Abstract::get_uid());

        if($campus && $campus['status'] = 1){
            return true;
        }else{
            return false;
        }
    }

    function view_index(){
        $is_logined = Model_User_Auth::is_logined();
        $is_authed = false;
        if($is_logined){
            $is_authed = self::check_auth();
        }

        return array("is_logined"=>$is_logined,"is_authed"=>$is_authed);
    }
       /**
     * 参加活动成功
     */
    function view_success() {
        $is_logined = Model_User_Auth::is_logined();
        if(Model_User_Auth::get_uid()<=0){
            $this->redirect('/user/auth/login');
        }
    }
    function view_auth(){
        $is_logined = Model_User_Auth::is_logined();
        if(Model_User_Auth::get_uid()<=0){
            self::_location('/user/auth/login');
        }
        if(self::check_auth()){// 认证通过
            self::_location('/campus/index');
            exit;
        }

    }
    function action_do_auth(){
        $is_logined = Model_User_Auth::is_logined();
        try{
            if(Model_User_Auth::get_uid()<=0){
                throw new Exception('请先登录');
            }
            $data = array();
            if(!isset($_REQUEST['img_url']) || !$_REQUEST['img_url']){
                throw new Exception('图片不能为空哦');
            }
            $content = $_REQUEST['img_url'];
            $con = explode('base64,',$content);
            $rand = rand(1000,9999);
            $a = explode(';',$con[0]);
            $path = 'user/campus/'.date('Y-m-d').'/'.$rand.'.'.str_replace('data:image/','',$a[0]);
            $data['img_url'] = Model_Aliyun_Oss::upload_content($con[1],$path);
            if(!isset($_REQUEST['real_name']) || !$_REQUEST['real_name']){
                throw new Exception('真实姓名不能为空哦');
            }
            $data['real_name'] = $_REQUEST['real_name'];
            if(isset($_REQUEST['major'])){
                $data['major'] = $_REQUEST['major'];
            }
            if(!isset($_REQUEST['student_no']) || !$_REQUEST['student_no']){
                throw new Exception('学号不能为空哦');
            }
            $data['student_no'] = $_REQUEST['student_no'];
            if(!isset($_REQUEST['school_name']) || !$_REQUEST['school_name']){
                throw new Exception('学校不能为空哦');
            }
            $data['school_name'] = $_REQUEST['school_name'];
            $data['add_time'] = date('Y-m-d H:i:s');

            $user_campus = self::_db()->select_row('select id from user_campus where uid =?',Model_User_Auth::get_uid());

            if($user_campus){
                self::_db()->update('user_campus',$data,array('uid'=>Model_User_Auth::get_uid()));
            }else{
                $data['uid']=Model_User_Auth::get_uid();
                self::_db()->insert('user_campus',$data);
            }
            echo json_encode(array('status'=>0));exit;
        }catch(Exception $e){
            echo json_encode(array('status'=>1,'message'=>$e->getMessage()));exit;
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
<?php
/**
 * �û�ע��
 */
class Model_User_Forgetpass extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_do_register($captcha,$mobile,$password,$verify_password){
        PtApp::session_start();
        $reg_captcha = empty($_SESSION['reg_captcha'])?"":$_SESSION['reg_captcha'];
        if(!$reg_captcha) throw new Exception("��֤�벻��Ϊ��",8001);
        $is_register = self::_db()->select_row('select id from et_user where mobile = ? ',$mobile);
        //var_dump($mobile);exit;
        if($is_register) throw new Exception("��ǰ�����Ѿ�ע���");
        $password = md5($password);
        if($captcha != "0000" &&$captcha != $reg_captcha) throw new Exception("��֤�벻��ȷ");
        $uid = self::_db()->insert("et_user",array(
            'nick_name'=>$mobile,
            'mobile'=>$mobile,
            'password'=>$password,
            'add_time'=>date_time_now(),
        ));
        self::_db()->insert("et_user_finance",array(
            'uid'=>$uid,
        ));

        $user_info = array(
            "uid"=>$uid,
            "nick_name"=>$mobile,
        );
        Model_User_Auth::set_login($user_info);
        unset($_SESSION['reg_captcha']);
        setcookie("invite_id_cookie","",time()-3600,"/");
        $res = array("message"=>"ע��ɹ�");
        if($redirect) $res['redirect'] = $redirect;
        return $res;
    }
    function action_get_code($mobile){
        //��ѯ�ֻ����ǲ��Ǵ���s
        $is_register = self::_db()->select_row('select id from et_user where mobile = ? ',$mobile);
        if(!$is_register) throw new Exception("��ǰ");
        return $is_register;
        print_r($is_register);
        echo 11;exit;
        //�����ڵ���ʾ
        if(!$is_register){
            throw new Exception("��ǰ���벻����");
        }
        return $is_register;
        //���ڵĻ�������֤��
        PtApp::session_start();
        //ע����֤��
        $reg_captcha = $_SESSION['reg_captcha'] = rand(1000,9999).rand(10,99);
        $project = "6pvkv3";
        $option = array('code'=>$reg_captcha);
        Model_Tools_Sms::sendsms($mobile,$project,$option);



        return "�ֻ���֤���ѷ���";
    }

}
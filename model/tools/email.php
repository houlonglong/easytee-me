
<?php
/**
 * 发送邮件
 */
class Model_Tools_Email  {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }


    /**
     * @param $to_mail   发送邮箱
     * @param $to_name   发送人NAME
     * @param $project   SUBMIAL PROJECT
     */

    static function subemail_send($to_mail,$to_name,$project){

        require_once PATH_LIBS . '/submail/SUBMAILAutoload.php';

        /*
         |init MAILXsend class
         |--------------------------------------------------------------------------
         */

        $submail=new MAILXsend(PtApp::$setting['submail']['email']);
        $submail->AddTo($to_mail,$to_name);
        $submail->SetProject($project);
        $submail->AddHeaders('X-Accept','zh-cn');
        $submail->AddHeaders('X-Mailer','leo App');

        $xsend=$submail->xsend();

        print_r($xsend);

    }

    /**
     * @param $to_mail 接收邮箱
     * @param $title   邮件title
     * @param $content 邮件内容
     * @param int $debug debug
     * @return bool
     * @throws Exception
     */
    static function phpmailer_send_email($to_mail,$title,$content,$debug=0){
        require_once PATH_LIBS . '/phpmailer/PHPMailerAutoload.php';
        $setting = PtApp::$setting;
        try{
            $mail = new PHPMailer;
            $mail->isSMTP();
            $mail->SMTPSecure = $setting['phpmailer']['secure'];
            //$mail->SMTPSecure = "tls";
            $mail->SMTPDebug = $debug;
            $mail->Debugoutput = 'text';
            $mail->Host = $setting['phpmailer']['host'];
            $mail->Port = $setting['phpmailer']['port'];
            $mail->SMTPAuth = true;
            $mail->Username = $setting['phpmailer']['username'];
            $mail->Password = $setting['phpmailer']['password'];
            $mail->setFrom($setting['phpmailer']['from_mail'], $setting['phpmailer']['from_name']);
            $mail->addReplyTo($setting['phpmailer']['reply_mail'], $setting['phpmailer']['reply_name']);
            $mail->addAddress($to_mail, "John");
            $mail->Subject = $title;

            $t =  <<<template
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>{$title}</title>
</head>
<body>
<div style="width: 640px; font-family: Arial, Helvetica, sans-serif; font-size: 11px;">
    <h1>{$title}</h1>
    <div>
        {$content}
    </div>
</div>
</body>
</html>
template;
            $mail->msgHTML($t);
            #$mail->msgHTML($body);

            if (!$mail->send()) {
                throw new Exception($mail->ErrorInfo);
            } else {
                return true;
            }
        }catch (Exception $e){
            throw new Exception($e->getMessage());
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
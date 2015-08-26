<?php

/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/10/15
 * Time: 5:49 PM
 */
class Model_Tools_Sms
{
    function cli_send()
    {
        $argvs = pt_get_argvs();
        var_dump($argvs);
    }

    /**
     * @param $mobile 手机号码
     * @param $project summail project
     * @param $option  短信参数
     * @return mixed
     * @throws Exception
     */
    static function sendsms($mobile,$project,$option)
    {
        require_once PATH_LIBS . '/submail/SUBMAILAutoload.php';
        $submail = new MESSAGEXsend(PtApp::$setting['submail']['message']);
        $submail->AddTo($mobile);
        $submail->SetProject($project);
        foreach ($option as $a => $b) {
            $submail->AddVar($a, $b);
        }
        try{
            $xsend = $submail->xsend();
            if(!$xsend['status']){
                throw new Exception('短信未发送成功，返回null');
            }
            if($xsend['status'] == 'error'){
              throw new Exception($xsend['msg']);
            }
            return $xsend;

        }catch (Exception $e){
            throw new Exception($e->getMessage());
        }



    }
}
<?php
/**
 * 系统部署
 */
class Model_Admin_System_Deploy extends Model_Admin_Abstract{
    static $table = "";
    function __construct(){
        parent::__construct();
        $env = \PtLib\get_pt_env("PT_ENV");
        if($env == "test" || $env == "product"){
            exit;
        }
    }
    /**
     * V1.1 线上测试环境
     */
    function action_v_1_1_test(){
        $cmd = 'ssh e_dev "cd /data/git/easytee/easytee_v1-1 && git pull origin master && rsync --exclude=\'www/app/tmp\' --exclude=\'.git\' -a -r -t -v --progress /data/git/easytee/easytee_v1-1 /data/projects/easytee"';
        //echo $cmd;exit;
        PtLib\log($cmd);
        $res = shell_exec($cmd);
        return array(
            "cmd"=>$cmd,
            "res"=>$res,
        );
    }
    /**
     * V1.1 线上正式环境
     */
    function action_v_1_1_product(){
        $cmd = 'ssh e_www "cd /data/git/easytee/easytee_v1-1 && git pull origin master && rsync --exclude=\'www/app/tmp\' --exclude=\'.git\' -a -r -t -v --progress /data/git/easytee/easytee_v1-1 /opt/projects/easytee"';
        PtLib\log($cmd);
        $res = shell_exec($cmd);
        return array(
            "cmd"=>$cmd,
            "res"=>$res,
        );
    }


    /**
     * V2.0 线上正式环境
     */
    function action_v_2_0_product(){
        $cmd = 'ssh e_www "cd /opt/projects/easytee/easytee_v2 && git pull origin master"';
        PtLib\log($cmd);
        $res = shell_exec($cmd);
        return array(
            "cmd"=>$cmd,
            "res"=>$res,
        );
    }

    /**
     * V2.0 线上测试环境
     */
    function action_v_2_0_test(){
        $cmd = 'ssh e_dev "cd /data/projects/easytee/easytee_v2_test && git pull origin master"';
        PtLib\log($cmd);
        $res = shell_exec($cmd);
        return array(
            "cmd"=>$cmd,
            "res"=>$res,
        );
    }

    /**
     * V2.0 线上 Task Service
     */
    function action_v_2_0_task_service(){
        $cmd = 'ssh e_s "cd /data/projects/easytee/easytee_v2 && git pull origin master"';
        PtLib\log($cmd);
        $res = shell_exec($cmd);
        return array(
            "cmd"=>$cmd,
            "res"=>$res,
        );
    }
    function action_git_commit(){
        $msg = slef::_request("msg");
        $root = PATH_PRO;
        $cmd = "cd $root && git add . && git commit -m '{$msg}' && git pull origin master && git push origin master";
        PtLib\log($cmd);
        $res = shell_exec($cmd);
        return array(
            "cmd"=>$cmd,
            "res"=>$res,
        );
    }
}
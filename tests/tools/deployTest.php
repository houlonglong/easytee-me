<?php
use PtLib\UnitTest as UnitTest;
/**
 * 部署工具
 */
class DeployTest extends UnitTest{
    /**
     * V1.1 线上测试环境
     */
    function test_v_1_1_test(){
        $cmd = 'ssh e_dev "cd /data/git/easytee/easytee_v1-1 && git pull origin master && rsync --exclude=\'www/app/tmp\' --exclude=\'.git\' -a -r -t -v --progress /data/git/easytee/easytee_v1-1 /data/projects/easytee"';
        PtLib\log($cmd);
        system($cmd);
    }
    /**
     * V1.1 线上正式环境
     */
    function test_v_1_1_product(){
        $cmd = 'ssh e_www "cd /data/git/easytee/easytee_v1-1 && git pull origin master && rsync --exclude=\'www/app/tmp\' --exclude=\'.git\' -a -r -t -v --progress /data/git/easytee/easytee_v1-1 /opt/projects/easytee"';
        PtLib\log($cmd);
        system($cmd);
    }


    /**
     * V2.0 线上正式环境
     */
    function test_v_2_0_product(){
        $cmd = 'ssh e_www "cd /opt/projects/easytee/easytee_v2 && git pull origin master"';
        PtLib\log($cmd);
        system($cmd);
    }

    /**
     * V2.0 线上测试环境
     */
    function test_v_2_0_test(){
        $cmd = 'ssh e_dev "cd /data/projects/easytee/easytee_v2_test && git pull origin master"';
        PtLib\log($cmd);
        system($cmd);
    }

    /**
     * V2.0 线上 Task Service
     */
    function test_v_2_0_task_service(){
        $cmd = 'ssh e_s "cd /data/projects/easytee/easytee_v2 && git pull origin master"';
        PtLib\log($cmd);
        system($cmd);
    }

}
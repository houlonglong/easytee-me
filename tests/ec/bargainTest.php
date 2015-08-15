<?php
use PtLib\UnitTest as UnitTest;
/**
 * 砍价
 *
 */
class BargainTest extends UnitTest{
    /**
     * @param $original_price    原价
     * @param $qprice            前几刀砍至价
     * @param $bargain_nowprice  现价
     * @param $minimum_price     底价
     * @param $dao               砍刀数
     * @param $qdao              前几刀
     * @param $count             当前刀数
     */
    static function dao($original_price,$qprice,$bargain_nowprice,$minimum_price,$dao,$qdao,$count){
        //$cha = $bargain["original"] - $bargain["minimum"];
        //$kan = floor($cha / $bargain["dao"]);

        //if (1 < $kan) {
            //$jian = rand(1, $kan - 1);
            //$kanzhi = $kan - $jian;
        //}
        //else {
            //$kanzhi = $kan;
        //}
        $price = null;
        if($dao - $count == 1){
            $price = $original_price - $minimum_price;
        }else{
            if($count < $qdao){

            }
        }
        return $price;


    }
    /**
     *
     */
    function test_dao(){
        $original_price   = 1000;
        $qprice           = 200;
        $bargain_nowprice = 1000;
        $minimum_price    = 500;
        $dao              = 5;
        $qdao             = 2;
        $count            = 0;

        $price = self::dao($original_price,$qprice,$bargain_nowprice,$minimum_price,$dao,$qdao,$count);
        var_dump($price);
    }


    /**
     *
     *
    function test_action_test(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $res = $this->post_action("/auth/login?action=do_login",array(
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }
     */
}
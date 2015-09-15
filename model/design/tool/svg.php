<?php

/**
 * 设计工具
 */

class Model_Design_Tool_Svg extends BaseModel
{
    static $table = "";

    function __construct()
    {
        //parent::__construct();
    }
    function cli_upload(){
        $sides = array("front","back","third","fourth");
        $svgs = self::_db()->select_rows("select * from design_svgs");
        foreach($svgs as $svg){
            $design_id = $svg['design_id'];
            foreach($sides as $side){
                if(!empty($svg['svg_'.$side])){
                    $svg_side = $svg['svg_'.$side];
                    $name = "product/activity/design_svg/$design_id/$side.svg";
                    $h_key = "svg_1".md5($name);
                    if(self::_redis()->get($h_key)){
                        echo "exsits".PHP_EOL;continue;
                    }
                    //echo $svg_side;
                    try{
                        $url = Model_Aliyun_Oss::upload_content($svg_side,$name);
                        echo $url.PHP_EOL;
                        self::_redis()->set($h_key,1);
                        if($url){
                            self::_db()->insert("design_svg_url",array(
                                "svg_url"=>$url,
                                "side"=>$side,
                                "design_id"=>$design_id,
                                "create_time"=>date_time_now(),
                            ));
                        }
                    }catch(Exception $e){
                        echo $e->getMessage().PHP_EOL;
                    }
                }
            }

        }

    }
}
<?php
namespace Service\Etservice;
use Service\Imagemagick\Convert as ImgConvert;
use Service\Aliyun\Oss\Api as AliyunOssApi;
use Exception;

class Merge{
    static function action_merge_pic(){
        //不能在命令行下执行
        if(PHP_SAPI == 'cli') return;
        define("TAKS_RECEIVED","take_received");
        if (ob_get_level() == 0) ob_start();
        echo "take_received".PHP_EOL;
        ob_flush();
        flush();
        sleep(2);
        $data = @file_get_contents('php://input');
        pt_log($data);
        try{
            $data = json_decode($data,1);
            if(!$data){
                throw new Exception("非法传入参数");
            }
            pt_log("========合并开始");
            self::merge_pic($data);
            pt_log("========合并成功");
        }catch (Exception $e){
            pt_log($e->getMessage());
        }
        ob_end_flush();
    }

    static function merge_pic($data,$bucket = "open-edit"){
        $activityId   = $data['activityId'];
        $design       = $data['design'];
        $design_id    = $design['id'];
        $design_img   = $design['image'];
        $des_svgs = db("open")->select_row("select svg_front,svg_back,svg_third,svg_fourth from design_svgs where design_id = ?",$design_id);
        $productStyle = $data['productStyle'];
        foreach($productStyle as $ps){
            $styleId   = $ps['styleId'];
            $productId = $ps['productId'];
            $ps_image  = $ps['image'];
            $color     = $ps['color'] ? str_replace("#","",$ps['color']) : "none";

            $regions = db("open")->select_rows("select r.region,i.side from product_style_images as i
                                      left join product_style_image_regions as r on r.product_style_image_id = i.id
                                      where i.product_style_id = ? and i.product_id = ? ",$styleId,$productId);
            $_regions = array();
            foreach($regions as $r){
                $_regions[$r['side']] = $r['region'];
            }

            $value = array();
            foreach($ps_image as $side =>$url){
                if(empty($url)){
                    continue;
                }
                $design_svg = empty($des_svgs['svg_'.$side])?"":$des_svgs['svg_'.$side];
                if(!empty($_regions[$side])){
                    $r = $_regions[$side];
                    $t = explode(",",$r);
                    $x = $t['0']/2;
                    $y = $t['1']/2;
                    $vb = 'viewBox="-'.$x.' -'.$y.' 500 500"';
                    $design_svg = "<svg ".$vb.substr($design_svg,4);
                    $design_svg = self::replace_svg_str($design_svg,'height="','"',500);
                    $design_svg = self::replace_svg_str($design_svg,'width="','"',500);
                    $design_svg = self::replace_svg_str($design_svg,'height:',"px",500);
                    //$design_svg = replace_svg_str($design_svg,'width:',"px",500);
                }
                pt_log($design_svg);
                pt_log("-----$side");
                //pt_log($design_svg);
                $content = self::gen_svg_content($url,$color,$design_svg);
                //pt_log($content);
                $path = "activitys/$activityId/{$productId}_{$styleId}_$side";
                $dir = "/tmp/pic/convert";

                $save_path_svg = $dir."/".$path.".svg";
                $save_path_png = $dir."/".$path.".png";
                if(!is_dir(dirname($save_path_svg))){
                    mkdir(dirname($save_path_svg),0755,1);
                }
                pt_log($save_path_svg);
                file_put_contents($save_path_svg,$content);
                ImgConvert::svg2png($save_path_svg,$save_path_png,$color,500);
                pt_log("-----convert ok!");
                AliyunOssApi::oss_upload_file($bucket,$save_path_png,$path.".png");
                pt_log("-----upload ok!");
                $value[$side] = "REPLACE_DOMAIN_WITH/".$path.".png";
            }
            self::update_activity_product_style($activityId,$productId,$styleId,$value);
        }
    }

    /**
     * 生成 T - shirts svg
     * @param $shirt           样衣图片地址
     * @param string $color    背影色
     * @param string $design   素材SVG
     * @return string
     */
    static function gen_svg_content($shirt,$color = '',$design = ''){
        $color? $color = 'background-color:#'.$color : '';
        $shirt = 'data:image/png;base64,'.base64_encode(file_get_contents($shirt));
        $str  = '<svg height="500" width="500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="overflow: hidden; position: relative;' . $color .'" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">' .
            '<image x="0" y="0" width="500" height="500" preserveAspectRatio="none" xlink:href="' . $shirt . '" transform="matrix(1,0,0,1,0,0)"></image>';
        if($design)
            $str .= $design;
        return $str.'</svg>';
    }
    static function replace_svg_str($str,$find,$end,$replace){
        $f = strpos($str,$find,0);
        $s = $f + strlen($find);
        $t = strpos($str,$end,$s);
        return substr($str,0,$f).$find.$replace.substr($str,$t);
    }
    static function update_activity_product_style($activity_id,$product_id,$product_style_id,$value){
        pt_log(array($activity_id,$product_id,$product_style_id,$value));
        db("open_write")->update("activity_product_styles",array(
            "image"=>json_encode($value)
        ),array(
            "activity_id"=>$activity_id,
            "product_id"=>$product_id,
            "product_style_id"=>$product_style_id,
        ));
    }
}
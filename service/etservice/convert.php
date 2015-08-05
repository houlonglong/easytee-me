<?php
namespace Service\Etservice;
use Service\Aliyun\Oss\Api as AliyunOssApi;
use Service\Imagemagick\Convert as ImgConvert;
use Exception;

/**
 * 设计素材从SVG转化为PNG
 * Class Convert
 * @package Service\Etservice
 */
class Convert{
    static function action_svg_to_png(){
        $svgfront  = empty($_POST["svg_front"])?"":$_POST["svg_front"];
        $svgback  = empty($_POST["svg_back"])?"":$_POST["svg_back"];
        $svgthird  = empty($_POST["svg_third"])?"":$_POST["svg_third"];
        $svgfourth  = empty($_POST["svg_fourth"])?"":$_POST["svg_fourth"];

        $design_id  = empty($_POST["design_id"])?"":$_POST["design_id"];
        $app_id  = empty($_POST["app_id"])?"":$_POST["app_id"];

        pt_log("========design convert begin");
        $res = self::svg_to_png($design_id,$app_id,$svgfront,$svgback,$svgthird,$svgfourth,"open-edit");
        echo json_encode($res);
        pt_log("========design convert finish");
    }
    static function pic_convert($side,$data,$design_id,$app_id,$bucket = "open-edit"){
        $retun["side"] =$side;
        pt_log("side ---".$side);
        if($design_id && $app_id){
            $tempfilepath = "/tmp/tempFile/".$app_id.$design_id.'-'.$side;
            if(!is_dir(dirname($tempfilepath.".svg"))){
                mkdir(dirname($tempfilepath.".svg"),0777,1);
            }
            file_put_contents($tempfilepath.".svg",$data);
            $thumbpath = 'designs/'.$app_id."/".$design_id."/".$side.".png";
            try{
                ImgConvert::svg2png($tempfilepath.".svg",$tempfilepath.".png","",200,200);
                ImgConvert::gen_thumb($tempfilepath.".png",$tempfilepath."_thumb.png");
                AliyunOssApi::oss_upload_file($bucket,$tempfilepath."_thumb.png",$thumbpath);
                $retun["status"] = 'OK';
                $retun["msg"] = "REPLACE_DOMAIN_WITH/".$thumbpath;
            }catch (Exception $e){
                $retun["status"] = 'EERROR';
                $retun["msg"] = $e->getMessage();
            }
        }else{
            $retun["status"] = 'EERROR';
            $retun["msg"] = 'design_id or app_id is null';
        }
        return $retun;
    }
    static function svg_to_png($design_id,$app_id,$svgfront = '',$svgback = '',$svgthird = '',$svgfourth = '',$bucket = "open-edit"){
        $return = array();
        if($svgfront){
            $return[] = self::pic_convert('svg_front',$svgfront,$design_id,$app_id,$bucket);
        }
        if($svgback){
            $return[] = self::pic_convert('svg_back',$svgback,$design_id,$app_id,$bucket);
        }
        if($svgthird){
            $return[] = self::pic_convert('svg_third',$svgthird,$design_id,$app_id,$bucket);
        }
        if($svgfourth){
            $return[] = self::pic_convert('svg_fourth',$svgfourth,$design_id,$app_id,$bucket);
        }
        return $return;
    }
}
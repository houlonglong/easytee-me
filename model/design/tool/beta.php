<?php

/**
 * 设计工具
 */
class Model_Design_Tool_Beta extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }

    function action_design_init(){
        $result['product_info'] = Model_Product::get_product_info();
        PtApp::session_start();
        $session_id = session_id();
        $design_info = self::_redis()->get("user_design_info_".$session_id);
        if(!$design_info) $design_info = array(
            "cat_id"=>1,
            "product_id"=>1,
            "style_id"=>10,
            "color_count"=>0,
            "design_front"=>null,
            "design_back"=>null,
            "design_third"=>null,
            "design_fourth"=>null,
            "default_side"=>"front",

        );
        else $design_info = json_decode($design_info,1);

        $result['design_info'] = $design_info;

        return $result;
    }
    function action_get_templates(){
        $result['templates'] = array(
            array(
                "id"=>1,
                "price"=>1,
                "img_url"=>"http://www.xxx.com/test.png",
                "svg_url"=>"http://www.xxx.com/test.svg",
                "name"=>"name"
            )
        );
        return $result;
    }
    function action_product_pricing($sale_count,$color_count,$style_id){
        $sale_count = intval($sale_count);
        $color_count = intval($color_count);
        $style_id = intval($style_id);
        if(!$sale_count) throw new Exception("sale_count 不能为空");
        if($sale_count > 1000 || $sale_count < 10) throw new Exception("sale_count 不能大于1000件 且不能小于10件");
        if(!$color_count) throw new Exception("颜色数量不能为空");
        if($color_count>10) throw new Exception("颜色数量不能大于10种");
        if(!$style_id) throw new Exception("款式ID不能为空");
        $style = self::_db()->select_row("select * from et_product_style where id = ?",$style_id);
        if(!$style) throw new Exception("款式不存在");
        $print_cost = Model_Cost::calculate_cost($color_count,$sale_count);
        return array(
            "print_cost"=>$print_cost,
            "selling_price"=>$style['selling_price']
        );
    }

    function action_design_save($color_count,$default_side,$design_front,$design_back,$design_third,$design_fourth,$cat_id,$product_id,$style_id){
        PtApp::session_start();
        $info = array(
            "color_count"  => $color_count,
            "design_front" => $design_front,
            "design_back"  => $design_back,
            "design_third" => $design_third,
            "design_fourth"=> $design_fourth,
            "default_side" => $default_side,
            "cat_id"       => $cat_id,
            "product_id"   => $product_id,
            "style_id"     => $style_id,
        );
        $session_id = session_id();
        self::_redis()->set("user_design_info_".$session_id,json_encode($info));
        return "保存成功";
    }
    function action_activity_check_url_path($url_path){
        $res = self::_db()->select_row("select id from et_activity_info where url_path = ?",$url_path);
        return array(
            "url_path"=>$url_path,
            "exists"=>empty($res)?0:1
        );
    }

    function action_activity_save($name,$content,$period,$sale_target,$delivery_type,
                                  $ship_name,$ship_tel,$default_side,$url_path,$ship_province,$ship_city,
                                  $ship_county,$ship_addr,
                                    $styles,
                                  $svg_front,$svg_back,$svg_third,$svg_fourth){
        try{
            self::_db()->bt();
            $period      = intval($period);
            $sale_target = intval($sale_target);

            if(!$name) throw new Exception("活动名称不能为空");
            if(!$content) throw new Exception("活动描述不能为空");
            if(!$period) throw new Exception("活动期限不能为空");
            if(!$sale_target) throw new Exception("活动目标不能为空");
            if(!$url_path) throw new Exception("活动网址后缀不能为空");
            if(!$default_side) throw new Exception("默认面不能为空");

            PtApp::session_start();
            $session_id = session_id();
            $_design_info = self::_redis()->get("user_design_info_".$session_id);

            if(!$_design_info) throw new Exception("设计不存在");
            $design_info = json_decode($_design_info,1);

            $url_res = self::_db()->select_row("select id from et_activity_info where url_path = ?",$url_path);
            if($url_res) throw new Exception("活动网址后缀已存在");
            if(!$styles) throw new Exception("款式不能为空");
            //todo
            $uid = 0;
            $styles = json_decode($styles,1);
            $start_time = date_time_now();
            $end_time = date('Y-m-d H:i:s', strtotime('+'.$period.' day'));

            $design_row = array(
                'app_id' => 1,
                'uid' => $uid,
                'info' => $_design_info,
                'colors' => $design_info['color_count'],
            );

            $design_id = self::_db()->insert("designs",$design_row);
            $bucket_root = PtApp::$setting['aliyun_oss']['bucket_root'];
            $design_svg_side_row = array();
            if($svg_front){
                $svg_front_image = Model_Aliyun_Oss::upload_content($svg_front,$bucket_root."/design/svg/".$design_id."/front.svg");
                $design_svg_side_row[] = array(
                    'svg_url'=>$svg_front_image,
                    'design_id'=>$design_id,
                    'side'=>"front",
                    'create_time'=>date("Y-m-d H:i:s")
                );

            }
            if($svg_back){
                $svg_back_image = Model_Aliyun_Oss::upload_content($svg_back,$bucket_root."/design/svg/".$design_id."/back.svg");
                $design_svg_side_row[] = array(
                    'svg_url'=>$svg_back_image,
                    'design_id'=>$design_id,
                    'side'=>"back",
                    'create_time'=>date("Y-m-d H:i:s")
                );

            }
            if($svg_third){
                $svg_third_image = Model_Aliyun_Oss::upload_content($svg_third,$bucket_root."/design/svg/".$design_id."/third.svg");
                $design_svg_side_row[] = array(
                    'svg_url'=>$svg_third_image,
                    'design_id'=>$design_id,
                    'side'=>"third",
                    'create_time'=>date("Y-m-d H:i:s")
                );

            }
            if($svg_fourth){
                $svg_fourth_image = Model_Aliyun_Oss::upload_content($svg_fourth,$bucket_root."/design/svg/".$design_id."/fourth.svg");
                $design_svg_side_row[] = array(
                    'svg_url'=>$svg_fourth_image,
                    'design_id'=>$design_id,
                    'side'=>"fourth",
                    'create_time'=>date("Y-m-d H:i:s")
                );
            }
            //return $design_svg_side_row;
            if(empty($design_svg_side_row)) throw new Exception("设计不能为空");
            self::_db()->insert("design_svg_side",$design_svg_side_row);

            $row_old = array(
                "deadline"=>$period,
                "start_time"=>$start_time,
                "end_time"=>$end_time,
                "real_end_time"=>$end_time,
                "name"=>$name,
                "description"=>$content,
                "abstract"=>mb_substr($content, 0, 200) ,
                "delivery_type"=>$delivery_type,
                "status"=>"ongoing",
                "default_product_style_id"=>$design_info['style_id'],
                "sales_target"=>$sale_target,
                "thumb_img_url"=>"",
                "thumb_svg_url"=>"",
                "design_id"=>$design_id
            );
            $id = self::_db()->insert("activities",$row_old);

            $row = array(
                "id"=>$id,
                "name"=>$name,
                "content"=>$content,
                "uid"=>$uid,
                "period"=>$period,
                "sale_target"=>$sale_target,
                "url_path"=>$url_path,
                "default_side"=>$default_side,
                "delivery_type"=>$delivery_type,
                "status"=>1,
                "colors"=>$design_info['color_count'],
                "start_time"=>$start_time,
                "end_time"=>$end_time,
                "thumb_img_url"=>"",
                "thumb_svg_url"=>"",
                "default_style_id"=>$design_info['style_id'],
            );
            self::_db()->insert("et_activity_info",$row);

            if($delivery_type == 'unity'){
                if(!$ship_name) throw new Exception("收货人姓名不能为空");
                if(!$ship_tel) throw new Exception("收货人电话不能为空");
                if(!$ship_province) throw new Exception("收货人省不能为空");
                if(!$ship_city) throw new Exception("收货人市不能为空");
                if(!$ship_county) throw new Exception("收货人区不能为空");
                if(!$ship_addr) throw new Exception("收货人详细地址不能为空");

                self::_db()->insert("et_activity_ship",array(
                    "id"=>$id,
                    "name"=>$ship_name,
                    "tel"=>$ship_tel,
                    "province"=>$ship_province,
                    "city"=>$ship_city,
                    "county"=>$ship_county,
                    "addr"=>$ship_addr,
                ));
            }
            $row_styles = array();
            foreach($styles as $style_id => $style){
                $row_styles[] = array(
                    "activity_id"      => $id,
                    "product_style_id" => $style_id,
                    "product_id"       => $style['product_id'],
                    "sell_price"       => $style['price'],
                );
            }
            self::_db()->insert("activity_product_styles",$row_styles);
            self::_redis()->delete("user_design_info_".$session_id);
            //self::_db()->commit();
        }catch (Exception $e){
            self::_db()->rollback();
            throw new Exception($e->getMessage());
        }
        return "保存成功";


    }
}


<?php
/**
 * 图片服务
 */
class Model_Service_Pic{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function cli_run(){
        global $setting;
        print_r($setting);
    }

    function action_run(){

    }
    static function formate_design_upload_path($design_id,$side){
        $setting = PtApp::$setting;
        $env_root = $setting['aliyun_oss']['bucket_root'];
        return "{$env_root}/design/svg/{$design_id}/".$side;
    }
    static function formate_product_style_pic_upload_path($design_id,$product_style_image_id,$color,$side){
        $setting = PtApp::$setting;
        $env_root = $setting['aliyun_oss']['bucket_root'];
        return "{$env_root}/design/product_style/{$design_id}/{$product_style_image_id}_{$color}_{$side}";
    }
    static function file_get_content($url){
        return file_get_contents($url);
    }
    static function convert_design_svg_to_png($design_svg_url,$base_path){
        $convert_root = "/tmp";
        $content = self::file_get_content($design_svg_url);
        $file_name = $convert_root."/".$base_path.".svg";
        if(!is_dir(dirname($file_name))){
            @mkdir(dirname($file_name),0755,true);
        }
        $content = Model_Design::replace_svg($content);
        file_put_contents($file_name,$content);
        Model_Design::convert_svg_to_png($file_name,$convert_root."/".$base_path.".png");
        return $convert_root."/".$base_path.".png";
    }
    static function dowload_product_style_img($img_url,$base_path){
        $convert_root = "/tmp";
        $file_path = $convert_root."/".$base_path.".png";
        if(!is_dir(dirname($file_path))){
            mkdir(dirname($file_path),0755,true);
        }
        file_put_contents($file_path,self::file_get_content($img_url));
        return $file_path;
    }
    static function convert_product_style_svg_to_png($product_style_svg,$base_path,$color){
        $convert_root = "/tmp";
        $file_name = $convert_root."/".$base_path.".svg";
        if(!is_dir(dirname($file_name))){
            @mkdir(dirname($file_name),0755,true);
        }
        //$content = Model_Design::replace_svg($content);
        file_put_contents($file_name,$product_style_svg);
        Model_Design::convert_svg_to_png($file_name,$convert_root."/".$base_path.".png",$color);
        return $convert_root."/".$base_path.".png";
    }
    static function handle_product_style_image_color_png($product_style_image_id,$imgurl,$color,$base_path){
        $product_style_svg = Model_Design::get_tpl_svg($imgurl, $color);
        $location_png_path = self::convert_product_style_svg_to_png($product_style_svg, $base_path, $color);
        $remote_png_path = self::upload_to_aliyun_oss($location_png_path, $base_path . ".png");

        try{
            PtLib\db()->insert("product_style_images_color",array(
                "product_style_image_id"=>$product_style_image_id,
                "color"=>$color,
                "url"=>$remote_png_path
            ));
        }catch (Exception $e){

        }
        return array("remote_png_path"=>$remote_png_path,"location_png_path"=>$location_png_path);

    }
    static function merge_activity_pics($act_id){
        $act = PtLib\db_select_row("select design_id from activities where id = ?",$act_id);
        $design_id = $act['design_id'];
        //self::merge_design_pics($act_id,$design_id);
        $_design_svgs = PtLib\db_select_row("select svg_front_image,svg_back_image,svg_third_image,svg_fourth_image from design_svgs where design_id = ?",$design_id);

        $sides = array(
            "front"=>"前胸","back"=>"后背","third"=>"左袖","fourth"=>"右袖"
        );

        $design_svgs = array();
        foreach($sides as $side=>$name){
            if($_design_svgs["svg_{$side}_image"]) $design_svgs[$side] = $_design_svgs["svg_{$side}_image"];
        }
        $design_svg_local_pngs = array();
        foreach($design_svgs as $side => $design_svg_url){
            $base_path = self::formate_design_upload_path($design_id,$side);
            $location_png_path = self::convert_design_svg_to_png($design_svg_url,$base_path);
            $remote_png_path = self::upload_to_aliyun_oss($location_png_path,$base_path.".png");
            $design_svg_local_pngs[$side] = $location_png_path;
        }

        PtLib\log($design_svg_local_pngs);

        $_rows =PtLib\db_select_rows("select psi.id,psi.product_style_id,psi.product_id,ps.colors,ps.color_name,psi.side,psi.imgurl,psir.name as region_name,psir.region,psir.is_default
                                from product_style_images as psi
                                left join product_styles as ps on ps.id = psi.product_style_id
                                left join activity_product_styles as aps on aps.product_style_id = psi.product_style_id
                                left join product_style_image_regions as psir on psir.product_style_image_id = psi.id
                                where aps.activity_id = ?",$act_id);

        $rows = array();
        $product_style_image_ids = array();
        foreach($_rows as $row){
            $product_style_image_ids[] = $row["id"];
            $colors = json_decode($row['colors'],1);
            $row['color'] = $colors[0]["name"];
            unset($row['colors']);
            $rows[] =$row;
        }
        $product_style_image_rows = PtLib\db_select_rows("select product_style_image_id,color,url from product_style_images_color where product_style_image_id in (".implode(",",$product_style_image_ids).")");
        $product_style_image = array();
        foreach($product_style_image_rows as $product_style_image_row){
            $product_style_image[$product_style_image_row['product_style_image_id']][$product_style_image_row['color']] = $product_style_image_row['url'];
        }
        PtLib\log($product_style_image);
        foreach($rows as $row){
            //PtLib\log($row);
            $img = "";
            if(isset($product_style_image[$row['id']][$row['color']])){
                $img = $product_style_image[$row['id']][$row['color']];
            }
            if(empty($design_svg_local_pngs[$row['side']])){//设计图片不存在
                if($img){
                    $act_product_style_remote_path = $img;
                }else{//gen img
                    $base_path = self::formate_product_style_pic_upload_path($design_id, $row['id'], $row['color'], $row['side']);
                    $res = self::handle_product_style_image_color_png($row['id'],$row['imgurl'],$row['color'],$base_path);
                    $act_product_style_remote_path = $res['remote_png_path'];

                }
                $merge_design = 0;
            }else{
                $base_path = self::formate_product_style_pic_upload_path($design_id, $row['id'], $row['color'], $row['side']);
                if($img){//款式颜色图片存在
                    $location_png_path = self::dowload_product_style_img($img,$base_path);
                    PtLib\log($location_png_path);
                }else {
                    $res = self::handle_product_style_image_color_png($row['id'],$row['imgurl'],$row['color'],$base_path);
                    $location_png_path = $res['location_png_path'];
                }
                $region = $row['region'];
                $t = explode(",",$region);
                //pt_log($t);
                $x = $t['0']/2;
                $y = $t['1']/2;
                //PtLib\log($side);
                $act_product_style_local_path = Model_Design::merge_design_png($design_svg_local_pngs[$row['side']],$location_png_path,$x,$y,$base_path."_merge.png");
                //PtLib\log($base_path."_merge.png");
                $act_product_style_remote_path = self::upload_to_aliyun_oss($act_product_style_local_path,$base_path."_merge.png");
                //PtLib\log($act_product_style_remote_path);
                $merge_design = 1;
            }

            try{
                PtLib\db()->insert("activity_product_styles_image",array(
                    "act_id"=>$act_id,
                    "design_id"=>$design_id,
                    "product_style_id"=>$row['product_style_id'],
                    "product_id"=>$row['product_id'],
                    "side"=>$row['side'],
                    "color"=>$row['color'],
                    "url"=>"",
                    "remote_url"=>$act_product_style_remote_path,
                    "merge_design"=>$merge_design,
                    "create_time"=>date("Y-m-d H:i:s"),
                ));
            }catch (Exception $e){

            }
        }

        PtLib\db()->update("activities",array(
            "created"=>1
        ),array(
           "id"=>$act_id
        ));
    }

    static function upload_to_aliyun_oss($path,$remote_path){
        $oss = new Service\Aliyun\Oss\Api();
        $setting = PtApp::$setting;
        $res = $oss->oss_upload_file($setting['aliyun_oss']['bucket'],$path,$remote_path);
        return $res;
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
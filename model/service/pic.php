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
        $path_root = "/tmp";
        $env_root = $setting['aliyun_oss']['bucket_root'];
        $path_root = $path_root."/".$env_root;
        $rows = PtLib\db_select_rows("select * from task_img_service where status = 0");
        $sides = array(
            "front"=>"前胸","back"=>"后背","third"=>"左袖","fourth"=>"右袖"
        );
        foreach($rows as $row){
            $task_id= $row['id'];
            $row = json_decode($row['info'],true);
            //print_r($row);
            $act_id = $row['activityId'];
            $design = $row['design'];
            $design_id = $design['id'];
            if(!is_dir($path_root."/design/".$design_id)) @mkdir($path_root."/design/".$design_id,0755,true);
            $_design_svgs = PtLib\db_select_row("select * from design_svgs where design_id = ?",$design_id);

            $design_svgs = array();
            foreach($sides as $side=>$name){
                if($_design_svgs["svg_{$side}_image"]) $design_svgs[$side] = $_design_svgs["svg_{$side}_image"];
            }
            //print_r($svgs);exit;
            $productStyle = $row['productStyle'];
            foreach($productStyle as $ps){
                foreach($ps['image'] as $side => $image_url){
                    $styleId = $ps['styleId'];
                    $productId = $ps['productId'];
                    $color = $ps['color'];
                    $tpl_svg = Model_Design::get_tpl_svg($image_url,$color);
                    $path_tpl_root = $path_root."/design/".$design_id."/tpl_{$styleId}_{$productId}_".$side;
                    file_put_contents($path_tpl_root.".svg",$tpl_svg);
                    Model_Design::convert_svg_to_png($path_tpl_root.".svg",$path_tpl_root.".png",$color);
                    $merge_design = 0;
                    $merge_file_path = $path_tpl_root.".png";
                    if(!empty($design_svgs[$side])){
                        $design_svg_url = $design_svgs[$side];
                        $design_svg = file_get_contents($design_svg_url);
                        $design_svg = Model_Design::replace_svg($design_svg);
                        $path_design_root = $path_root."/design/".$design_id."/design_".$side;
                        if(!is_file($path_design_root.".svg")){
                            file_put_contents($path_design_root.".svg",$design_svg);
                            Model_Design::convert_svg_to_png($path_design_root.".svg",$path_design_root.".png");
                        }
                        $side_name = $sides[$side];
                        $res = PtLib\db_select_row("select region,name from product_style_image_regions where product_style_id = ? and name = ?",$ps['productId'],$side_name);
                        $region = $res['region'];
                        $t = explode(",",$region);
                        //pt_log($t);
                        $x = $t['0']/2;
                        $y = $t['1']/2;
                        Model_Design::merge_design_png($path_design_root.".png",$path_tpl_root.".png",$x,$y,$path_tpl_root."_merge.png");
                        $merge_file_path = $path_tpl_root."_merge.png";
                        $merge_design = 1;
                    }
                    //echo $merge_file_path.PHP_EOL;
                    if(is_file($merge_file_path)){
                        $remote_path = "{$env_root}/design/{$design_id}/{$styleId}_{$productId}_".$side.".png";
                        $remote_url = self::upload_to_aliyun_oss($merge_file_path,$remote_path);
                        try{
                            PtLib\db()->insert("activity_product_styles_image",array(
                                "act_id"=>$act_id,
                                "design_id"=>$design_id,
                                "product_style_id"=>$styleId,
                                "product_id"=>$productId,
                                "side"=>$side,
                                "color"=>$color,
                                "url"=>$remote_path,
                                "remote_url"=>$remote_url,
                                "merge_design"=>$merge_design,
                                "create_time"=>date("Y-m-d H:i:s"),
                            ));
                        }catch (Exception $e){

                        }

                    }
                }
            }

            PtLib\db()->update("task_img_service",array(
                "status"=>1
            ),array(
                "id"=>$task_id
            ));
        }
    }

    static function upload_to_aliyun_oss($path,$remote_path){
        $oss = new Service\Aliyun\Oss\Api();
        global $setting;
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
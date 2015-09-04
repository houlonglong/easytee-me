<?php
/**
 * 活动beta
 */
class Model_Activity_Beta extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    static function get_activity_info(){
        $id = $_REQUEST['id'];
        if (!$id) {
            die("缺少参数");
        }


        $arrayTemp = array();

        $Activitys = self::_db()->select_row("select a.*,t.created from activities as a left join task_act_pic_merge as t on t.act_id = a.id  where a.id = ?",$id);

        if (!$Activitys) {
            die("没有找到活动");
        }

        //根据活动查出发起人的详细信息
        $user = self::_db()->select_row("select * from users where id = ?",$Activitys['uid']);
        // 获取设计图片
        $canvas = self::_db()->select_rows("select * from canvas where design_id = ?",$Activitys['design_id']);

        if (!$canvas) {
            die("没有找到canvas");
        }

        $design = array();
        $regions = array();
        $regionLocation = array();
        foreach ($canvas as $can) {
            $design[$can['location']] = empty($can['imgurl']) ? '' : replace_cdn($can['imgurl']);
            $regions[] = $can['region_name'];
            $regionLocation[$can['region_name']] = $can['location'];
        }
        $arrayTemp["activity"] = array(
            "id" => $Activitys['id'],
            //发起人的详细信息
            "publisher" => array(
                "token" => $user['token'],
                "uid" => $user['app_uid'],
                'ID' => $user['identification'],
                'name'=>$user['nick_name'],
            ),
            'name' => $Activitys['name'],
            'salesTarget' => $Activitys['sales_target'],
            'salesCount' => $Activitys['sales_count'],
            'design_id' => $Activitys['design_id'],
            'endTime' => $Activitys['real_end_time'],
            'abstract' => $Activitys['abstract'],
            'description' => $Activitys['description'],
            'pass' => $Activitys['pass'],
            'can_custom' => $Activitys['can_custom'],
            'design' => $design,
        );
        if ($Activitys['can_custom'] == 1) {
            $arrayTemp["activity"]['custom'] = json_decode($Activitys['custom'], true);
        }

        //查看活动对应的商品
        $activityProductStyles = self::_db()->select_rows("select * from activity_product_styles where activity_id = ?",$Activitys['id']);
        $productIds = array();
        $datas = array();
        $createImg = TRUE;

        $cImages = array();
        if($Activitys['created']){
            $composeImages = self::_db()->select_rows('select * from activity_product_styles_image where act_id =?',$id);
            foreach($composeImages as $imgs){
                $cImages[$imgs['product_style_id']][$imgs['side']] = $imgs['remote_url'];
            }
        }
        foreach ($activityProductStyles as $activityProductStyle) {
            $appProductId = $activityProductStyle['app_product_id'];
            $app_product_style_id = $activityProductStyle['app_product_style_id'];
            $productId = $activityProductStyle['product_id'];
            $productStyleId = $activityProductStyle['product_style_id'];

            $product = self::_db()->select_row("select * from products where id = ?",$productId);
            if (!$product) {
                continue;
            }
            //判断平台上的商品款式是否上架
            $productStyle = self::_db()->select_row("select * from product_styles where id = ?",$productStyleId);
            if (!$productStyle) {
                continue;
            }
            $appProductStyle = self::_db()->select_row("select * from app_product_styles where id = ?",$app_product_style_id);
            if (!$appProductStyle) {
                continue;
            }
            $appProduct = self::_db()->select_row("select * from app_products where id = ?",$appProductId);
            if (!$appProduct) {
                continue;
            }
            $images = $hasDesign = array();
            if ($cImages) {
                $_images = $cImages[$productStyle['id']];
                $images = array(
                    "front"=>$_images['front'],
                    "back"=>$_images['back'],
                    "third"=>$_images['third'],
                    "fourth"=>$_images['fourth'],
                );

            } else {
                $createImg = FALSE;
                $productStyleImages = self::_db()->select_rows("select * from product_style_images where product_style_id = ?",$productStyle['id']);
                if (!$productStyleImages) {
                    continue;
                }
                foreach ($productStyleImages as $imageKey => $productStyleImage) {
                    $images[$productStyleImage['side']] = replace_cdn($productStyleImage['imgurl']);
                    $hasDesign[] = $productStyleImage['side'];
                }
            }
            $productSize = self::_db()->select_rows("select * from product_style_sizes where product_style_id = ?",$productStyleId);
            if (!$productSize) {
                continue;
            }
            if (!in_array($productId, $productIds)) {
                $datas[$productId] = array(
                    "id" => $appProduct['id'],
                    "name" => $appProduct['product_name'],
                    "description" => replace_cdn($product['long_description']), //没有字段
                    "icon" => $product['icon'],
                );
            }
            $sizes = array();
            foreach ($productSize as $sizek => $sizev) {
                $sizes[] = $sizev['size'];
            }
            $imageRegions = self::_db()->select_rows("select * from product_style_image_regions where product_style_id = ?",$productStyleId);
            $realRegions = array();
            foreach ($imageRegions as $imageRegion) {
                if (!in_array($imageRegion['name'], $regions)) {
                    continue;
                }
                $realRegions[$regionLocation[$imageRegion['name']]] = $imageRegion['region'];
            }
            $datas[$productId]['style'][] = array(
                'id' => $appProductStyle['id'],
                'name' => $productStyle['color_name'],
                'size' => $sizes,
                'price' => $activityProductStyle['sell_price'],
                'color_name' => $productStyle['color_name'],
                'colors' => json_decode($productStyle['colors'], true),
                'image' => $images,
                'has_design' => $hasDesign,
                'regions' => $realRegions,
            );
            $productIds[] = $productId;
        }
        $arrayTemp["activity"]['create_image'] = $createImg;
        $arrayTemp['products'] = array(
            "defaultProductStyleId" => $Activitys['default_product_style_id'], //默认的商品id
            "prductList" => $datas,
        );

        $activity = $arrayTemp;
        $svgs = array();
        if(!$activity['activity']['create_image']){
            $design_svgs = self::_db()->select_row("select svg_front_image,svg_back_image,svg_third_image,svg_fourth_image from design_svgs where design_id = ?",$activity['activity']['design_id']);
            $_sides = array(
                "front","back","third","fourth"
            );
            foreach($_sides as $_side){
                if($design_svgs["svg_{$_side}_image"]) $svgs[$_side] = file_get_contents($design_svgs["svg_{$_side}_image"]);
            }
        }
        $easyteeAdmin = 0;
        $activity['svgs'] = $svgs;
        $activity['user'] = $user;
        $activity['easyteeAdmin'] = $easyteeAdmin;

        //当前活动没有通过，当前用户不是admin，当前活动不是该用户发起的
        //if ($activity['activity']['pass'] == 3 && !$easyteeAdmin && $this->userId != $activity['activity']['publisher']['uid']) {

        //}
        //print_r($activity);exit;
        return $activity;
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
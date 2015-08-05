<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class InitController extends AppController {

    var $uses = array('FontCategory', 'ColorCategory', 'ColorCategoryMap', 'Color', 'Product', 'Manufacturer',
        'ProductStyle', 'ProductStyleSize', 'ProductStyleImage', 'ProductStyleImageRegion', 'AppProduct', 'FontCategoryMap', 'Font', 'ProductCategory',
        'ProductCategoryMap', 'AppProductCategory', 'AppProductCategoryMap', 'AppProductStyle', 'User',);
    var $name = "InitController";

    function beforeFilter() {
        parent::beforeFilter();
    }

    /**
     * 获取token
     * @param $app_key
     * @param $app_secret
     * echo token
     */
    public function getToken($app_key, $app_secret) {

        //cache::clear();
        $this->loadModel('Application');
        if (!$app_key) {
            $this->common->errorList(10003);
        }
        if (!$app_secret) {
            $this->common->errorList(10004);
        }
        $application = $this->Application->getApplicationByAppKeyAndAppSecret($app_key, $app_secret);

        if (!$application) {
            $this->common->errorList(10002);
        }
        $appKeyCache = cache::read("Application_" . $application["Application"]["id"]);


        if (!$appKeyCache) {
            $rand_key = rand(100000, 999999);
            $appKey = md5($application['Application']['app_key'] . $application['Application']['app_secret'] . $rand_key);
            cache::write("Application_" . $application["Application"]["id"], $appKey);
            cache::write("Application_token" . $appKey, $application["Application"]);
        } else {
            $appKey = $appKeyCache;
        }

        echo $appKey;
        exit;
    }

    /**
     * 获取第三方用户的token
     * echo userToken
     */
    public function getUserToken() {
        $this->loadModel('User');
        $this->loadModel('Application');
        if (!isset($_REQUEST['appKey']) || empty($_REQUEST['appKey'])) {
            $this->common->errorList(10003);
        }
        if (!isset($_REQUEST['uid']) || empty($_REQUEST['uid'])) {
            $this->common->errorList(11000);
        }
        $app_key = $_REQUEST['appKey'];
        $app_uid = $_REQUEST['uid'];
        $mobile = @$_REQUEST['mobile'];
        $nickname = @$_REQUEST['nickname'];
        $application = $this->Application->getApplicationByAppKey($app_key);
        if ($application) {
            $app_id = $application['Application']['id'];
            $user = $this->User->getUserByUserAppIdAndAppUid($app_id, $app_uid);
            if (!$user) {
                $this->User->useDbConfig = 'write';
                $userToken = Security::hash($app_id . $app_uid, 'sha1', true);
                $this->User->save(array(
                    'app_uid' => $app_uid,
                    'mobile' => $mobile,
                    'nick_name' => $nickname,
                    'app_id' => $app_id,
                    'create_time' => date('Y-m-d H:i:s'),
                    'token' => $userToken,
                ));
            } else {
                $userToken = $user["User"]['token'];
            }
            $result_cache_key = "ApplicationUser_token" . $app_id . "-" . $app_uid;
            cache::write($result_cache_key, array(
                'token' => $userToken,
                'appid' => $app_id,
                'expire' => time() + 3600
            ));
            echo $userToken;
            exit;
        } else {
            $this->common->errorList(10002);
        }
    }

    /**
     * 客户端访问登记,加载编辑器时，告知服务器
     * @param string $appKey
     */
    public function etClient() {
        $this->common->response('true', 200);
    }

    /**
     * 编辑器初始化数据
     * @param $appKey
     * @param $publishId
     * @param $productId
     * @param int $other
     * @param string $embroideryMode 是否需要支持刺绣功能（暂未支持，预留）
     */
    public function getConfig() {

        if (!isset($_REQUEST["productId"]) || empty($_REQUEST["productId"])) {
            $this->common->errorList(11006);
        }
        $productId = $_REQUEST["productId"];
        // $embroideryMode = @$_REQUEST['embroideryMode'];
        $defaultProductID = $productId;
        //Star 字体分类列表
        $fonts = $this->FontCategory->getFontCategoryByAppId($this->_app->id);
        if (!$fonts) {
            $this->common->errorList(20002);
        }
        $fontList = array(
            'name' => 'FontList',
            'attribute' => null,
        );
        foreach ($fonts as $key => $value) {
            $value = $value['FontCategory'];
            $fontList['item'][] = array(
                'name' => 'font_styles',
                'attribute' => array(
                    'font_style_id' => $value['id'],
                    'style' => $value['name'],
                    'IsEmbroidery' => $value['is_embroidery'],
                    'IsZhCn' => $value['is_zhcn'],
                    'FontCount' => $value['font_count']),
                'item' => null,
            );
        }
        //END
        $ExcludedFontIDs = array(
            'name' => 'ExcludedFontIDs',
            'attribute' => NULL,
            'item' => NULL,
        );
        //Star 颜色列表
        $colors = db_select_rows('SELECT
                        Color.*,ColorCategory.id AS category_id ,ColorCategory.`name` AS category_name
                        FROM
                                colors AS Color
                        INNER JOIN color_category_maps AS ColorCategoryMaps ON ColorCategoryMaps.colors_id = Color.id
                        INNER JOIN color_categories AS ColorCategory ON ColorCategory.id = ColorCategoryMaps.colors_category_id
                        WHERE
                        Color.app_id in (' . $this->_app->id . ',0)');
        if (!$colors) {
            $this->common->errorList(30000);
        }
        $InkColorList = array(
            'name' => 'InkColorList',
            'attribute' => null,
        );

        $printColor = array();
        foreach ($colors as $color) {
            if (!isset($printColor[$color['category_id']])) {
                $printColor[$color['category_id']] = array(
                    'name' => 'ink_color_maps',
                    'attribute' => array(
                        'ink_color_map_id' => $color['category_id'],
                        'name' => $color['category_name'],
                    ),
                );
            }
            $printColor[$color['category_id']]['item'][] = array(
                'name' => 'ink_colors',
                'attribute' => array(
                    'ink_color_id' => $color['id'],
                    'name' => $color['name'],
                    'html_color' => $color['html_color'],
                ),
                'item' => array(array(
                        'name' => 'ink_color_map_colors',
                        'attribute' => array(
                            'name_color' => $color['name_color'],
                            'number_color' => $color['number_color'],
                        ),
                    )),
            );
        }
        foreach ($printColor as $pColor) {
            $InkColorList['item'][] = $pColor;
        }
//        print_r($InkColorList);exit;
        //END
        $ProductResult = $this->getProductInfo($this->_app->id, $defaultProductID);
        $appProduct = $this->AppProduct->getAppProductById($this->_app->id, $defaultProductID);
        if (!$appProduct) {
            $this->common->errorList(11012);
        }
        $product = $this->Product->getProductById($appProduct['AppProduct']['product_id']);
        if (!$product) {
            $this->common->errorList(11012);
        }
        $ProductColorResult = array(
            'name' => 'ProductColorResult',
            'attribute' => null,
            'item' => array(
                'name' => 'products',
                'attribute' => array(
                    'product_id' => $defaultProductID,
                    'sku' => $product['Product']['sku'],
                    'name' => $product['Product']['name'],
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'can_handle_sleeves' => 0,
                ),
                'item' => $ProductResult,
        ));
        $UploadImageTerms = array(
            'name' => 'UploadImageTerms',
            'value' => '<span style="font-weight: bold;">请仔细阅读</span><div>您提交的任何设计必须是您设计或者拥有合法使用权。你不得使用他人拥有的内容，除非你得到他们的许可。如果有人因为你的设计向我们索赔，您同意支付我们受到损失，包括律师费等任何损失。</div>',
        );
        $productArray = array(
            'name' => 'InitialLoad',
            'attribute' => null,
            'item' => array(
                $fontList,
                $ExcludedFontIDs,
                $InkColorList,
                $ProductResult,
                $ProductColorResult,
                $UploadImageTerms
            )
        );
        $this->common->response($productArray);
    }

    function initDesign() {
        $this->loadModel('Design');
        $this->loadModel('Activity');
        $this->loadModel('Canvas');
        $this->loadModel('CanvasObject');
        $info = array(
            'app_id' => $this->_app->id,
            'uid' => $this->_app->user->id,
        );
        $design = $this->Design->saveData($info);
        $info['design_id'] = $design['id'];
        $info['sales_target'] = 50;
        $info['status'] = 'create';
        $activity = $this->Activity->saveData($info);
        // 保存canvas
        $canvas = array(
            'location' => 'front',
            'width' => '436',
            'height' => '87',
            'bgcolor' => '7B0B07',
            'colors' => 1,
            'region_name' => 1,
            'app_id' => $this->_app->id,
            'uid' => $this->_app->user->id,
            'design_id' => $design['id'],
        );
        $canvasId = $this->Canvas->saveData($canvas);
        // 保存Canvas object
        $canvasObject = array(
            'location' => 'FRONT',
            'canvas_id' => $canvasId,
            'x' => 43,
            'y' => 255,
            'z' => 0,
            'width' => 348,
            'height' => 69,
            'colors' => '{"fill_color":"FFFFFF","stroke_color":"FFFFFF"}',
            'shape' => 'arcup',
            'disable' => '{"disable_text_your_text_word":0,"disable_text_your_text_color":0,"disable_text_font_category":0,"disable_text_font_name":0,"disable_text_font_outline":0,"disable_size_width":0,"disable_size_height":0,"disable_size_rotation":0,"disable_size_spacing":0,"disable_size_curve":0,"disable_shape_select_shape":0,"disable_position_align":0,"disable_position_flip":0,"disable_position_nudge":0,"disable_layer_forwardback":0}',
            'type' => 'text',
            'app_id' => $this->_app->id,
            'private_fields' => '{"value":"\u8bf7\u8f93\u5165\u6587\u5b57","fill_color":"FFFFFF","stroke_color":"FFFFFF","font_id":"136"}',
        );
        $canvasObject = $this->CanvasObject->saveData($canvasObject);
        $this->common->response(array('activityId' => $activity['id'], 'designId' => $design['id']));
    }

    /**
     * 获取产品的详细信息
     * @param type $appid
     * @param type $pid
     * @param type $styleID
     * @return type
     */
    private function getProductInfo($appid, $pid, $styleID = '') {
        $datas = db_select_row("SELECT
                        AppProduct.product_name,
                        Product.sku,
                        Product.long_description,
                        Product.manufacturer_sku,
                        Manufacturer.Abbreviation,
                        ManufactureBand.brand_image
                        
                FROM
                        app_products AS AppProduct
                INNER JOIN products AS Product ON Product.id = AppProduct.product_id
                INNER JOIN manufacturers AS Manufacturer ON Manufacturer.id = Product.manufacturer_id
                INNER JOIN manufacturer_brands AS ManufactureBand ON ManufactureBand.manufacturer_id = Manufacturer.id
                WHERE
                        AppProduct.id = " . $pid . "
                AND AppProduct.`enable` = 'Y'
                AND Product.`enable` = 'Y'
                AND AppProduct.app_id = {$appid};");
        if (!$datas) {
            $this->common->errorList(11012);
        }
        if (!$styleID) {
            $appProductStyle = db_select_rows("SELECT
                                AppProductStyle.id app_product_style_id,
                                AppProductStyle.product_style_id product_style_id,
                                AppProductStyle.is_default,
                                AppProductStyle.selling_price,
                                ProductStyle.color_name,
                                ProductStyle.colors
                               FROM
                                        app_product_styles AS AppProductStyle
                                INNER JOIN product_styles AS ProductStyle ON ProductStyle.id = AppProductStyle.product_style_id
                                WHERE
                                        AppProductStyle.app_product_id = " . $pid . "
                                AND AppProductStyle.`enable` = 'Y'
                                AND AppProductStyle.app_id = {$appid};");
        } else {
            $appProductStyle = db_select_rows("SELECT
                                AppProductStyle.id app_product_style_id,
                                AppProductStyle.product_style_id product_style_id,
                                AppProductStyle.is_default,
                                AppProductStyle.selling_price,
                                ProductStyle.color_name,
                                ProductStyle.colors
                               FROM 
                                        app_product_styles AS AppProductStyle
                                INNER JOIN product_styles AS ProductStyle ON ProductStyle.id = AppProductStyle.product_style_id
                                WHERE
                                        AppProductStyle.id in(" . implode(',', $styleID) . "
                                AND AppProductStyle.`enable` = 'Y'
                                AND AppProductStyle.app_id = {$appid};");
        }
        $productStyles = array();
        $ColorResult = '';
        if (!$appProductStyle) {
            $this->common->errorList(11013);
        }
        foreach ($appProductStyle as $key => $value) {
            $temp = json_decode($value['colors'], true);
            $temp = $this->common->aasort($temp, 'accounting', 'asc', true);
            $html_color = $temp[0]['name'];
            $ProductStyleSize = $this->ProductStyleSize->getProductStyleSizeByPsids($appid, $value['product_style_id']);
            $sizes = array();
            $sizesids = array();
            $upcharges = array();
            foreach ($ProductStyleSize as $a => $b) {
                $b = $b['ProductStyleSize'];
                $sizes[] = $b['size'];
                $sizesids[] = $b['id'];
                $upcharges[] = $b['increase']; //各个尺码是否需要加减价
            }
            $sizes = implode(',', $sizes);
            $sizesids = implode(',', $sizesids);
            $upcharges = implode(',', $upcharges);

            $image_width = '500';
            $image_height = '500';

            $produtRegions = array();
            $images = db_select_rows("SELECT
                                image.id,
                                image.side,
                                image.thumburl,
                                image.name,
                                image.sequence,
                                image.imgurl,
                                region.id AS region_id,
                                region.name AS region_name,
                                region.region AS region_region,
                                region.render_width_inches,
                                region.sequence AS region_sequence,
                                region.is_default
                        FROM
                                product_style_images AS image
                        INNER JOIN product_style_image_regions AS region ON region.product_style_image_id = image.id
                        WHERE image.app_id = {$appid} AND image.product_style_id = " . $value['product_style_id']);
            if ($images) {
                foreach ($images as $c => $d) {
                    if ($d['side'] == 'front') {
                        $thumburl_front = $d['thumburl'];
                        $thumburl_front_cached = $d['thumburl'];
                    }
                    $produtRegions[] = array(
                        'name' => 'product_regions',
                        'attribute' => array(
                            'product_region_id' => $d['region_id'],
                            'side_name' => $d['name'],
                            'side' => $d['side'],
                            'is_default' => $d['is_default'],
                            'name' => $d['region_name'],
                            'region' => $d['region_region'],
                            'render_width_inches' => $d['render_width_inches'],
                            'side_order' => $d['sequence'],
                            'region_order' => $d['region_sequence'],
                            'imgurl' => $d['imgurl'],
                            'thumburl' => $d['thumburl'],
                        ),
                        'item' => array(
                            'name' => 'print_mask',
//                            'attribute' => array(
//                                'name' => '',
//                                'value' => '',
//                                'art_path' => '',
//                            ),
                        ),
                    );
                }
                $ColorResult[] = array(
                    'name' => 'product_styles',
                    'attribute' => array(
                        'product_style_id' => $value['product_style_id'],
                        'color' => $value['color_name'],
                        'html_color' => $html_color,
                        'thumburl_front' => $thumburl_front,
                        'thumburl_front_cached' => $thumburl_front_cached,
                        "can_print" => "1",
                        'can_digital_print' => 1,
                        "can_screen_print" => 1,
                        'can_embroider' => 0,
                        'sizes' => $sizes,
                        'sizeids' => $sizesids,
                        'image_width_front' => $image_width,
                        'image_height_front' => $image_height,
                        'image_width_back' => $image_width,
                        'image_height_back' => $image_height
                    ),
                );
            }
            $productStyles[] = array(
                'name' => 'product_styles',
                'attribute' => array(
                    'product_style_id' => $value['product_style_id'],
                    'is_default' => $value['is_default'],
                    'color' => $value['color_name'],
                    'html_color' => $html_color,
                    'customizable' => 1,
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'unit_price' => $value['selling_price'],
                    'canvas_price' => '6.00',
                    'name_price' => '4.00',
                    'number_price' => '4.00',
                    'sizes' => $sizes,
                    'sizeids' => $sizesids,
                    'upcharges' => $upcharges,
                    'image_width_front' => $image_width,
                    'image_height_front' => $image_height,
                    'image_width_back' => $image_width,
                    'image_height_back' => $image_height,
                ),
                'item' => $produtRegions
            );
        }
        $mfr_image = json_decode($datas['brand_image']);
        $productResult = array(
            'name' => 'products',
            'attribute' => array(
                'product_id' => $pid,
                'manufacturer' => $datas['Abbreviation'],
                'mfr_image_wide' => $mfr_image->wide,
                'mfr_image_square' => $mfr_image->square,
                'mfr_image_tiny' => $mfr_image->tiny,
                'manufacturer_sku' => $datas['manufacturer_sku'],
                'sku' => $datas['sku'],
                'name' => $datas['product_name'],
                'customizable' => 1,
                'can_print' => 1,
                'can_digital_print' => 1,
                'can_screen_print' => 1,
                'can_embroider' => 0,
                'can_handle_sleeves' => 0,
                'enable_team_name_numbers' => 1,
                'has_back' => 1,
                'has_third_side' => 0,
                'has_fourth_side' => 0,
                'third_side_name' => "左袖",
                'fourth_side_name' => '右袖',
                'is_static' => 0,
                'require_design' => 0,
                'long_description' => str_replace('"', "'", $datas['long_description'])
            ),
            'item' => $productStyles,
        );
        $result = array(
            'name' => 'ProductResult',
            'attribute' => null,
            'item' => array($productResult)
        );
        return $result;
    }

    function cacheClear() {
        cache::clear();
    }

    /**
     * 该方法不是API接口，提供了讲SVG字体文件转换为JS字体文件的方法
     * @param string $xml
     */
    function svgFontToJson($xml = '') {
        ini_set("max_execution_time", "180000");
        $this->loadModel('Font');
//        $nameCn = $_POST['name_cn'];
//        $nameEn = $_POST['name'];
        $file = $_FILES['personalImage'];

        require_once APP . '/libs/Cufon.php';
        $options = array
            (
            'family' => '',
            'terms' => TRUE,
            'permission' => TRUE,
            'glyphs' => array('0x0-0xFFFF', '0x20-0x7E'),
            'ligatures' => null,
            'customGlyphs' => '',
            'useGlyphCSSRange' => '',
            'domains' => array(),
            'callback' => 'Raphael.registerFont',
            'emSize' => 360,
            'disableScaling' => '',
            'simplify' => TRUE,
            'simplifyDelta' => 2,
            'kerning' => TRUE,
        );
        $file = $file['tmp_name'];

        $fonts = array();
        foreach (new SVGFontContainer($file, $options) as $font) {
//            $fonts[$font->getFaceBasedId()] = $font->toJavaScript();
            $fonts[$font->getFaceBasedId()] = sprintf("%s%s(%s);\n", '', isset($options['callback']) ? $options['callback'] : '', $font->toJavaScript()
            );
        }
        $nameEn = 'MicrosoftYaHei';
        foreach ($fonts as $id => $json) {
//            echo $json;
//            file_put_contents('C:\Regular.js', $json);
            $json = str_replace('Raphael.registerFont(', '', $json);
            $json = str_replace('}}});', '}}}', $json);
            file_put_contents('cloud_font\\' . $nameEn . '.js', $json);
//            $this->Font->add(
//                    array(
//                        'name' => $nameEn,
//                        'jspath' => 'cloud_font/' . $nameEn . '.js',
//                        'app_id' => $this->_app->id,
//                        'name_cn' => $nameCn,
//            ));
        }
        exit;
    }

    function test() {
        ini_set("max_execution_time", "180000");
        $json = file_get_contents('cloud_font/MicrosoftJhengHei.js');
        $a = json_decode($json, TRUE);
//        var_dump($a);
//        exit;
        $b['w'] = $a['w'];
        $b['face'] = $a['face'];
        $data = json_encode($b);

//        echo $data;
//        exit;
        $this->loadModel('FontGlyphs');
        $i = 1;
        $j = 1;
        $data = array();
        foreach ($a['glyphs'] as $key => $value) {
            $info = array('str' => $key, 'w' => @$value['w'], 'd' => @$value['d'], 'font_id' => '147');
//            if ($key === '飞') {
//                var_dump($info,$i,$j);
//                exit;
//            }
            if ($i < 100) {
                $data[] = $info;
            } else {
                $i = 0;
                $data[] = $info;
                $this->FontGlyphs->add($data);
                $data = array();
            }
            $i++;
//            $j++;
        }
        if ($i != 0) {
            $this->FontGlyphs->add($data);
        }
        exit;
//        }
    }

}

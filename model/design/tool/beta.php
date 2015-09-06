<?php
/**
 * 设计工具
 */
class Model_Design_Tool_Beta extends BaseModel {
    static $table = "";
    function __construct(){

        //parent::__construct();
    }
    static function get_uid(){
        if(Model_User_Auth::is_logined()){
            $uid = Model_User_Abstract::get_uid();
            $user = self::_db()->select_row("select * from users where id = ?",$uid);
            $uid = $user['id'];
        }else{
            $uid = 0;
        }
        return $uid;
    }
    /**
     * 初始化设计工具
     * @return array
     */
    static function init(){
        #初始化设计

        $uid  = self::get_uid();
        $info = array(
            'app_id' => 1,
            'uid' => $uid,
        );

        $design_id = self::_db()->insert("designs",$info);
        #初始化活动
        $info['design_id'] = $design_id;
        $info['sales_target'] = 50;
        $info['status'] = 'create';
        $activity_id = self::_db()->insert("activities",$info);

        #保存canvas
        $canvas = array(
            'location' => 'front',
            'width' => '436',
            'height' => '87',
            'bgcolor' => '7B0B07',
            'colors' => 1,
            'region_name' => 1,
            'app_id' => 1,
            'uid' => $uid,
            'design_id' => $design_id,
        );
        $canvasId = self::_db()->insert("canvas",$canvas);

        #保存Canvas object
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
            'app_id' => 1,
            'private_fields' => '{"value":"\u8bf7\u8f93\u5165\u6587\u5b57","fill_color":"FFFFFF","stroke_color":"FFFFFF","font_id":"136"}',
        );
        self::_db()->insert("canvas_objects",$canvasObject);
        return array(
            "design_id"   => $design_id,
            "activity_id" => $activity_id,
        );
    }

    function action_init(){
        if (!isset($_REQUEST["productId"]) || empty($_REQUEST["productId"])) {
            throw new Exception("productId不能为空");
        }
        $productId = $_REQUEST["productId"];
        // $embroideryMode = @$_REQUEST['embroideryMode'];
        $defaultProductID = $productId;
        //Star 字体分类列表
        $fonts = self::_db("font")->select_rows("select * from font_categories");

        $fontList = array(
            'name' => 'FontList',
            'attribute' => null,
        );
        foreach ($fonts as $key => $value) {
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
        $colors = self::_db()->select_rows('SELECT
                        Color.*,ColorCategory.id AS category_id ,ColorCategory.`name` AS category_name
                        FROM
                                colors AS Color
                        INNER JOIN color_category_maps AS ColorCategoryMaps ON ColorCategoryMaps.colors_id = Color.id
                        INNER JOIN color_categories AS ColorCategory ON ColorCategory.id = ColorCategoryMaps.colors_category_id
                        WHERE
                        Color.app_id in (1,0)');



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
        //return $InkColorList;
        //END

        $ProductResult = self::getProductInfo($defaultProductID);

        $product = self::_db()->select_row("select * from products where id = ?",$defaultProductID);


        $ProductColorResult = array(
            'name' => 'ProductColorResult',
            'attribute' => null,
            'item' => array(
                'name' => 'products',
                'attribute' => array(
                    'product_id' => $defaultProductID,
                    'sku' => $product['sku'],
                    'name' => $product['name'],
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
        xml_response($productArray);
    }
    static function getProductInfo($pid, $styleID = ''){
        $appProduct = self::_db()->select_row("select * from app_products where product_id = ?",$pid);
        $product = self::_db()->select_row("select * from products where id = ?",$appProduct['product_id']);
        //var_dump($appProduct);exit;
        //Star 默认产品数据
        $Manufacturer = self::_db()->select_row("select * from manufacturers where id = ?",$product['manufacturer_id']);
        $ManufacturerBrand = self::_db()->select_row("select * from manufacturer_brands where manufacturer_id = ?",$product['manufacturer_id']);
        if(empty($styleID)){
            $appProductStyle = self::_db()->select_rows("select * from app_product_styles where app_product_id = ? and enable = 'Y' order by sequence,id",$pid);
        }else{
            if(!is_array($styleID)) $styleID = array($styleID);
            $appProductStyle = self::_db()->select_rows("select * from app_product_styles where id in(".implode(",",$styleID).") and enable = 'Y' order by sequence,id");

        }
        $productStyles = array();
        $ColorResult = '';
        foreach ($appProductStyle as $key => $value) {
            $productStyle = self::_db()->select_row("select * from product_styles where id = ?",$value['product_style_id']);

            $html_color = $productStyle['color'];

            $ProductStyleSize = self::_db()->select_rows("select * from product_style_sizes where product_style_id = ? and enable = 'y'",$productStyle['id']);

            $sizes = array();
            $sizesids = array();
            $upcharges = array();
            foreach ($ProductStyleSize as $a => $b) {
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
            //
            $images = self::_db()->select_rows("select * from product_style_images where product_style_id = ? order by sequence",$value['product_style_id']);
            if ($images) {
                foreach ($images as $c => $d) {
                    $regions = self::_db()->select_rows("select * from product_style_image_regions where product_style_image_id = ? order by sequence",$d['id']);
                    if ($d['side'] == 'front') {
                        $thumburl_front = replace_cdn($d['thumburl']);
                        $thumburl_front_cached = replace_cdn($d['thumburl']);
                    }
                    foreach ($regions as $e => $f) {
                        $produtRegions[] = array(
                            'name' => 'product_regions',
                            'attribute' => array(
                                'product_region_id' => $f['id'],
                                'side_name' => $d['name'],
                                'side' => $d['side'],
                                'is_default' => $f['is_default'],
                                'name' => $f['name'],
                                'region' => $f['region'],
                                'render_width_inches' => $f['render_width_inches'],
                                'side_order' => $d['sequence'],
                                'region_order' => $f['sequence'],
                                'imgurl' => replace_cdn($d['imgurl']),
                                'thumburl' => replace_cdn($d['thumburl']),
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
                            'color' => $productStyle['color_name'],
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
            }
            $productStyles[] = array(
                'name' => 'product_styles',
                'attribute' => array(
                    'product_style_id' => $value['id'],
                    'is_default' => $value['is_default'],
                    'color' => $productStyle['color_name'],
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
        $mfr_image = json_decode(@$ManufacturerBrand['brand_image']);
        $productResult = array(
            'name' => 'products',
            'attribute' => array(
                'product_id' => $pid,
                'manufacturer' => @$Manufacturer['Abbreviation'],
                'mfr_image_wide' => $mfr_image->wide,
                'mfr_image_square' => $mfr_image->square,
                'mfr_image_tiny' => $mfr_image->tiny,
                'manufacturer_sku' => $product['manufacturer_sku'],
                'sku' => $product['sku'],
                'name' => $appProduct['product_name'],
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
                'long_description' => str_replace('"', "'", $product['long_description'])
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
    static function get_act_by_id($id){
        //$open_user = Model_Open_User::get_open_user_by_token($user_token);
        $act = self::_db()->select_row("select a.*,aps.app_product_id,aps.app_product_style_id from activities as a left join activity_product_styles as aps on aps.activity_id = a.id where a.id = ?",$id);
        return $act;
    }
    function action_product_get_cat_list(){
        $categoryList = self::_db()->select_rows(
            "select * from app_product_categories where enable = 'y'"
        );

        $productCate = array();
        foreach ($categoryList as $key => $val) {
            $productCate[] = array(
                'name' => 'vw_product_categories',
                'attribute' => array(
                    'product_category_id' => $val['id'],
                    'name' => $val['name'],
                    'path' => $val['path'],
                    'thumburl_front' => $val['thumb'],
                ),
            );
        }
        $result = array(
            'name' => 'ProductCategoryList',
            'item' => $productCate,
        );
        xml_response($result);
    }
    function action_address_get_list(){

    }
    function action_design_get(){
        $uid  = self::get_uid();

        $appId = 1;
        if (!isset($_REQUEST['designId'])) {
            throw new Exception("designId不能为空");
        }
        $designId = $_REQUEST['designId'];
        #获取Design
        $design = self::_db()->select_row("select * from designs where id = ?",$designId);
        if (!$design) {
            throw new Exception("design不存在");
        }

        if (!$uid) {
            // 有uid输出product style
            // 没有uid判断ispublic
//            if (!$design['is_public']) {
//                $this->common->errorList(50000);
//            }
        } else {
//            if ($design['uid'] != $uid) {
//                $this->common->errorList(50000);
//            }
        }

        $disable = json_decode($design['disable'], true);
        $printDesign = array(
            'name' => 'designs',
            'attribute' => array(
                'table_name' => 'design',
                'design_id' => $design['id'],
                'uri' => $design['id'],
                'name' => $design['name'],
                'colors' => $design['colors'],
                'max_colors_per_side' => $design['colors'],
                'can_customize' => $design['can_customize'],
                'notes' => $design['notes'],
                'can_screen_print' => $design['can_screen_print'],
                'is_embroidery' => $design['is_embroidery'],
                'designer_version' => $design['designer_version'],
                'disable_product_update_front' => $disable['disable_product_update_front'],
                'disable_product_update_color' => $disable['disable_product_update_color'],
                'disable_product_update_back' => $disable['disable_product_update_back'],
                'disable_canvas_add' => $disable['disable_canvas_add'],
            ),
        );
        if ($uid) {
            //$DesignProductMap = $this->DesignProductMap->getMapFromDesignProductMapByDesignId($appId, $design['id']);
            $DesignProductMap = self::_db()->select_rows("select * from design_product_maps where design_id = ? ",$designId);
            $designProduct = array();
            foreach ($DesignProductMap as $map) {
                $designProduct[] = array(
                    'name' => 'product_styles',
                    'attribute' => array(
                        'product_id' => $map['product_id'],
                        'product_style_id' => $map['product_style_id'],
                    ),
                );
            }
            $printDesign['item'] = $designProduct;
        } else {
            $printDesign['item'] = array(
                'name' => 'product_styles',
            );
        }
        //$canvases = $this->Canvas->getCanvasByDesignId($appId, $design['id']);
        $canvases = self::_db()->select_rows("select * from canvas where design_id = ?",$designId);
        $printCanvas = array();
        $cids = array();
        foreach ($canvases as $canvas) {
            $cids[] = $canvas['id'];
            $canvaseArr = array();
            $canvaseArr['table_name'] = 'canvas';
            $canvaseArr['canvas_id'] = $canvas['id'];
            $canvaseArr['is_distressed'] = $canvas['is_distressed'];
            $canvaseArr['location'] = $canvas['location'];
            $canvaseArr['width'] = $canvas['width'];
            $canvaseArr['height'] = $canvas['height'];
            $canvaseArr['bgcolor'] = $canvas['bgcolor'];
            $canvaseArr['shadow'] = $canvas['shadow'];
            $canvaseArr['colors'] = $canvas['colors'];
            $canvaseArr['disable_image_add'] = $canvas['disable_image_add'];
            $canvaseArr['disable_text_add'] = $canvas['disable_text_add'];
            $canvaseArr['disable_image_delete'] = $canvas['disable_image_delete'];
            $canvaseArr['disable_text_delete'] = $canvas['disable_text_delete'];
            $canvaseArr['region_name'] = $canvas['region_name'];
            $printCanvas[] = array(
                'name' => 'canvases',
                'attribute' => $canvaseArr,
            );
        }

        $canvasObject = self::_db()->select_rows("select * from canvas_objects where canvas_id  in (".implode(",",$cids).")");
        $printCanvasText = array();
        $printCanvasArt = array();
        $colorCounts = array();
        foreach ($canvasObject as $object) {
            $objectArr = array();
            $disable = json_decode($object['disable'], TRUE);
            $objectArr['attribute'] = array(
                'location' => $object['location'],
                'canvas_id' => $object['canvas_id'],
                'x' => $object['x'],
                'y' => $object['y'],
                'z' => $object['z'],
                'width' => $object['width'],
                'height' => $object['height'],
                'fliph' => $object['fliph'],
                'flipv' => $object['flipv'],
                'rotate' => $object['rotate'],
                'ispublic' => $object['is_public'],
                'disable_size_height' => $disable['disable_size_height'],
                'disable_size_width' => $disable['disable_size_width'],
                'disable_size_rotation' => $disable['disable_size_rotation'],
                'disable_position_align' => $disable['disable_position_align'],
                'disable_position_flip' => $disable['disable_position_flip'],
                'disable_position_nudge' => $disable['disable_position_nudge'],
            );
            if ($object['type'] == 'text') {
                $objectArr['name'] = 'canvas_text';
                $objectArr['attribute']['table_name'] = "canvas_text";
                $objectArr['attribute']['canvas_text_id'] = $object['id'];
                $objectArr['attribute']['disable_size_spacing'] = $disable['disable_size_spacing'];
                $objectArr['attribute']['disable_size_curve'] = $disable['disable_size_curve'];
                $objectArr['attribute']['disable_shape_select_shape'] = $disable['disable_shape_select_shape'];
                $objectArr['attribute']['stroke_width'] = $object['stroke_width'];
                $objectArr['attribute']['shape'] = $object['shape'];
                $objectArr['attribute']['sweep'] = $object['sweep'];

                // 没有字段的
                $objectArr['attribute']['wrap_mode'] = $object['wrap_mode'];
                $objectArr['attribute']['wrap_amount'] = $object['wrap_amount'];
                $objectArr['attribute']['kerning'] = $object['kerning'];
                $objectArr['attribute']['disable_text_your_text_word'] = $disable['disable_text_your_text_word'];

                $objectArr['attribute']['disable_text_your_text_color'] = $disable['disable_text_your_text_color'];
                $objectArr['attribute']['disable_text_font_category'] = $disable['disable_text_font_category'];
                $objectArr['attribute']['disable_text_font_name'] = $disable['disable_text_font_name'];
                $objectArr['attribute']['disable_layer_forwardback'] = $disable['disable_layer_forwardback'];
                $objectArr['attribute']['disable_text_font_outline'] = $disable['disable_text_font_outline'];
                // 写死的
                $privateFields = json_decode($object['private_fields'], TRUE);
                if (!isset($privateFields['font_id']) || !$privateFields['font_id']) {
                    throw new Exception("error code : 19991");
                }
                $objectArr['attribute']['value'] = @$privateFields['value'];
                $objectArr['attribute']['envelope'] = $object['envelope'];
                $objectArr['attribute']['font_id'] = $privateFields['font_id'];
                $objectArr['attribute']['fill_color'] = @$privateFields['fill_color'];
                $objectArr['attribute']['stroke_color'] = @$privateFields['stroke_color'];
                $font =  self::_db("font")->select_row("select f.name,f.gifpath,map.font_category_id,cat.name as cat_name from fonts as f
                    left join font_category_maps as map on map.font_id = f.id
                    left join font_categories as cat on cat.id = map.font_category_id
                    where f.id = ? ",$privateFields['font_id']);
                $printFont = array();
                if ($font) {
                    $printFont = array(
                        'name' => 'fonts',
                        'attribute' => array(
                            'font' => $font['name'],
                            'font_style_id' => $font['font_category_id'],
                        ),
                        'item' => array(
                            array(
                                'name' => 'font_styles',
                                'arrtibute' => array(
                                    'font_style' => $font['cat_name'],
                                    'gifpath' => replace_cdn($font['gifpath']),
                                ),
                                'item' => array(
                                    array(
                                        'name' => 'canvas_text_embroidery'
                                    ),)
                            ),
                        ),
                    );
                }
                $objectArr['item'] = $printFont;
                $printCanvasText[] = $objectArr;
            }
            if ($object['type'] == 'art') {
                if (!isset($object['art_id']) || !$object['art_id']) {
                    throw new Exception("art_id 不能为空");
                }
                $privateFields = json_decode($object['private_fields'], true);
                $objectArr['name'] = 'canvas_art';
                $objectArr['attribute']['canvas_art_id'] = $object['art_id'];
                $objectArr['attribute']['table_name'] = "canvas_art";
                $objectArr['attribute']['original_path'] = $object['original_path'];
                $objectArr['attribute']['disable_layer_frontback'] = $disable['disable_layer_frontback'];
                $objectArr['attribute']['canvas_art_rendered'] = @$privateFields['canvas_art_rendered'];
                $objectArr['attribute']['desaturate'] = @$privateFields['desaturate'];
                $objectArr['attribute']['art_id'] = $object['art_id'];
                //$art = $this->Art->getArtByIds($appId, $object['art_id']);
                $art = self::_db()->select_row("select * from arts where id = ?",$object['art_id']);
                //var_dump($art);exit;
                $printArt = array();
                if ($art) {
                    $printArt = array(
                        'name' => 'art',
                        'attribute' => array(
                            'art_name' => $art['name'],
                            'art_type' => $art['type'],
                            'ispublic' => $art['is_public'],
                            'art_path' => replace_cdn($art['art_path']),
                            'original_art_path' => empty($art['original_art_path']) ? replace_cdn($art['art_path']) : replace_cdn($art['original_art_path']),
                        ),
                    );
                }
                $colors = json_decode($object['colors'], true);
                $printColors = array();
                if ($colors) {
                    foreach ($colors as $ckey => $color) {
                        if (!$color) {
                            continue;
                        }
                        $colorCounts[] = $color;
                        $objectArr['attribute'][$ckey] = $color;
                        $printColors[] = array(
                            'name' => 'art_colors',
                            'attribute' => array(
                                'color' => $color,
                            ),
                        );
                    }
                }
                $printArt['item'] = $printColors;
                $objectArr['item'] = $printArt;
                $printCanvasArt[] = $objectArr;
            }
        }
        $print = array(
            'name' => 'ThisDesign',
            'item' => array(
                $printDesign,
            ),
        );
        $print['item'] = array_merge($print['item'], $printCanvas, $printCanvasText, $printCanvasArt);
        xml_response($print);
    }
    function action_product_get_list(){
        if (!isset($_REQUEST["productCategoryId"]) || empty($_REQUEST["productCategoryId"])) {
            throw new Exception("productCategoryId不能为空");
        }
        $pcid = $_REQUEST["productCategoryId"];
        $appProduct = self::_db()->select_rows(
            "select
            ap.*,cat.name as cat_name,man.name as man_name,brand.name as brand_name,
            p.manufacturer_sku,p.sku
            from app_products as ap
            left join app_product_category_maps as map on map.app_product_id = ap.id
            left join app_product_categories as cat on cat.id = map.app_product_category_id
            left join products as p on p.id = ap.product_id
            left join manufacturers as man on man.id = p.manufacturer_id
            left join manufacturer_brands as brand on brand.id = p.manufacturer_brand_id
            where cat.id = ? and ap.enable = 'Y' and p.enable = 'Y'"
            ,$pcid);

        $CS = array();
        foreach ($appProduct as $a => $b) {
            $appProductStyle = self::_db()->select_row("select aps.*,ps.color,ps.color_name from app_product_styles as aps
                              left join product_styles as ps on ps.id = aps.product_style_id
                              where aps.enable = 'Y' and aps.is_default = 1 and aps.app_product_id = ? ",$b['id']);
            $image = self::_db()->select_row("select * from product_style_images where product_style_id = ? and side = 'front'",$appProductStyle['product_style_id']);

            $CS[] = array(
                'name' => 'CS',
                'attribute' => array(
                    'category' => $b['cat_name'],
                    'manufacturer' => $b['brand_name'],
                    'manufacturer_sku' => $b['manufacturer_sku'],
                    'product_id' => $b['id'],
                    'product_category_id' => $pcid,
                    'sku' => $b['sku'],
                    'is_static' => 0,
                    'name' => $b['product_name'],
                    'product_style_id' => $appProductStyle['id'],
                    'product_style_uri' => $appProductStyle['id'],
                    'is_default' => 0,
                    'color' => $appProductStyle['color_name'],
                    'html_color' => $appProductStyle['color'],
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'unit_price' => $appProductStyle['selling_price'],
                    'thumburl_front' => replace_cdn($image['imgurl']),
                    'thumburl_front_cached' => replace_cdn($image['thumburl']),
                ),
            );
        }
        $result = array(
            'name' => 'ProductList',
            'item' => $CS,
        );
        //return $result;
        xml_response($result);
    }
    function action_product_get(){
        if (!isset($_REQUEST['productId']) || empty($_REQUEST['productId'])) {
            throw new Exception("productId不能为空");
        }
        $pid = $_REQUEST["productId"];
        $psid = '';
        if (isset($_REQUEST['productStyleId'])) {
            $psid = $_REQUEST['productStyleId'];
        }

        $result = self::getProductInfo($pid, $psid);
        xml_response($result);
    }
    function action_font_get_list(){
        if (!isset($_REQUEST["fontCategorieId"]) && empty($_REQUEST["fontCategorieId"])) {
            throw new Exception("fontCategorieId不能为空");
        }
        $fcid = $_REQUEST["fontCategorieId"];

        $fonts = self::_db("font")->select_rows("select f.*,cat.is_embroidery,cat.font_count from fonts as f left join font_category_maps as map on map.font_id = f.id left join font_categories as cat on cat.id = map.font_category_id where cat.id = ? order by cat.sequence",$fcid);
        foreach ($fonts as $key => $font) {
            $FontList[] = array(
                'name' => 'fonts',
                'attribute' => array(
                    'font_id' => $font['id'],
                    'name' => $font['name'],
                    'swfpath' => $font['swfpath'],
                    'jspath' => $font['jspath'],
                    'gifpath' => replace_cdn($font['gifpath']),
                    'is_embroidery' => $font['is_embroidery'],
                    'FontCount' => $font['font_count'],
                ),
            );
        }
        $result = array(
            'name' => 'FontList',
            'item' => $FontList,
        );
        xml_response($result);
    }

    function action_font_get_js_font(){
        if (!isset($_REQUEST['fontid'])) {
            throw new Exception("fontid不能为空");
        }
        $fontid = $_REQUEST['fontid'];

        if (!isset($_REQUEST['text'])) {
            throw new Exception("text不能为空");
        }
        $text = $_REQUEST["text"];

        $font = self::_db("font")->select_row("select * from fonts where id = ?",$fontid);
        //$font = $this->Font->getFontById($this->_app->id, $fontid);
        if (!$font) {
            $font = self::_db("font")->select_row("select * from fonts where id = ?",136);
        }
        $arr = array();
        if ($text) {
            $text = urldecode($text);
            $text = preg_split('/(?<!^)(?!$)/u', $text);
            $text = array_unique($text);
            header('Content-Type:application/json;charset=utf-8');
            //$font = $this->Font->get($fontid);
            $config = json_decode($font['config'], true);
            $glyphps = array();
            $fontGlyphs = self::_db("font")->select_rows("select * from font_glyphs where font_id = ? and  str in('".implode("','",$text)."') ",$font['id']);
            //$fontGlyphs = $this->FontGlyphs->getByFontIdStr($fontid, $text);
            foreach ($fontGlyphs as $key => $value) {
                $glyphps[$value['str']] = json_decode($value['glyph']);
            }
            $config['glyphs'] = $glyphps;
            echo 'Raphael.registerFont(' . json_encode($config) . ');';
            exit;
        }
    }

    function action_activity_activity_info(){

        if (!isset($_REQUEST['activityId']) || !$_REQUEST['activityId']) {
                throw new Exception("activityId 不能为空");
        }
        $activityId = $_REQUEST['activityId'];
        $activity = self::get_act_by_id($activityId);
        //$activityId = $this->Activity->getActivityById($activityId);

        $datas['name'] = $activity['name'];
        $datas['description'] = $activity['description'];
        $datas['deadline'] = $activity['deadline'];
        $datas['deliveryType'] = $activity['delivery_type'];
        $datas['addressId'] = $activity['address_id'];
        $datas['target'] = $activity['sales_target'];
        $datas['notes'] = $activity['notes'];
        $datas['freePostage'] = $activity['free_postage'];

        $activityProductStyles =  self::_db()->select_rows("select * from activity_product_styles where activity_id = ?",$activityId);
        //return $activityProductStyles;
        //$activityProductStyles = $this->ActivityProductStyles->getActivityId($activityId);
        $products = array();
        if ($activityProductStyles) {

            $productStyleIds = array();
            $productIds = array();
            $appProductIds = array();
            $productStyleIds = array();
            $appProductStylesIds = array();
            $stylePrices = array();
            foreach ($activityProductStyles as $dataInfo) {
                $productIds[] = $dataInfo['product_id'];
                $productStyleIds[] = $dataInfo['product_style_id'];
                $appProductIds[] = $dataInfo['app_product_id'];
                $appProductStylesIds[] = $dataInfo['app_product_style_id'];
                $stylePrices[$dataInfo['app_product_id']] = $dataInfo['sell_price'];
            }
            // 取产品相关信息
            $productStyle = self::_db()->select_rows("select * from product_styles where enable = 'Y' and product_id in (".implode(",",$productIds).")");
            $appProduct = self::_db()->select_rows("select * from app_products where enable = 'Y' and id in (".implode(",",$appProductIds).")");
            $appProductStyle = self::_db()->select_rows("select * from app_product_styles where enable = 'Y' and app_product_id in (".implode(",",$appProductIds).")");

            $styles = array();
            foreach ($productStyle as $style) {
                $styles[$style['id']] = $style;
            }
            foreach ($appProduct as $appP) {
                $selectStyle = array();
                $unSelectStyle = array();
                foreach ($appProductStyle as $appStyle) {
                    if ($appStyle['app_product_id'] != $appP['id']) {
                        continue;
                    }
                    $productStyleImage = self::_db()->select_row("select * from product_style_images where product_style_id = ? and side = 'front'",$appStyle['product_style_id']);
                    $colors = json_decode($styles[$appStyle['product_style_id']]['colors'], TRUE);
                    $colorName = '';
                    if ($colors) {
                        $max = $colors[0]['accounting'];
                        $colorName = $colors[0]['name'];
                        foreach ($colors as $color) {
                            if ($color['accounting'] > $max) {
                                $max = $color['accounting'];
                                $colorName = $color['name'];
                            }
                        }
                    }
                    if (in_array($appStyle['id'], $appProductStylesIds)) {
                        $selectStyle[] = array(
                            'id' => $appStyle['id'],
                            'image' => replace_cdn($productStyleImage['imgurl']),
                            'color' => $styles[$appStyle['product_style_id']]['color_name'],
                            'html_color' => $colorName,
                            'unit_price' => $appStyle['selling_price'],
                        );
                    }
                    $unSelectStyle[] = array(
                        'id' => $appStyle['id'],
                        'image' => replace_cdn($productStyleImage['imgurl']),
                        'color' => $styles[$appStyle['product_style_id']]['color_name'],
                        'html_color' => $colorName,
                        'unit_price' => $appStyle['selling_price'],
                    );
                }
                $manufacture = self::_db()->select_row('SELECT m.name FROM manufacturer_brands As m INNER JOIN products AS p ON p.manufacturer_brand_id = m.id WHERE p.id = '.$appP['product_id']);
                $products[] = array(
                    'id' => $appP['id'],
                    'name' => $appP['product_name'],
                    'product_styles' => $unSelectStyle,
                    'product_selected_styles' => $selectStyle,
                    'price' => intval($stylePrices[$appP['id']]),
                    'manufacturer_name' => $manufacture['name'],
                );
            }
        }
        $datas['products'] = $products;
        echo json_encode($datas);exit;
    }
    function action_design_save(){
        $appId = 1;
        $uid  = self::get_uid();
        $xmlDesign = $_POST['xmlDesign'];
        $xmlDatas = simplexml_load_string($xmlDesign, 'SimpleXMLElement', LIBXML_NOCDATA);
        $attribute = $xmlDatas->designs->attributes();
        $appTemplate['is_embroidery'] = $attribute->is_embroidery . '';
        $appTemplate['name'] = $attribute->name . '';
        $appTemplate['designer_version'] = $attribute->designer_version . '';
        $appTemplate['notes'] = $attribute->notes . '';
        $appTemplate['admin'] = isset($attribute->admin) ? $attribute->admin : 'NONE' . '';
        $appTemplate['uid'] = $uid;
        $appTemplate['app_id'] = $appId;
        $appTemplate['id'] = $attribute->design_id . '';
        $appTemplate['default_product_style_id'] = $attribute->product_style_id . '';
        $appT = self::_db()->select_row("select * from designs where id = ?",$attribute->design_id);

        if (!$appT) {
            unset($appTemplate['id']);
        }
        $appProductStyle = self::_db()->select_row("select * from app_product_styles where id = ?",$attribute->product_style_id . '');

        // 保存canvase
        $canvasIds = array();
        $canvasSaveDatas = array();
        foreach ($xmlDatas->canvases as $canvas) {
            $canvaseArr = array();
            $canvases = $canvas->attributes();
            //m_log($canvases);
            $canvaseId = $canvases->canvas_id . '';
           // $canvaseArr['distress_id'] = isset($canvases->distress_id)? $canvases->distress_id. '':"";
            $canvaseArr['is_distressed'] = $canvases->is_distressed . '';
            $canvaseArr['region_name'] = $canvases->region . '';
            $canvaseArr['region'] = $canvases->region_id . '';
            $canvaseArr['location'] = $canvases->location . '';
            $canvaseArr['width'] = $canvases->width . '';
            $canvaseArr['height'] = $canvases->height . '';
            $canvaseArr['bgcolor'] = $canvases->bgcolor . '';
            $canvaseArr['shadow'] = $canvases->shadow . '';
            $canvaseArr['id'] = $canvases->canvas_id . '';
            $canvaseArr['app_id'] = $appId;
            $can = self::_db()->select_row("select * from canvas where id = ?",$canvaseArr['id']);
            if (!$can) {
                unset($canvaseArr['id']);
            }
            $canvasSaveDatas[] = $canvaseArr;
        }
        $canvasColors = array();
        $artFields = array(
            'art_id',
            'desaturate',
            'canvas_art_rendered',
            'art_path',
        );
        // 保存canvas art
        $canvasArtDatas = array();
        foreach ($xmlDatas->canvas_art as $cart) {
            $cArts = array();
            $cArtAttribute = $cart->attributes();
            $location = strtolower($cArtAttribute->location . '');
            $colors = array();
            foreach ($cArtAttribute as $key => $attr) {
                if (strstr($key, 'color') && !strstr($key, '_map')) {
                    $colors[$key] = $attr . '';
                    $canvasColors[$location][] = $attr . '';
                    continue;
                }
                if (in_array($key, $artFields) || strstr($key, 'disable_')) {
                    continue;
                }
                $cArts[$key] = $attr . '';
            }
            $colors["colors"] = array();
            if (is_array($cart->art->art_colors)) {
                foreach ($cart->art->art_colors as $art_colors) {
                    $art_colors_value = $art_colors->attributes();
                    $colors["colors"][] = $art_colors_value["color"];
                }
            }
            $disables = array(
                'disable_color_select' => empty($cArtAttribute->disable_color_select) ? 0 : $cArtAttribute->disable_color_select . '',
                'disable_size_width' => empty($cArtAttribute->disable_size_width) ? 0 : $cArtAttribute->disable_size_width . '',
                'disable_size_height' => empty($cArtAttribute->disable_size_height) ? 0 : $cArtAttribute->disable_size_height . '',
                'disable_size_rotation' => empty($cArtAttribute->disable_size_rotation) ? 0 : $cArtAttribute->disable_size_rotation . '',
                'disable_position_align' => empty($cArtAttribute->disable_position_align) ? 0 : $cArtAttribute->disable_position_align . '',
                'disable_position_flip' => empty($cArtAttribute->disable_position_flip) ? 0 : $cArtAttribute->disable_position_flip . '',
                'disable_position_nudge' => empty($cArtAttribute->disable_position_nudge) ? 0 : $cArtAttribute->disable_position_nudge . '',
                'disable_layer_frontback' => empty($cArtAttribute->disable_layer_frontback) ? 0 : $cArtAttribute->disable_layer_frontback . '',
            );
            $fields = array(
                'desaturate' => empty($cArtAttribute->desaturate) ? '' : $cArtAttribute->desaturate . '',
                'canvas_art_rendered' => empty($cArtAttribute->canvas_art_rendered) ? 0 : $cArtAttribute->canvas_art_rendered . '',
                'art_path' => empty($cArtAttribute->art_path) ? 0 : $cArtAttribute->art_path . '',
            );
            $cArts['art_id'] = empty($cArtAttribute->art_id) ? 0 : $cArtAttribute->art_id . '';
            $cArts['app_id'] = $appId;
            $cArts['colors'] = json_encode($colors);
            $cArts['disable'] = json_encode($disables);
            $cArts['private_fields'] = json_encode($fields);
            $cArts['type'] = 'art';
            $canvasArtDatas[] = $cArts;
        }
        // 保存canvas text
        $textFields = array(
            'value',
            'fill_color',
            'stroke_color',
            'font_id',
        );
        $canvasTextDatas = array();
        foreach ($xmlDatas->canvas_text as $cart) {
            $ctexts = array();
            $cTextAttribute = $cart->attributes();
            $location = strtolower($cTextAttribute->location . '');
            $colors = array();
            $fields = array();
            if(isset($cTextAttribute->stroke_width)){
                $canvasColors[$location][] = $cTextAttribute->fill_color;
                $canvasColors[$location][] = $cTextAttribute->stroke_color;
            }else{
                $canvasColors[$location][] = $cTextAttribute->fill_color;
            }
            foreach ($cTextAttribute as $key => $attr) {
                if (strstr($key, 'color') && !strstr($key, '_map')) {
                    $colors[$key] = $attr . '';
                    continue;
                }
                if (in_array($key, $textFields) || strstr($key, 'disable_')) {
                    continue;
                }
                $ctexts[$key] = $attr . '';
            }
            $ctexts['app_id'] = $appId;
            $ctexts['colors'] = json_encode($colors);
            $ctexts['type'] = 'text';
            $disables = array(
                'disable_text_your_text_word' => empty($cTextAttribute->disable_text_your_text_word) ? 0 : $cTextAttribute->disable_text_your_text_word . '',
                'disable_text_your_text_color' => empty($cTextAttribute->disable_text_your_text_color) ? 0 : $cTextAttribute->disable_text_your_text_color . '',
                'disable_text_font_category' => empty($cTextAttribute->disable_text_font_category) ? 0 : $cTextAttribute->disable_text_font_category . '',
                'disable_text_font_name' => empty($cTextAttribute->disable_text_font_name) ? 0 : $cTextAttribute->disable_text_font_name . '',
                'disable_text_font_outline' => empty($cTextAttribute->disable_text_font_outline) ? 0 : $cTextAttribute->disable_text_font_outline . '',
                'disable_size_width' => empty($cTextAttribute->disable_size_width) ? 0 : $cTextAttribute->disable_size_width . '',
                'disable_size_height' => empty($cTextAttribute->disable_size_height) ? 0 : $cTextAttribute->disable_size_height . '',
                'disable_size_rotation' => empty($cTextAttribute->disable_size_rotation) ? 0 : $cTextAttribute->disable_size_rotation . '',
                'disable_size_spacing' => empty($cTextAttribute->disable_size_spacing) ? 0 : $cTextAttribute->disable_size_spacing . '',
                'disable_size_curve' => empty($cTextAttribute->disable_size_curve) ? 0 : $cTextAttribute->disable_size_curve . '',
                'disable_shape_select_shape' => empty($cTextAttribute->disable_shape_select_shape) ? 0 : $cTextAttribute->disable_shape_select_shape . '',
                'disable_position_align' => empty($cTextAttribute->disable_position_align) ? 0 : $cTextAttribute->disable_position_align . '',
                'disable_position_flip' => empty($cTextAttribute->disable_position_flip) ? 0 : $cTextAttribute->disable_position_flip . '',
                'disable_position_nudge' => empty($cTextAttribute->disable_position_nudge) ? 0 : $cTextAttribute->disable_position_nudge . '',
                'disable_layer_forwardback' => empty($cTextAttribute->disable_layer_forwardback) ? 0 : $cTextAttribute->disable_layer_forwardback . '',
            );
            $fields = array(
                'value' => empty($cTextAttribute->value) ? 'S' : $cTextAttribute->value . '',
                'fill_color' => empty($cTextAttribute->fill_color) ? '' : $cTextAttribute->fill_color . '',
                'stroke_color' => empty($cTextAttribute->stroke_color) ? '' : $cTextAttribute->stroke_color . '',
                'font_id' => empty($cTextAttribute->font_id) ? '' : $cTextAttribute->font_id . '',
            );
            $ctexts['private_fields'] = json_encode($fields);
            $ctexts['disable'] = json_encode($disables);
            $canvasTextDatas[] = $ctexts;
        }
        // 保存canvas的颜色数量到colors里面
        $designColors = 0;
        $sideColors = array();

        foreach ($canvasColors as $clocation => $color) {
            $color = array_unique($color);
            $sideColors[] = $color;
            $designColors += count($color);
        }
        if($designColors>10){
            throw new Exception('颜色数量不能超过10种颜色');
        }
        $appTemplate['colors'] = $designColors;
        //$this->User->query('BEGIN');

        if ($appT) {
            $canvasId = self::_db()->select_row("select id from canvas where design_id = ?",$appTemplate['id']);
            //$canvasId = $this->Canvas->getIdsByDesignId($appId, $appTemplate['id']);
            if ($canvasId) {
                self::_db()->run_sql("delete from canvas_objects where canvas_id = ?",$canvasId['id']);
                self::_db()->run_sql("delete from canvas where id = ?",$canvasId['id']);
                self::_db()->run_sql("delete from design_svgs where design_id = ?",$appTemplate['id']);
            }
        }
        $pid = $appProductStyle['app_product_id'];

        self::_db()->update("designs",array(
            "default_product_style_id"=>$appTemplate['default_product_style_id'],
            "colors"=>$appTemplate['colors'],
            "uid"=>$appTemplate['uid'],
        ),array(
            "id"=>$appTemplate['id']
        ));
        //$saveDesign = $this->Design->saveData($appTemplate);
        $designId = $appTemplate['id'];
        $psid = $appProductStyle['product_style_id'];
        $result = self::_db()->select_rows("select * from design_product_maps where design_id = ? and product_id = ? and product_style_id = ?",$designId,$pid,$psid);
        //$result = $this->DesignProductMap->getMapByPidAndPsIdAndDesignId($appId, $pid, $psid, $designId);
        $productStyle = self::_db()->select_row("select * from product_styles where id = ?",$appProductStyle['product_style_id']);
        $product = self::_db()->select_row("select * from products where id = ?",$productStyle['product_id']);
        $appProduct = self::_db()->select_row("select * from app_products where id = ?",$pid);

        $activityProductStyle['app_product_id'] = $pid;
        $activityProductStyle['app_product_style_id'] = $appProductStyle['id'];
        $activityProductStyle['product_id'] = $product['id'];
        $activityProductStyle['product_style_id'] = $psid;
        if (!$result) {
            $maps = array(
                'product_id' => $pid,
                'product_style_id' => $psid,
                'design_id' => $designId,
                'app_id' => $appId,
            );
            self::_db()->insert("design_product_maps",$maps);
            //$this->DesignProductMap->saveData($maps);
        }

        $svg_front = isset($_POST['svgfront']) ? $_POST['svgfront']:null;
        $svg_back = isset($_POST['svgback']) ? $_POST['svgback']:null;
        $svg_third = isset($_POST['svgthird']) ? $_POST['svgthird']:null;
        $svg_fourth = isset($_POST['svgfourth']) ? $_POST['svgfourth']:null;
        $svg_front_image = null;
        if($svg_front){
            $svg_front_image = Model_Aliyun_Oss::upload_content($svg_front,"design/svg/$designId/front.svg");

            $design_svg_side_rows[] = array(
                'svg_url'=>$svg_front_image,
                'design_id'=>$designId,
                'side'=>"front",
                'create_time'=>date("Y-m-d H:i:s")
            );
        }
        $svg_back_image = null;
        if($svg_back){
            $svg_back_image = Model_Aliyun_Oss::upload_content($svg_back,"design/svg/$designId/back.svg");

            $design_svg_side_rows[] = array(
                'svg_url'=>$svg_back_image,
                'design_id'=>$designId,
                'side'=>"back",
                'create_time'=>date("Y-m-d H:i:s")
            );
        }
        $svg_third_image = null;
        if($svg_third){
            $svg_third_image = Model_Aliyun_Oss::upload_content($svg_third,"design/svg/$designId/third.svg");

            $design_svg_side_rows[] = array(
                'svg_url'=>$svg_third_image,
                'design_id'=>$designId,
                'side'=>"third",
                'create_time'=>date("Y-m-d H:i:s")
            );
        }
        $svg_fourth_image = null;
        if($svg_fourth){
            $svg_fourth_image = Model_Aliyun_Oss::upload_content($svg_fourth,"design/svg/$designId/fourth.svg");

            $design_svg_side_rows[] = array(
                'svg_url'=>$svg_fourth_image,
                'design_id'=>$designId,
                'side'=>"fourth",
                'create_time'=>date("Y-m-d H:i:s")
            );
        }


        $designSvg = array(
            "svg_front" => $svg_front,
            "svg_back" => $svg_back,
            "svg_third" => $svg_third,
            "svg_fourth" => $svg_fourth,
            "svg_front_image" => $svg_front_image,
            "svg_back_image" => $svg_back_image,
            "svg_third_image" => $svg_third_image,
            "svg_fourth_image" => $svg_fourth_image,
        );
        if($design_svg_side_rows){
            try{
                self::_db()->delete("design_svg_side",array("design_id"=>$designId));
                self::_db()->insert("design_svg_side",$design_svg_side_rows);
            }catch (Exception $e){

            }
        }

        $designSvg['design_id'] = $designId;

        self::_db()->delete("design_svgs",array("design_id"=>$designId));
        self::_db()->insert("design_svgs",$designSvg);
        //$this->DesignSvg->saveData($designSvg);
        foreach ($canvasSaveDatas as $data) {
            $data['design_id'] = $designId;
            if ($canvasColors && isset($canvasColors[$data['location']])) {
                $data['colors'] = count(array_unique($canvasColors[$data['location']]));
            }
            $data['shadow'] = 0;
            $canvasIds[$data['location']] = self::_db()->insert("canvas",$data);
        }
        $canvasObject = array_merge($canvasTextDatas, $canvasArtDatas);
        foreach ($canvasObject as $data) {
            $data['canvas_id'] = $canvasIds[strtolower($data['location'])];
            self::_db()->insert("canvas_objects",$data);
        }
        /**
         * 新建活动
         */
        $activityId = self::saveActivity($designId,$uid,$appTemplate['default_product_style_id'], $activityProductStyle, $appProductStyle['selling_price'],$designColors);
        if (!$activityId) {
            throw new Exception('', '2');
        }

        $ManufacturerBrand = self::_db()->select_row("select * from manufacturer_brands where id = ?",$product['manufacturer_brand_id']);


        $appTemplateSvg['design_id'] = $designId;
        //task_notice('http://121.40.129.97/convert.php', $appTemplateSvg);
        $templates = array(
            'name' => 'Design',
            'item' => array(
                array(
                    'name' => 'name',
                    'value' => $appTemplate['name']
                ),
                array(
                    'name' => 'DesignID',
                    'value' => $designId,
                ),
                array(
                    'name' => 'ActivityId',
                    'value' => $activityId,
                ),
                array(
                    'name' => 'DesignURI',
                    'value' => 'Design_' . $designId,
                ),
                array(
                    'name' => 'SessionID',
                    'value' => session_id(),
                ),
                array(
                    'name' => 'SessionToken',
                    'value' => md5(session_id()),
                ),
                array(
                    'name' => 'UserID',
                    'value' => session_id(),
                ),
                array(
                    'name' => 'title',
                    'value' => $appTemplate['name'],
                ),
                array(
                    'name' => 'description',
                    'value' => $appTemplate['name'] . '说明'
                ),
                array(
                    'name' => 'type',
                    'value' => 'product',
                ),
                array(
                    'name' => 'image',
                    'value' => $image = '',
                ),
                array(
                    'name' => 'sitename',
                    'value' => '易衫网',
                ),
                array(
                    'name' => 'brand',
                    'value' => $ManufacturerBrand['name'],
                ),
                array(
                    'name' => 'sku',
                    'value' => $product['sku'],
                ),
                array(
                    'name' => 'color',
                    'color' => $productStyle['color_name'],
                ),
                array(
                    'name' => 'Status',
                    'Status' => 'OK',
                ),
            ),
        );
        xml_response($templates);

    }
    static function saveActivity($designId,$uid,$default_product_style_id,$activityProductStyle, $clothCost,$colors){
        //$activity = $this->Activity->getByDesignId($designId);
        $activity = self::_db()->select_row("select * from activities where design_id = ?",$designId);
        // 更新活动
        if (!$activity['uid']) {
            $activityData['uid'] = $uid;
        }
        if (!$activity['status']) {
            $activityData['status'] = 'create';
        }
        if (!$activity['app_id']) {
            $activityData['app_id'] = 1;
        }
        if (!$activity['design_id']) {
            $activityData['design_id'] = $designId;
        }
        if (!$activity['sales_target']) {
            $activityData['sales_target'] = 50;
        }
        $activityData['default_product_style_id'] = $default_product_style_id;
        self::_db()->update("activities",$activityData,array("id"=>$activity['id']));

        // 判断activity product style 是否存在，存在就更新，不存在就新建
        $aStyles = self::_db()->select_row("select * from activity_product_styles where activity_id = ?",$activity['id']);;
        $condition['activity_id'] = $activity['id'];
        $processCost = 0;
        $processCost += self::calcMachiningCost($colors, 50);
        $activityProductStyle['sell_price'] = round(($clothCost + $processCost) * 1.5,2);
        $app_product_style = self::_db()->select_row("select aps.*,ap.product_id from app_product_styles as aps
                      left join app_products as ap on ap.id = aps.app_product_id where aps.id = ?",$default_product_style_id);

        if ($aStyles) {
            self::_db()->update("activity_product_styles",$activityProductStyle,array('id'=>$aStyles['id']));
        } else {
            self::_db()->insert("activity_product_styles",array(
                "activity_id"=>$activity['id'],
                "app_product_id"=>$app_product_style['app_product_id'],
                "app_product_style_id"=>$default_product_style_id,
                "sell_price"=>$activityProductStyle['sell_price'],
                "product_style_id"=>$app_product_style['product_style_id'],
                "product_id"=>$app_product_style['product_id'],
            ));
        }
        return $activity['id'];
    }

    /**
     * 计算印刷成本
     * @return array
     */
    static function get_print_cost() {
        $color_nums = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        ;
        $arr = array();
        $sale_nums = array(
            10,
            20,
            30,
            40,
            50,
            100,
            150,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            1000,
        );
        $const[10][1] = 15;
        $const[10][10] = 45;

        foreach ($color_nums as $x) {
            $c = count($color_nums);
            if ($x > 1 && $x < 10) {
                $const[10][$c - $x + 1] = round($const[10][$c - $x + 2] - ($const[10][10] - $const[10][1]) / $c, 2);
            }
        }

        $const[20][1] = 13.5;
        $const[20][2] = 19.5;
        $const[20][3] = 22;
        $const[20][4] = 25;
        $const[20][5] = 27.5;
        $const[20][6] = 30.0;
        $const[20][7] = 32.0;
        $const[20][8] = 34.0;
        $const[20][9] = 38.0;
        $const[20][10] = 41.5;

        $const[500][1] = 7.5;
        $const[500][2] = 11.0;
        $const[500][3] = 12;
        $const[500][4] = 14;
        $const[500][5] = 15.0;
        $const[500][6] = 16.40;
        $const[500][7] = 17.0;
        $const[500][8] = 18.0;
        $const[500][9] = 20.0;
        $const[500][10] = 23.0;

        $const1[1] = 5;
        $const1[2] = 6.40;
        $const1[3] = 7.10;
        $const1[4] = 7.80;
        $const1[5] = 8.50;
        $const1[6] = 9.20;
        $const1[7] = 9.90;
        $const1[8] = 10.60;
        $const1[9] = 11.30;
        $const1[10] = 12.0;
        $sale_nums_length = count($sale_nums);
        $_y = 10;
        foreach ($sale_nums as $y) {
            //echo $y.":  ";
            foreach ($color_nums as $x) {
                $value = "";
                if (isset($const[$y][$x])) {
                    $value = $const[$y][$x];
                } else {
                    if ($y == 30) {
                        $value = $arr[$_y][$x] - ($const[$_y][$x] - $const1[$x]) / $sale_nums_length;
                    } else if ($y > 30) {
                        $value = $arr[$_y][$x] - ($const[10][$x] - $const1[$x]) / $sale_nums_length;
                    }
                }
                $arr[$y][$x] = $value;
                //echo round($value,2)." ";
            }
            //ECHO PHP_EOL;
            $_y = $y;
        }
        return $arr;
    }

    /**
     * @param $color_num  颜色数量
     * @param $sale_num   销售数量
     */
    static function calculate_cost($color_num, $sale_num) {

        if ($sale_num > 1000) {
            $sale_num = 1000;
        }
        $costs = self::get_print_cost();

        //var_dump($costs);
        $price = null;
        $pre_sale_num = 10;
        foreach ($costs as $_sale_num => $colors) {
            if ($_sale_num == $sale_num) {
                $price = isset($colors[$color_num]) ? $colors[$color_num] : null;
                break;
            } else {
                if ($sale_num < $_sale_num) {
                    //echo $pre_sale_num." : ".$sale_num." : ".$_sale_num.PHP_EOL;
                    $pre_colors = $costs[$pre_sale_num];
                    //var_dump($pre_colors[$color_num]);
                    //var_dump($colors[$color_num]);
                    $price = $pre_colors[$color_num] + ($colors[$color_num] - $pre_colors[$color_num]) * ($sale_num - $pre_sale_num) / ($_sale_num - $pre_sale_num);
                    break;
                }
            }
            $pre_sale_num = $_sale_num;
        }
        if ($price === null) {
            throw new Exception("没有找到成本");
        }
        //print_r($price);
        return $price;
    }
    /**
     * 加工成本
     * @param colorCount 产品（四个面所包含）颜色数总
     * @param totalCount 销售目标
     */
    static function calcMachiningCost($colorCount, $totalCount) {
        //pt_log($totalCount);
        if ($totalCount == 0) {
            return 0.00;
        }
        return self::calculate_cost($colorCount, $totalCount);
        /**
         * if ($colorCount == 0) {
        return 0.00;
        }
        $money = 10 - ((10 - 2) / 990 * $totalCount);
        $money += $colorCount;
        return $money;
         */
    }
    function action_save_act_thumb(){
        $act_id = self::_request("act_id");
        $content = self::_request("content");
        $content = str_replace("data:image/png;base64,","",$content);
        $rand = rand(1000,9999);
        $path = PtApp::$setting['aliyun_oss']['bucket_root'].'/activity/thumb/'.date('Y-m-d-H-i-s').'/'.$rand.'.png';
        $url = Model_Aliyun_Oss::upload_content(base64_decode($content),$path);
        self::_db()->update("activities",array("thumb"=>$url),array("id"=>$act_id));
    }
    function action_activity_save(){

        if (!isset($_REQUEST['designId']) || !$_REQUEST['designId']) {
            throw new Exception("designId不能为空");
        }
        $design = self::_db()->select_row("select * from designs where id = ?",$_REQUEST['designId']);
        if (!$design) {
            throw new Exception("design不存在");
        }
        if (!isset($_REQUEST['target']) || !$_REQUEST['target'] || $_REQUEST['target'] < 10) {
            throw new Exception("target不能为空");
        }
        if (!isset($_REQUEST['products']) || !is_array($_REQUEST['products']) || !isset($_REQUEST['products'][0]['styles']) || !is_array($_REQUEST['products'][0]['styles'])) {
            throw new Exception("products不能为空");
        }
        if (!isset($_REQUEST['type'])) {
            throw new Exception("type不能为空");
        }
        if (!isset($_REQUEST['activityId']) || !$_REQUEST['activityId']) {
            throw new Exception("activityId不能为空");
        }

        $condition['id'] = $_REQUEST['activityId'];
        $activityData['sales_target'] = $_REQUEST['target'];
        $activityData['type'] = $_REQUEST['type'];
        $activityData['default_product_style_id'] = $_REQUEST['products'][0]['styles'][0]['id'];
        $activityData['status'] = 'create';
        self::_db()->update("activities",$activityData,$condition);

        $id = $condition['id'];
        self::_db()->delete("activity_product_styles",array("activity_id"=>$id));
        //delete
        $activityProductStyle = array();
        foreach ($_REQUEST['products'] as $product) {
            foreach ($product['styles'] as $style) {
                $appProduct = self::_db()->select_row("select * from app_products where id = ?",$product['id']);

                if (!$appProduct) {
                    throw new Exception("adds activity product style failed", 700004);
                }
                $appProductStyle = self::_db()->select_row("select * from app_product_styles where id = ?",$style['id']);

                if (!$appProductStyle) {
                    throw new Exception("adds activity product style failed", 700004);
                }

                $activityProductStyle = array(
                    'sell_price' => $product['price'],
                    'product_id' => $appProduct['product_id'],
                    'product_style_id' => $appProductStyle['product_style_id'],
                    'activity_id' => $id,
                    'app_product_id' => $product['id'],
                    'app_product_style_id' => $style['id'],
                );
                self::_db()->insert("activity_product_styles",$activityProductStyle);
            }
        }

        echo json_encode(array('name' => 'activity', 'attribute' => array('id' => $id)));exit;
    }


    function action_activity_save_info(){
        $uid  = self::get_uid();
        if (!isset($_REQUEST['description'])) {
            throw new Exception("description不能为空");
        }
        if (!isset($_REQUEST['activityId'])) {
            throw new Exception("activityId不能为空");
        }
        $activityId = $_REQUEST['activityId'];
        $activityData['description'] = $_REQUEST['description'] ;
        if (!isset($_REQUEST['designId']) || !$_REQUEST['designId']) {
            throw new Exception("designId不能为空");
        }
        if (!isset($_REQUEST['name'])) {
            throw new Exception("name不能为空");
        }
        if (isset($_REQUEST['addressInfo']) && $_REQUEST['addressInfo']) {
            $activityData['notes'] = $_REQUEST['addressInfo'] ;
        }
        // 是否包邮
        if (isset($_REQUEST['freePostage'])) {
            $activityData['free_postage'] = $_REQUEST['freePostage'] == 'false' ? 0 : 1;
        }

//         活动名称过滤黑名单
        $name = $_REQUEST['name'];
        $activityData['name'] = $name;
        if (!isset($_REQUEST['deadline'])) {
            throw new Exception("deadline不能为空");
        }
        switch ($_REQUEST['deadline']) {
            case 1:
                $activityData['end_time'] =  date('Y-m-d H:i:s', strtotime('+1 day')) ;
                break;
            case 5:
                $activityData['end_time'] =  date('Y-m-d H:i:s', strtotime('+5 day')) ;
                break;
            case 3:
                $activityData['end_time'] =  date('Y-m-d H:i:s', strtotime('+3 day')) ;
                break;
            case 7:
                $activityData['end_time'] =  date('Y-m-d H:i:s', strtotime('+7 day')) ;
                break;
            case 15:
                $activityData['end_time'] = date('Y-m-d H:i:s', strtotime('+15 day')) ;
                break;
            case 30:
                $activityData['end_time'] = date('Y-m-d H:i:s', strtotime('+1 month')) ;
                break;
            case 90:
                $activityData['end_time'] = date('Y-m-d H:i:s', strtotime('+3 month')) ;
                break;
            default:
                $activityData['end_time'] =  date('Y-m-d H:i:s', strtotime('+7 day')) ;
        }

        $activityData['deadline'] = $_REQUEST['deadline'];
        $activityData['start_time'] =  date('Y-m-d H:i:s');
        $activityData['real_end_time'] = $activityData['end_time'];
        $str = $_REQUEST['description'];
        $activityData['abstract'] =  mb_substr($str, 0, 200) ;
        $activityData['delivery_type'] = $_REQUEST['deliveryType'];
        $activityData['status'] = 'ongoing';
        if (isset($_REQUEST['addressId']) && $_REQUEST['addressId']) {
            $address = self::_db()->select_row("select * from user_addresses where id = ?",$_REQUEST['addressId']);
            if (!$address) {
                throw new Exception("没有找到收货地址");
            }
            $activityData['delivery_address'] = $address['province'] ." - ". $address['city'] ." - ". $address['county'] ." - ". $address['address'] ;
            $activityData['address_id'] = $_REQUEST['addressId'];
        }
        $activityData['uid'] = $uid;
        self::_db()->update("activities",$activityData,array("id"=>$activityId));
        try{
            self::_db()->insert("task_act_pic_merge",array(
                "act_id"=>$activityId
            ));
        }catch (Exception $e){

        }
        self::_db()->update("designs",array("uid"=>$uid),array("id"=> $_REQUEST['designId']));
        return array("ok");
        //echo json_encode(array('name' => 'activity', 'attribute' => array('id' => $activityId), 'value' => ""));exit;
    }

    /**
     * 保存上传的剪贴画
     * @param $appKey
     * @param $userToken
     * @param $uid
     */
    public function action_art_save() {
        $value = rand(10000, 99999);
        $art['date_created'] = date('Y-m-d H:i:s');
        $art['uid'] = self::get_uid();
        $art_id = self::_db()->insert('arts',$art);
        $artData = $this->art_upload_file_to_oss($art_id,$value);
        $art['id'] = $art_id;
        $art['original_art_path'] = $artData['originalPath'];
        $art['thumb_jit'] = $artData['thumbpath'];
        $art['art_path'] = $artData['originalPath'];
        $art['art_extension'] = $artData['extention'];
        $art['url'] = $artData['url'];
        $art['type'] = 'image';
        if (!in_array(strtolower($artData['extention']), array('jpg', 'jpeg', 'png', 'gif', 'bmp'))) {
            $art['type'] = 'vector';
        }
        $path_datas = array(
            'art_extension'=>$artData['extention'],
            'original_art_path'=>$artData['originalPath'],
            'art_path'=>$artData['originalPath'],
            'url'=>$artData['url'],
        );
        self::_db()->update('arts',$path_datas,array('id'=>$art_id));
        $printAtr = array(
            'name' => 'Art',
            'item' => array(
                array(
                    'name' => 'ArtID',
                    'value' => $art_id
                ),
                array(
                    'name' => 'SessionID',
                    'value' => ''
                ),
                array(
                    'name' => 'SessionToken',
                    'value' => ''
                ),
                array(
                    'name' => 'ArtName',
                    'value' => $artData['originalName'],
                ),
                array(
                    'name' => 'Status',
                    'value' => 'OK'
                ),
            ),
        );
        xml_response($printAtr);
    }

    function art_upload_file_to_oss($id,$rand) {
        if (isset($_FILES['Filename'])) {
            $files = $_FILES['Filename'];
            // 获取svg转换位图后的图片
            $extention = str_replace('image/', '', $files['type']);
            $originalName = $files['name'];
            $filepath = $files['tmp_name'];
            $filename = $originalName . $rand . '.' . $extention;
            $newfilename = $originalName;
            $path = $GLOBALS['setting']['aliyun_oss']['bucket_root']."/arts/svg/{$id}/{$newfilename}";
            $type = 'svg';
        } else {
            $files = $_FILES['file'];
            $extention = str_replace('image/', '', $files['type']);
            if (in_array(strtolower($extention), array('jpg', 'jpeg', 'png', 'gif', 'bmp'))) {
                $originalName = $files['name'];
                $filename = $originalName . $rand . '.' . $extention;
                $newfilename = $filename;
                $filepath = $files['tmp_name'];
                //m_log($filepath);
                $path = $GLOBALS['setting']['aliyun_oss']['bucket_root']."/arts/Bitmap/{$id}/{$newfilename}";
                $type = 'bit';
            }
            //TODO 矢量图的处理
        }
        $thumbpath = $GLOBALS['setting']['aliyun_oss']['bucket_root']."/arts/Art/{$id}/{$filename}";
        $oss_filepath = Model_Aliyun_Oss::upload_file($files['tmp_name'],$path);
        $arr = array(
            'extention' => $extention,
            'originalPath' => "REPLACE_DOMAIN_WITH".$path,
            'thumbpath' => "REPLACE_DOMAIN_WITH".$thumbpath,
            'originalName' => $originalName,
            "url"=>$oss_filepath
        );
        return $arr;
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
<?php
/**
 * 设计
 */
class Model_Design extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_get_distress_list(){
        return array();
    }

    static function set_design_cache($cache){
        PtApp::session_start();
        $sid = md5(session_id()."_salt");
        $sid = "test1";
        self::_redis()->set("desigin_cache_".$sid,json_encode($cache));
        return $sid;
    }
    static function get_design_from_cache(){
        PtApp::session_start();
        $sid = md5(session_id()."_salt");
        $sid = "test1";
        $res = self::_redis()->get("desigin_cache_".$sid);
        if($res) $res = json_decode($res,1);
        return $res;
    }
    function action_save(){
        $cache = array();
        $cache['xmlDesign'] = self::_request("xmlDesign");
        $sides = array("front","back","third","fourth");
        $side_svgs = array();
        foreach($sides as $side){
            $svg = self::_request("svg".$side);
            if(!empty($svg)){
                $side_svgs[$side] =   self::_request("svg".$side);
            }
        }
        $cache['side_svgs'] = $side_svgs;


        $design_id = self::set_design_cache($cache);
        $res = '<Design>
<name>name</name>
<DesignID>'.$design_id.'</DesignID>
<ActivityId></ActivityId>
<DesignURI>'.$design_id.'</DesignURI>
<SessionID></SessionID>
<SessionToken></SessionToken>
<UserID></UserID>
<title>title</title>
<description>des</description>
<type>product</type><image></image>
<sitename>easytee</sitename><brand/>
<sku></sku><color/>
<Status/>
</Design>';
        xml_response($res);
    }
    function action_get(){
        $desigin_cache = self::get_design_from_cache();
        //var_dump($desigin_cache);exit;

        if(!$desigin_cache){
            $xml = '<ThisDesign>
<designs table_name="design" design_id="1" uri="1" name="" colors="" max_colors_per_side="" can_customize="" notes="" can_screen_print="1" is_embroidery="" designer_version="HTML5DS" disable_product_update_front="0" disable_product_update_color="0" disable_product_update_back="0" disable_canvas_add="0" />
<canvases table_name="canvas" canvas_id="11" is_distressed="1" location="front" width="436.00" height="87.00" bgcolor="7B0B07" shadow="0" colors="1" disable_image_add="0" disable_text_add="0" disable_image_delete="0" disable_text_delete="0" region_name="1" />
<canvas_text location="FRONT" canvas_id="11" x="43.000000" y="255.000000" z="0.000000" width="348.00" height="69.00" fliph="0" flipv="0" rotate="0.000000" ispublic="0" disable_size_height="0" disable_size_width="0" disable_size_rotation="0" disable_position_align="0" disable_position_flip="0" disable_position_nudge="0" table_name="canvas_text" canvas_text_id="15" disable_size_spacing="0" disable_size_curve="0" disable_shape_select_shape="0" stroke_width="0.000000" shape="arcup" sweep="0.000000" wrap_mode="0" wrap_amount="0" kerning="0" disable_text_your_text_word="0" disable_text_your_text_color="0" disable_text_font_category="0" disable_text_font_name="0" disable_layer_forwardback="0" disable_text_font_outline="0" value="请输入文字" envelope="0" font_id="136" fill_color="FFFFFF" stroke_color="FFFFFF" ><fonts font="Microsoft YaHei" font_style_id="45" ><font_styles><canvas_text_embroidery/></font_styles></fonts></canvas_text></ThisDesign>';
            xml_response($xml);
        }

        $xmlDesign = $desigin_cache['xmlDesign'];
        $xmlDatas = simplexml_load_string($xmlDesign, 'SimpleXMLElement', LIBXML_NOCDATA);
        $disable = json_decode('{"disable_product_update_front":0,"disable_product_update_color":0,"disable_product_update_back":0,"disable_canvas_add":0}', true);

        $printDesign = array(
            'name' => 'designs',
            'attribute' => array(
                'table_name' => 'design',
                'design_id' => 1,
                'uri' => 1,
                'name' => "",
                'colors' => "",
                'max_colors_per_side' => "",
                'can_customize' => "",
                'notes' => "",
                'can_screen_print' => 1,
                'is_embroidery' => "",
                'designer_version' => "HTML5DS",
                'disable_product_update_front' => $disable['disable_product_update_front'],
                'disable_product_update_color' => $disable['disable_product_update_color'],
                'disable_product_update_back' => $disable['disable_product_update_back'],
                'disable_canvas_add' => $disable['disable_canvas_add'],
            ),
        );
        $print = array(
            'name' => 'ThisDesign',
            'item' => array(
                $printDesign,
            ),
        );
        $printCanvasArt = $printCanvasText = $printCanvas = array();

        foreach ($xmlDatas->canvases as $canvas) {
            $canvases = $canvas->attributes();
            $canvaseArr = array();
            $canvaseArr['table_name'] = 'canvas';
            $canvaseArr['canvas_id'] = $canvases->canvas_id . '';
            $canvaseArr['is_distressed'] = empty($canvases->is_distressed)?0:$canvases->is_distressed . '';
            $canvaseArr['location'] = $canvases->location . '';
            $canvaseArr['width'] = $canvases->width . '';
            $canvaseArr['height'] = $canvases->height . '';
            $canvaseArr['bgcolor'] = $canvases->bgcolor . '';
            $canvaseArr['shadow'] = ($canvases->shadow . '' == 'false')?0:1;
            $canvaseArr['colors'] = 1;
            $canvaseArr['disable_image_add'] = 0;
            $canvaseArr['disable_text_add'] = 0;
            $canvaseArr['disable_image_delete'] = 0;
            $canvaseArr['disable_text_delete'] = 0;
            $canvaseArr['region_name'] = $canvases->region . '';
            $printCanvas[] = array(
                'name' => 'canvases',
                'attribute' => $canvaseArr,
            );
        }
        $disable = json_decode('{"disable_text_your_text_word":0,"disable_text_your_text_color":0,"disable_text_font_category":0,"disable_text_font_name":0,"disable_text_font_outline":0,"disable_size_width":0,"disable_size_height":0,"disable_size_rotation":0,"disable_size_spacing":0,"disable_size_curve":0,"disable_shape_select_shape":0,"disable_position_align":0,"disable_position_flip":0,"disable_position_nudge":0,"disable_layer_forwardback":0}', TRUE);
        foreach ($xmlDatas->canvas_text as $canvas_text) {
            $objectArr = array();
            $objectArr['name'] = 'canvas_text';
            $text = $canvas_text->attributes();
            $objectArr['attribute'] = array(
                'location' => $text->location."",
                'canvas_id' => "-1",
                'x' => $text->x."",
                'y' => $text->y."",
                'z' => 0,
                'width' =>$text->width."",
                'height' => $text->height."",
                'fliph' => 0,
                'flipv' => 0,
                'rotate' => empty($text->rotate)?0:$text->rotate."",
                'ispublic' => 0,
                'disable_size_height' => $disable['disable_size_height'],
                'disable_size_width' => $disable['disable_size_width'],
                'disable_size_rotation' => $disable['disable_size_rotation'],
                'disable_position_align' => $disable['disable_position_align'],
                'disable_position_flip' => $disable['disable_position_flip'],
                'disable_position_nudge' => $disable['disable_position_nudge'],
            );

            $objectArr['attribute']['table_name'] = "canvas_text";
            $objectArr['attribute']['canvas_text_id'] = -1;
            $objectArr['attribute']['disable_size_spacing'] = $disable['disable_size_spacing'];
            $objectArr['attribute']['disable_size_curve'] = $disable['disable_size_curve'];
            $objectArr['attribute']['disable_shape_select_shape'] = $disable['disable_shape_select_shape'];
            $objectArr['attribute']['stroke_width'] = empty($text->stroke_width)?0:$text->stroke_width."";
            $objectArr['attribute']['shape'] = $text->shape."";
            $objectArr['attribute']['sweep'] = empty($text->sweep)?0:$text->sweep."";

            // 没有字段的
            $objectArr['attribute']['wrap_mode'] = 0;
            $objectArr['attribute']['wrap_amount'] = 0;
            $objectArr['attribute']['kerning'] = empty($text->kerning)?0:$text->kerning."";
            $objectArr['attribute']['disable_text_your_text_word'] = $disable['disable_text_your_text_word'];

            $objectArr['attribute']['disable_text_your_text_color'] = $disable['disable_text_your_text_color'];
            $objectArr['attribute']['disable_text_font_category'] = $disable['disable_text_font_category'];
            $objectArr['attribute']['disable_text_font_name'] = $disable['disable_text_font_name'];
            $objectArr['attribute']['disable_layer_forwardback'] = $disable['disable_layer_forwardback'];
            $objectArr['attribute']['disable_text_font_outline'] = $disable['disable_text_font_outline'];

            $objectArr['attribute']['value'] = $text->value."";
            $objectArr['attribute']['envelope'] = 0;
            $objectArr['attribute']['font_id'] = $text->font_id."";
            $objectArr['attribute']['fill_color'] = $text->fill_color."";
            $objectArr['attribute']['stroke_color'] = $text->stroke_color."";

            $font = self::_db(NEW_DB)->select_row("select c.name as c_name,f.gifpath,f.name ,c.id as font_category_id from font as f left join font_cat_rel as rel on rel.font_id = f.id left join font_cat as c on c.id = rel.cat_id where f.id = ? ",$text->font_id);
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
                                'font_style' => $font['c_name'],
                                'gifpath' => $font['gifpath'],
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
        foreach ($xmlDatas->canvas_art as $canvas_art){
            $objectArr = array();
            $objectArr['name'] = 'canvas_art';
            $art = $canvas_art->attributes();
            $objectArr['attribute'] = array(
                'location' => $art->location."",
                'canvas_id' => "-1",
                'x' => $art->x."",
                'y' => $art->y."",
                'z' => 0,
                'width' =>$art->width."",
                'height' => $art->height."",
                'fliph' => 0,
                'flipv' => 0,
                'rotate' => empty($art->rotate)?0:$art->rotate."",
                'ispublic' => 0,
                'disable_size_height' => $disable['disable_size_height'],
                'disable_size_width' => $disable['disable_size_width'],
                'disable_size_rotation' => $disable['disable_size_rotation'],
                'disable_position_align' => $disable['disable_position_align'],
                'disable_position_flip' => $disable['disable_position_flip'],
                'disable_position_nudge' => $disable['disable_position_nudge'],
            );


            $privateFields = $disable;
            $objectArr['name'] = 'canvas_art';
            $objectArr['attribute']['canvas_art_id'] = "-1";
            $objectArr['attribute']['table_name'] = "canvas_art";
            $objectArr['attribute']['original_path'] = $art->art_id;
            $objectArr['attribute']['disable_layer_frontback'] = 0;
            $objectArr['attribute']['canvas_art_rendered'] = 0;
            $objectArr['attribute']['desaturate'] = '';
            $objectArr['attribute']['art_id'] = $art->art_id;

            $printArt = array(
                'name' => 'art',
                'attribute' => array(
                    'art_name' => "",
                    'art_type' => "",
                    'ispublic' => 0,
                    'art_path' => $art->art_id,
                    'original_art_path' => $art->art_id
                ),
            );

            $colors = array();
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

        $print['item'] = array_merge($print['item'], $printCanvas, $printCanvasText, $printCanvasArt);
        //print_r($print);exit;
        xml_response($print);
    }

    function action_init(){

        $pro_id = self::_request("pro_id");
        //$design_init_config = self::_redis()->get("design_init_config");
        //if($design_init_config){
            //  xml_response($design_init_config);
        //}

        $fonts = self::_db(NEW_DB)->select_rows("select * from font_cat");
        $fontList = array(
            'name' => 'FontList',
            'attribute' => null,
        );
        foreach ($fonts as $value) {
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
        //颜色列表
        $colors = self::_db(NEW_DB)->select_rows('SELECT
                        Color.*,ColorCategory.id AS category_id ,ColorCategory.`name` AS category_name
                        FROM
                        colors AS Color
                        INNER JOIN color_category_maps AS ColorCategoryMaps ON ColorCategoryMaps.colors_id = Color.id
                        INNER JOIN color_categories AS ColorCategory ON ColorCategory.id = ColorCategoryMaps.colors_category_id
                        ');

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

        $ExcludedFontIDs = array(
            'name' => 'ExcludedFontIDs',
            'attribute' => NULL,
            'item' => NULL,
        );

        $UploadImageTerms = array(
            'name' => 'UploadImageTerms',
            'value' => '<span style="font-weight: bold;">请仔细阅读</span><div>您提交的任何设计必须是您设计或者拥有合法使用权。你不得使用他人拥有的内容，除非你得到他们的许可。如果有人因为你的设计向我们索赔，您同意支付我们受到损失，包括律师费等任何损失。</div>',
        );
        $product = self::_db(NEW_DB)->select_row("select
                          p.name as product_name,p.sku,p.content as long_description,p.man_sku as manufacturer_sku,
                          m.short_name as Abbreviation,mb.img_url as brand_image
                        from product as p
                        left join man_brand as mb on mb.id = p.brand_id
                        left join manufacturer as m on m.id = mb.man_id
                        where p.id = ? and p.status = 1",$pro_id);
        if (!$product) {
            throw new Exception("没有找到产品");
        }
        $ProductResult = Model_Product::info($pro_id,$product);

        $ProductColorResult = array(
            'name' => 'ProductColorResult',
            'attribute' => null,
            'item' => array(
                'name' => 'products',
                'attribute' => array(
                    'product_id' => $pro_id,
                    'sku' => $product['sku'],
                    'name' => $product['product_name'],
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'can_handle_sleeves' => 0,
                ),
                'item' => $ProductResult,
            ));
        $productArray = array(
            'name' => 'InitialLoad',
            'attribute' => null,
            'item' => array(
                $fontList,
                $ExcludedFontIDs,
                $InkColorList,
                //$ProductResult,
                $ProductColorResult,
                $UploadImageTerms
            )
        );
        $xml = arrayToXML($productArray);
        //self::_redis()->set("design_init_config",$xml);
        xml_response($xml);
    }
    static function convert_svg_to_png($from_path,$to_path,$color = 'none'){
        if($color != 'none'){
            $color =  str_replace("#","",$color);
            $color = "'#{$color}'";
        }
        $cmd = "convert -background {$color} {$from_path} {$to_path}";
        pt_debug($cmd);
        system($cmd,$return_var);
        pt_debug($return_var);
        return $return_var;
    }
    static function merge_design_png($front_img,$bg_img,$x,$y,$dest_img){
        $convert_root = "/tmp";
        $dest_img = $convert_root."/".$dest_img;
        $cmd = "composite -gravity northwest -geometry +{$x}+{$y} {$front_img} {$bg_img} {$dest_img}";
        //echo $cmd;
        system($cmd,$return_var);
        return $dest_img;
    }
    /**
     * @param $img_url
     * @param $colorName
     * @return string
     * $cmd = "convert -background none {$dir}.svg {$dir}.png";
     * echo "convert -background '#{$c}' {$dir}.svg {$dir}.png";
     */
    static function get_tpl_svg($img_url,$colorName){
        if(substr($img_url,0,19) == "REPLACE_DOMAIN_WITH"){
            $img_url = str_replace("REPLACE_DOMAIN_WITH","http://cdn.open.easytee.me",$img_url);
        }

        $img_content = file_get_contents($img_url);
        $img_content = "data:image/png;base64,".base64_encode($img_content);
        $tpl_content = '<svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="overflow: hidden; position: relative;background-color: #'. $colorName .'" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet"><image x="0" y="0" width="500" height="500" preserveAspectRatio="none" xlink:href="' . $img_content . '" transform="matrix(1,0,0,1,0,0)"></image></svg>';
        return $tpl_content;

    }
    static function replace_svg($svg){
        $svg = preg_replace('/<rect(.*?)\/>/s', '', $svg);
        return $svg;
    }
    static function reset_svg($svg){
        if (!preg_match('/<image(.*?)xlink:href="([0-9]+)"(.*?)\/>/i', $svg)) {
            return $svg;
        }
        preg_match_all('/<image(.*?)xlink:href="([0-9]+)"(.*?)\/>/i', $svg, $res);
        if (empty($res[2])) {
            return $svg;
        }
        $art_ids = $res[2];
        $arts = PtLib\db_select_rows("select id,thumb_jit,url,art_extension from arts where id in (".implode(",",$art_ids).")");
        foreach ($arts as $art) {
            //$image = $art['thumb_jit'];
            $image = $art['url'];
            if($image){
                $extension = $art['art_extension'];
                $file = file_get_contents($image);
                $file = base64_encode($file);
                $svg = preg_replace('/<image(.*?)xlink:href=\"' . $art['id'] . '\"(.*?)\/>/s', '<image$1xlink:href="data:image/'.$extension.';base64,' . $file . '"$2/>', $svg);

            }
        }
        return $svg;
    }
    /*
     * 详情
     * @return array
     *
    function action_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
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
     * 列表
     *
    function action_list(){
        return self::table_list();
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
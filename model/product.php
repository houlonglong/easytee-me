<?php
/**
 * 产品
 */
class Model_Product extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function view_sizes(){
        $act_id = self::_request("act_id");
        $productSizes = self::_db(NEW_DB)->select_rows("select * from  product_sizes as ps left join act_product as ap on ap.pro_id = ps.product_id where ap.act_id = ?",$act_id);
        $sizes = array();
        foreach ($productSizes as $value) {
            $sizes[$value['pro_id']][] = $value;
        }

        return array("size"=>$sizes);
    }
    function action_get(){

        $style_id = self::_request("productStyleId");
        $pro_id = self::_request("productId");

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
        $res = self::info($pro_id,$product,$style_id);
        xml_response($res);
    }
    static $product_info_cache_key = "product_info_cache_key";
    static function get_product_info_cache(){
        $res = self::_redis()->get(self::$product_info_cache_key);
        return empty($res)?array():json_decode($res,true);
    }
    static function set_product_info_cache($info){
        self::_redis()->set(self::$product_info_cache_key,json_encode($info));
    }
    static function del_product_info_cache(){
        self::_redis()->delete(self::$product_info_cache_key);
    }
    static function get_product_info(){
        $result = self::get_product_info_cache();
        if($result){
            return $result;
        }
        $_products = self::_db()->select_rows("select
              style.product_id,style.id as style_id,style.color,style.color_name,style.selling_price,style.is_default,
              product.name as product_name,brand.name as brand_name,man.short_name as man_name,
              cat.name as cat_name,cat.id as cat_id
               from et_product_style as style
              left join et_product as product on product.id = style.product_id
              left join et_product_brand as brand on brand.id = product.brand_id
              left join et_product_manufacturer as man on man.id = brand.man_id
              left join et_product_cat_map as map on map.product_id = product.id
              left join et_product_cat as cat on cat.id = map.cat_id
              where cat.enable = 'Y'
              ");
        $_product_designs = self::_db()->select_rows("select * from et_product_design");
        $_product_sizes = self::_db()->select_rows("select * from et_product_inventory");

        $product_designs = array();
        foreach($_product_designs as $_product_design){
            unset($_product_design['id']);
            $product_designs[$_product_design['product_id']][] = $_product_design;
        }

        $sizes = $cats = $products = $styles = array();
        foreach($_product_sizes as $_product_size){
            unset($_product_size['id']);
            $sizes[$_product_size['product_id']][$_product_size['style_id']][] = array(
                "size"=>$_product_size['size']
            );
        }
        foreach($_products as $_product){
            $cats[$_product['cat_id']] = array(
                "cat_name"=>$_product['cat_name']
            );
            $products[$_product['cat_id']][$_product['product_id']] = array(
                "product_name"=>$_product['product_name'],
                "man_name"=>$_product['man_name'],
                "brand_name"=>$_product['brand_name'],
                "product_design"=>$product_designs[$_product['product_id']]
            );
            $styles[$_product['product_id']][$_product['style_id']] = array(
                "color"=>$_product['color'],
                'color_name'=>$_product['color_name'],
                'is_default'=>$_product['is_default']
            );
        }

        $result['cats'] = $cats;
        $result['products'] = $products;
        $result['styles'] = $styles;
        $result['sizes'] = $sizes;
        self::set_product_info_cache($result);
        return $result;
    }
    function action_get_list(){

        $productCategoryId = self::_request("productCategoryId");


        $rows = self::_db(NEW_DB)->select_rows("select c.name as category,mb.name as manufacturer,
          p.man_sku as manufacturer_sku,p.id as product_id,c.id as product_category_id,
          p.sku,ps.color,ps.color_name,p.name as product_name,ps.id as product_style_id,ps.sale_price,pi.img_url
          from product as p
          left join pro_style as ps on p.id = ps.pro_id and ps.is_default = 1
          left join man_brand as mb on mb.id = p.brand_id
          left JOIN manufacturer as m on m.id = mb.man_id
          left join pro_cat_rel as rel on rel.pro_id = p.id
          left join pro_cat as c on c.id = rel.cat_id
          left join pro_img as pi on pi.pro_id = p.id and side = 'front'
          where c.id = ? and p.status = 1",$productCategoryId);
        if(!$rows) throw new Exception("没有找到分类");
        foreach ($rows as $row) {
            $CS[] = array(
                'name' => 'CS',
                'attribute' => array(
                    'category' => $row['category'],
                    'manufacturer' => $row['manufacturer'],
                    'manufacturer_sku' => $row['manufacturer_sku'],
                    'product_id' => $row['product_id'],
                    'product_category_id' => $productCategoryId,
                    'sku' => $row['sku'],
                    'is_static' => 0,
                    'name' => $row['product_name'],
                    'product_style_id' => $row['product_style_id'],
                    'product_style_uri' =>  $row['product_style_id'],
                    'is_default' => 0,
                    'color' => $row['color_name'],
                    'html_color' => $row['color'],
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'unit_price' => $row['sale_price'],
                    'thumburl_front' => "REPLACE_DOMAIN_WITH/".$row['img_url'],
                    'thumburl_front_cached' => "REPLACE_DOMAIN_WITH/".$row['img_url'],
                ),
            );
        }
        $result = array(
            'name' => 'ProductList',
            'item' => $CS,
        );
        xml_response($result);
    }
    function action_cat_list(){
        $categoryList = self::_db(NEW_DB)->select_rows("select * from pro_cat where enable = 'Y'");

        $productCate = array();
        foreach ($categoryList as $val) {
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
    static function get_product_image_region($pro_id){
        $images = self::_db(NEW_DB)->select_rows("select i.id,i.side,i.img_url as imgurl,a.id as region_id,concat(a.left,',',a.top,',',a.width,',',a.height) as region_region,a.inche as render_width_inches from pro_img as i left join pro_design_area as a on a.pro_id = i.pro_id and i.side = a.side where i.pro_id = ?",$pro_id );
        $sides = array(
            "front"=>array(
                "name"=>"前胸",
                "side"=>"front",
                "sequence"=>1,
                "sequence"=>1,
                "is_default"=>1
            ),
            "back"=>array(
                "name"=>"后背",
                "side"=>"back",
                "sequence"=>2,
                "is_default"=>0
            ),
            "left"=>array(
                "name"=>"左袖",
                "side"=>"third",
                "sequence"=>3,
                "is_default"=>0
            ),
            "right"=>array(
                "name"=>"右袖",
                "side"=>"fourth",
                "sequence"=>4,
                "is_default"=>0
            )
        );
        $produtRegions = array();
        foreach ($images as $image) {
            $image['imgurl'] = "REPLACE_DOMAIN_WITH/".$image['imgurl'];
            $image['thumburl'] = $image['imgurl'];

            if ($image['side'] == 'front') {
                $thumburl_front = $image['thumburl'];
                $thumburl_front_cached = $image['thumburl'];
            }
            $side = $image['side'];
            $image['name'] = $sides[$side]['name'];
            $image['side'] = $sides[$side]['side'];
            $image['sequence'] = $sides[$side]['sequence'];
            $image['is_default'] = $sides[$side]['is_default'];

            $image['region_name'] = $sides[$side]['name'];
            $image['region_sequence'] = $sides[$side]['sequence'];

            $produtRegions[] = array(
                'name' => 'product_regions',
                'attribute' => array(
                    'product_region_id' => $image['region_id'],
                    'side_name' => $image['name'],
                    'side' => $image['side'],
                    'is_default' => $image['is_default'],
                    'name' => $image['region_name'],
                    'region' => $image['region_region'],
                    'render_width_inches' => $image['render_width_inches'],
                    'side_order' => $image['sequence'],
                    'region_order' => $image['region_sequence'],
                    'imgurl' => $image['imgurl'],
                    'thumburl' => $image['thumburl'],
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
        return $produtRegions;
    }
    static function get_product_size($pro_id){
        $rows = self::_db(NEW_DB)->select_rows("select * from pro_style_size where pro_id = ? ",$pro_id);

        $ProductStyleSize = array();
        foreach($rows as $row){
            $ProductStyleSize[$row['color']][] = $row;
        }
        return $ProductStyleSize;
    }
    /**
     * 获取产品的详细信息
     * @param $id  产品ID
     * @return array
     */
    static function info($id,$product,$style_id = ''){
        if(!$style_id){
            $styles = self::_db(NEW_DB)->select_rows("select
                      ps.id as app_product_style_id, ps.id as product_style_id ,ps.is_default,ps.sale_price as selling_price,ps.color,ps.color_name
                    from pro_style  as ps
                    where ps.pro_id = ?",$id);
        }else{
            $styles = self::_db(NEW_DB)->select_rows("select
                      ps.id as app_product_style_id, ps.id as product_style_id ,ps.is_default,ps.sale_price as selling_price,ps.color,ps.color_name
                    from pro_style  as ps
                    where ps.id = ?",$style_id);
        }
        if (!$styles) {
            throw new Exception("没有找到款式");
        }

        $productStyles = array();
        $region = self::get_product_image_region($id);
        //print_pre($region);exit;
        $sizes_rows = self::get_product_size($id);

        foreach ($styles as $style) {
            $style_sizes = $sizes_rows[$style['color']];
            $html_color = $style['color'];
            $sizes = array();
            $sizesids = array();
            $upcharges = array();
            foreach ($style_sizes as $size) {
                $sizes[] = $size['size'];
                $sizesids[] = $size['id'];
                $upcharges[] = $size['increase']; //各个尺码是否需要加减价
            }
            $sizes = implode(',', $sizes);
            $sizesids = implode(',', $sizesids);
            $upcharges = implode(',', $upcharges);

            $image_width = '500';
            $image_height = '500';

            $productStyles[] = array(
                'name' => 'product_styles',
                'attribute' => array(
                    'product_style_id' => $style['product_style_id'],
                    'is_default' => $style['is_default'],
                    'color' => $style['color_name'],
                    'html_color' => $html_color,
                    'customizable' => 1,
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'unit_price' => $style['selling_price'],
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
                'item' => $region
            );
        }
        $mfr_image = json_decode($product['brand_image']);
        $product['long_description'] = "";
        $productResult = array(
            'name' => 'products',
            'attribute' => array(
                'product_id' => $id,
                'manufacturer' => $product['Abbreviation'],
                'mfr_image_wide' => $mfr_image->wide,
                'mfr_image_square' => $mfr_image->square,
                'mfr_image_tiny' => $mfr_image->tiny,
                'manufacturer_sku' => $product['manufacturer_sku'],
                'sku' => $product['sku'],
                'name' => $product['product_name'],
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

    static function get_product_styles_by($style_ids){
        if(empty($style_ids)) return array();
        $rows = self::_db(NEW_DB)->select_rows("
            select ps.id,ps.pro_id,ps.cost_price,ps.sale_price as unit_price,
            ps.color as pro_color,ps.color_name as pro_color_name,p.name as pro_name,
            brand.name as brand_name,cat.name as pro_cat_name
            from pro_style as ps
            left join product as p on p.id = ps.pro_id
            left join man_brand as brand on brand.id = p.brand_id
            left join pro_cat_rel as rel on rel.pro_id = p.id
            left join pro_cat as cat on cat.id = rel.cat_id
            where ps.id in (".implode(",",$style_ids).")
        ");
        return $rows;
    }

}
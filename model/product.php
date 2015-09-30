<?php
class Model_Product extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
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

}
<?php
/**
 * svg转PNG
 */
class Model_Tools_Svg_Convert extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_png(){
        $id = 3281;
        $act = self::_db()->select_row("select default_product_style_id,design_id from activities where id = ?",$id);
        $_act_designs = self::_db()->select_rows("select svg_url,side from design_svg_side where design_id = ?",$act['design_id']);
        $_sides = array(
            "front","back","third","fourth"
        );
        $__act_designs = array();
        foreach($_act_designs as $_act_design){
            $__act_designs[$_act_design['side']] = array(
                "svg_url"=>$_act_design['svg_url'],
                //"svg"=>file_get_contents($_act_design['svg_url']),
            );
        }
        foreach($_sides as $_side){
            $act_designs[$_side] = isset($__act_designs[$_side])?$__act_designs[$_side]:null;
        }

        $default_product_style_id = $act['default_product_style_id'];
        $_styles = self::_db()->select_rows("select aps.sell_price,aps.product_id,aps.product_style_id,
                s.color_name,s.color,s.is_default
                from activity_product_styles as aps
                left join et_product_style as s on s.id = aps.product_style_id
                where activity_id = ? order by aps.id asc",$id);

        $product_ids = array();
        $product_style_ids = array();
        foreach($_styles as $style){
            $product_ids[] = $style['product_id'];
            $product_style_ids[] = $style['product_style_id'];
        }
        $product_ids = array_unique($product_ids);
        $product_style_ids = array_unique($product_style_ids);
        $_products = self::_db()->select_rows("select content,name,id from et_product where id in (".implode(",",$product_ids).")");

        $_product_designs = self::_db()->select_rows("select * from et_product_design where product_id in (".implode(",",$product_ids).")");
        foreach($_products as $_product){
            $_product['content'] = replace_cdn($_product['content']);
            $products[$_product['id']] = $_product;
        }
        $product_designs = array();
        foreach($_product_designs as $_product_design){
            $product_designs[$_product_design['product_id']][$_product_design['side']] = $_product_design;
        }

        $styles = array();

        foreach($_styles as $style){
            if($style["product_style_id"] == $default_product_style_id) $default_style = $style;
            $styles[$style['product_id']]["style_".$style["product_style_id"]] = $style;
        }
        $inventorys = self::_db()->select_rows("select * from et_product_inventory where style_id in (".implode(",",$product_style_ids).")");
        $sizes = array();
        foreach($inventorys as $inventory){
            $sizes[$inventory['product_id']][$inventory['style_id']][] = $inventory;
        }
        $svg_url =  $act_designs['front']['svg_url'];
        $svg_content = file_get_contents($svg_url);
        $design_info =  $product_designs[2]["front"];

        $x =$design_info['x'];
        $y =$design_info['y'];
        $img_url = $design_info['img_url'];
        $img_content = file_get_contents($img_url);
        $img_content = "data:image/png;base64,".base64_encode($img_content);
        $svg_content = "<svg x='$x/2' y='$y/2'".substr($svg_content,4);
        $tpl_content = '<svg height="500" width="500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="overflow: hidden; position: relative;" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet"><image x="0" y="0" width="500" height="500" preserveAspectRatio="none" xlink:href="' . $img_content . '" transform="matrix(1,0,0,1,0,0)"></image>'.$svg_content.'</svg>';

        return Model_Aliyun_Oss::upload_content($tpl_content,"test/test/test.svg");

        //print_r($styles);exit;
        return array(
            "products"=>$products,
            "product_designs"=>$product_designs,
            "act_designs"=>$act_designs,
            "styles"=>$styles,
            "sizes"=>$sizes,
            "default_style"=>$default_style
        );
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
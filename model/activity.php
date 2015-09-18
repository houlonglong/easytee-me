<?php
/**
 * 活动
 */
class Model_Activity extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_detail($id){
        $act = self::_db()->select_row("select default_product_style_id,design_id from activities where id = ?",$id);

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
        //var_dump($product_ids);exit;
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
        $_act_product_designs = self::_db()->select_rows("select * from et_activity_product where activity_id = ?",$id);
        $env = PtApp::$ENV;

        if(!$_act_product_designs){
            $_act_designs = self::_db()->select_rows("select svg_url,side from design_svg_side where design_id = ?",$act['design_id']);
            //print_r($act['design_id']);exit;
            //return $_act_designs;
            foreach($_act_designs as $_act_design){
                $svg_url = $_act_design['svg_url'];
                //pt_debug($svg_url);
                $_svg_content = file_get_contents($svg_url);
                $side = $_act_design['side'];
                foreach($product_ids as $product_id){
                    $design_info =  $product_designs[$product_id][$side];
                    $x =$design_info['x'];
                    $y =$design_info['y'];
                    $img_url = $design_info['img_url'];
                    $img_content = file_get_contents($img_url);
                    //echo $img_content;
                    $img_content = "data:image/png;base64,".base64_encode($img_content);
                    $svg_content = "<svg x='".($x/2)."' y='".($y/2)."'".substr($_svg_content,4);
                    $tpl_content = '<svg height="500" width="500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="overflow: hidden; position: relative;" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet"><image x="0" y="0" width="500" height="500" preserveAspectRatio="none" xlink:href="' . $img_content . '" transform="matrix(1,0,0,1,0,0)"></image>'.$svg_content.'</svg>';
                    $name = "{$env}activity/pic/{$id}/{$product_id}/{$side}";
                    //continue;
                    Model_Aliyun_Oss::upload_content($tpl_content,$name.".svg");
                    //var_dump($rest);exit;
                    $svg_url = "http://cdn.open.easytee.me/".$name.".svg";
                    $img_url = @file_get_contents("http://2.dev.jzw.la/api?model=tools/svg/convert&action=png&svg_url=".urlencode($svg_url));
                    if(empty($img_url)) $img_url = null;
                    $_act_product_designs[] = array(
                        "activity_id"=>$id,
                        "product_id"=>$product_id,
                        "side"=>$side,
                        "img_url"=>$img_url,
                        "svg_url"=>$svg_url,
                        "add_time"=>date("Y-m-d H:i:s"),
                    );
                    //echo $url.PHP_EOL;
                }
            }
            if($_act_product_designs){
                self::_db()->insert("et_activity_product",$_act_product_designs);
            }

        }
        $act_designs = array();
        foreach($_act_product_designs as $_act_product_design){
            $act_designs[$_act_product_design['product_id']][$_act_product_design['side']] = array(
                "img_url"=>$_act_product_design['img_url'],
                "svg_url"=>$_act_product_design['svg_url'],
            );
        }

        //var_dump($act_designs);exit;
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
    function action_info(){
        echo '{"name":null,"description":null,"deadline":"7","deliveryType":"custom","addressId":"0","target":"50","notes":null,"freePostage":"0","products":[{"id":"2","name":"圆领男款","product_styles":[{"id":"18","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"浅粉色","html_color":"DEB7CA","unit_price":"20.00"},{"id":"19","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"杜鹃花色","html_color":"EB67B9","unit_price":"20.00"},{"id":"20","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"海利康花色","html_color":"E21776","unit_price":"20.00"},{"id":"21","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"栗色","html_color":"582D40","unit_price":"20.00"},{"id":"22","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"红色","html_color":"B7312C","unit_price":"20.00"},{"id":"23","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"橙色","html_color":"DD4814","unit_price":"20.00"},{"id":"24","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"金色","html_color":"FFB612","unit_price":"20.00"},{"id":"25","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"雏菊色","html_color":"FCD450","unit_price":"20.00"},{"id":"26","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"浅绿色","html_color":"76D750","unit_price":"20.00"},{"id":"27","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"军绿色","html_color":"6D6F64","unit_price":"20.00"},{"id":"28","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"爱尔兰绿","html_color":"00985F","unit_price":"20.00"},{"id":"29","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"麻灰爱尔兰绿","html_color":"00966C","unit_price":"20.00"},{"id":"30","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"森林绿","html_color":"203731","unit_price":"20.00"},{"id":"31","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"藏青色","html_color":"21314D","unit_price":"20.00"},{"id":"32","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"宝蓝色","html_color":"1D4F91","unit_price":"20.00"},{"id":"33","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"宝石蓝","html_color":"0073B0","unit_price":"20.00"},{"id":"34","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"卡罗莱纳蓝","html_color":"6F9AD3","unit_price":"20.00"},{"id":"35","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"浅蓝色","html_color":"A4B3C9","unit_price":"20.00"},{"id":"36","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"紫色","html_color":"412D5D","unit_price":"20.00"},{"id":"37","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"麻灰紫","html_color":"614D7D","unit_price":"20.00"},{"id":"38","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"深巧克力色","html_color":"443135","unit_price":"20.00"},{"id":"39","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"栗黄色","html_color":"866761","unit_price":"20.00"},{"id":"40","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"沙色","html_color":"CAC0B6","unit_price":"20.00"},{"id":"41","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"白色","html_color":"ffffff","unit_price":"20.00"},{"id":"42","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"RS运动灰色","html_color":"88898b","unit_price":"20.00"},{"id":"43","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"炭色","html_color":"4e4f53","unit_price":"20.00"},{"id":"44","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"深麻灰色","html_color":"404545","unit_price":"20.00"},{"id":"45","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"黑色","html_color":"000000","unit_price":"20.00"}],"product_selected_styles":[{"id":"18","image":"http:\/\/cdn.open.easytee.me\/\/products\/2\/front.png","color":"浅粉色","html_color":"DEB7CA","unit_price":"20.00"}],"price":47,"manufacturer_name":"Gildan"}]}';
        exit;
    }
    function action_save(){
        PtApp::session_start();
        $_SESSION['act_request'] = $_REQUEST;
        return array();
    }
    function action_save_info(){
        PtApp::session_start();
        $request = $_SESSION['act_request'];
        $designId = $request["designId"];
        $type = $request["type"];
        $target = $request["target"];
        $products = $request["products"];
        $name = self::_request('name');
        $description = self::_request('description');
        $deadline = self::_request('deadline');
        $deliveryType = self::_request('deliveryType');
        $addressId = self::_request('addressId');
        $uid = 0;
        switch ($deadline) {
            case 1:
                $end_time = date('Y-m-d H:i:s', strtotime('+1 day'));
                break;
            case 5:
                $end_time = date('Y-m-d H:i:s', strtotime('+5 day'));
                break;
            case 3:
                $end_time = date('Y-m-d H:i:s', strtotime('+3 day'));
                break;
            case 7:
                $end_time = date('Y-m-d H:i:s', strtotime('+7 day'));
                break;
            case 15:
                $end_time = date('Y-m-d H:i:s', strtotime('+15 day'));
                break;
            case 30:
                $end_time = date('Y-m-d H:i:s', strtotime('+1 month'));
                break;
            case 90:
                $end_time = date('Y-m-d H:i:s', strtotime('+3 month'));
                break;
            default:
                $end_time = date('Y-m-d H:i:s', strtotime('+7 day'));
        }
        $start_time =  date('Y-m-d H:i:s');
        $real_end_time = $end_time;

        $id = self::_db(NEW_DB)->insert("activity",array(
            "uid"=>$uid,
            "name"=>$name,
            "sale_target"=>$target,
            "start_time"=>$start_time,
            "end_time"=>$end_time,
            "real_end_time"=>$real_end_time,
            "desc"=>mb_substr($description, 0, 200),
            "content"=>$description,
            "verify"=>0,
            "status"=>1,
            "period"=>$deadline
        ));
        $style_ids = array();
        foreach($products as $product){
            $pro_id = $product['id'];
            $pro_price = $product['price'];
            $styles = $product['styles'];
            foreach($styles as $style){
                $style_id = $style['id'];
                $style_ids[] = $style_id;
            }
        }
        $pro_styles = self::_db(NEW_DB)->select_rows("select * from pro_style where id in ('".implode("','",$style_ids)."')");
        $act_pro_styles = array();
        foreach($pro_styles as $pro_style){
            $act_pro_styles[] = array(
                "act_id"=>$id,
                "pro_id"=>$pro_style['pro_id'],
                "color"=>$pro_style['color'],
                "color_name"=>$pro_style['color_name'],
                "sale_price"=>$pro_style['sale_price'],
            );
        }
        self::_db(NEW_DB)->insert("act_product",$act_pro_styles);
        $url = "/activity?id=".$id;
        return array("url"=>$url);
    }
    static function get_product_styles($id){
        $styles = self::_db(NEW_DB)->select_rows("select ap.*,ps.id as style_id from act_product as ap left join pro_style as ps on ps.color = ap.color and ap.pro_id = ps.pro_id where ap.act_id = ?",$id);
        //print_pre($styles);
        $pro_ids = array();
        $style_ids = array();
        foreach($styles as $style){
            $pro_ids[] = $style['pro_id'];
            $style_ids[] = $style['style_id'];
        }

        $pro_ids = array_unique($pro_ids);
        $product_sizes = $sizes = $images = $products = array();
        if($style_ids){
            $sizes = self::_db(NEW_DB)->select_rows("select ps.id,pss.size from pro_style_size as pss left join pro_style as ps on ps.color = pss.color and pss.pro_id = ps.pro_id where ps.id in (".implode(",",$style_ids).")");

            $images = self::_db(NEW_DB)->select_rows("select i.pro_id,i.side,i.img_url,a.left,a.top,a.width,a.height from pro_img as i left join pro_design_area as a on a.pro_id = i.pro_id and i.side = a.side where i.pro_id in (".implode(",",$pro_ids).")");
            $products = self::_db(NEW_DB)->select_rows("select p.*, c.name as cat_name,mb.name as brand_name,m.name as manufacturer_name
          from product as p
          left join man_brand as mb on mb.id = p.brand_id
          left join manufacturer as m on m.id = mb.man_id
          left join pro_cat_rel as rel on rel.pro_id = p.id
          left join pro_cat as c on c.id = rel.cat_id
          where p.id in (".implode(",",$pro_ids).")");
            $product_sizes = self::_db(NEW_DB)->select_rows("select * from product_sizes where product_id in (".implode(",",$pro_ids).")");
        }
        //print_pre($products);
        return array(
            "styles"=>$styles,
            "sizes"=>$sizes,
            "pro_ids"=>$pro_ids,
            "style_ids"=>$style_ids,
            "images"=>$images,
            "products"=>$products,
            "product_sizes"=>$product_sizes
        );
    }
    static function get_detail(){

        $id = self::_request("id");
        $activity = self::_db(NEW_DB)->select_row("select *,s.sale_count from activity as a left join act_sale as s on s.act_id = a.id where id = ?",$id);
        return $activity;
    }
    static function get_act_svg_content($act_id){

        $act = self::_db()->select_row("select a.name,a.id,a.design_id,region.region,a.default_product_style_id,image.imgurl,ps.color,ps.color_name,d.svg_front,d.svg_front_image
    from activities as a
    left join design_svgs as d on d.design_id = a.design_id
left join app_product_styles as aps on aps.id = a.default_product_style_id
left join product_styles as ps on ps.id = aps.product_style_id
left join product_style_images as image on image.side = 'front' and image.product_style_id = aps.product_style_id
left join product_style_image_regions as region on  region.product_style_image_id = image.id
where a.default_product_style_id is not null and a.thumb is null and a.uid <> 0 and d.svg_front is not null order by a.id asc
",$act_id);
        $act['imgurl'] = replace_cdn($act['imgurl']);
        if(!$act['svg_front_image']){
            $act['svg_front_image'] = Model_Aliyun_Oss::upload_content($act['svg_front'],"design/svg/".$act['design_id']."/front.svg");
            self::_db()->update("design_svgs",array("svg_front_image"=>$act['svg_front_image']),array("design_id"=>$act['design_id']));
        }
        return $act;

    }
}
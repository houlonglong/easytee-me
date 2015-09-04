<?php
/**
 * 活动
 */
class Model_Activity extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
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

}
<?php
/**
 * 活动
 */
class Model_Activity extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }

    /**
     * 活动详情
     * @param $id
     * @param string $app_id
     * @return array
     * @throws Exception
     */
    static function detail_info($id,$app_id = ''){
        $where = "where et_activity_info.id = ?";
        $args[] = $id;
        if($app_id){
            $where .= " and app.app_id = ?";
            $args[] = $app_id;
        }
        $act = self::_db()->select_row("select et_activity_info.id,
                  uid,
                  name,content,sale_target,sale_count,sale_total,sale_profit,
                  period,start_time,end_time,verify,status,production_status,ship_status,
                  colors,default_side,default_style_id,design_id,
                  thumb_img_url,thumb_svg_url,app.app_uid
                  from et_activity_info
                  left join et_app_activity as app on app.id = et_activity_info.id
                  $where ",$args);

        if(!$act) throw new Exception("没有找到活动");
        if($app_id){
            unset($act['uid']);
            $act['uid'] = $act['app_uid'];
            unset($act['app_uid']);
        }
        //var_dump($act);exit;
        $default_style['thumb_img_url'] =  $act['thumb_img_url'];
        $default_style['thumb_svg_url'] =  $act['thumb_svg_url'];
        $default_style['side']  =  "front";
        $default_style['product_style_id']  =  $act['default_style_id'];

        $default_style_id = $act['default_style_id'];

        $_styles = self::_db()->select_rows("select
                aps.sell_price,aps.product_id,aps.product_style_id,
                s.color_name,s.color
                from activity_product_styles as aps
                left join et_product_style as s on s.id = aps.product_style_id
                where activity_id = ? order by aps.id asc",$id);
        //return $_styles;
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
            if($style["product_style_id"] == $default_style_id){
                $default_style['color'] = $style['color'];
                $default_style['color_name'] = $style['color_name'];
                $default_style['sell_price'] = $style['sell_price'];
                $default_style['product_style_id'] = $style['product_style_id'];
                $default_style['product_id'] = $style['product_id'];
            }
            $styles[$style['product_id']]["style_".$style["product_style_id"]] = $style;
        }
        $inventorys = self::_db()->select_rows("select * from et_product_inventory where style_id in (".implode(",",$product_style_ids).")");
        $sizes = array();
        foreach($inventorys as $inventory){
            $sizes[$inventory['product_id']][$inventory['style_id']][] = $inventory;
        }
        $_act_product_designs = self::_db()->select_rows("select * from et_activity_product where activity_id = ?",$id);
        $act_designs = array();
        foreach($_act_product_designs as $_act_product_design){
            $act_designs[$_act_product_design['product_id']][$_act_product_design['side']] = array(
                "img_url"=>$_act_product_design['img_url'],
                "svg_url"=>$_act_product_design['svg_url'],
            );
        }

        return array(
            "activity"=>$act,
            "products"=>$products,
            "product_designs"=>$product_designs,
            "act_designs"=>$act_designs,
            "styles"=>$styles,
            "sizes"=>$sizes,
            "sides"=>array(
                "front","back","third","fourth"
            ),
            "default_style"=>$default_style
        );
    }

    function action_detail($id){
        echo file_get_contents("http://11.dev.jzw.la/activity/get_detail?id=2595");exit;
    }
    /**
     * 活动列表
     */
    static function get_list($verify = '',$uid = '',$activity_id = '',$activity_name = '',$status = '',$limit = 20,$page = 1,$sort = "a.id",$sort_type = "desc")
    {
        $select_fields = " a.id,a.uid,a.name,a.start_time,a.end_time,
            a.period,a.status,a.verify,a.sale_target,a.sale_count,a.sale_profit,a.thumb_img_url
        ";
        $table = "et_activity_info";
        $join = ' left join et_user as u on u.id = a.uid ';

        //where
        $where = " where 1=1 ";
        $args =array();

        if($uid){
            $where .= 'and a.uid = ? ';
            $args[] = $uid;
        }

        if ($verify === "0" || $verify > 0) {
            $where .= 'and a.verify = ? ';
            $args[] = $verify;
        }

        if ($status === "0" || $status > 0) {
            if($status == 1){//进行中
                $where .= 'and a.start_time < now() and now() < a.end_time and a.status = 1';
            }
            if($status == 10){//结束
                $where .= 'and now() > a.end_time and a.status > 0';
            }

            if($status == 2){//失败的
                $where = 'and a.status = 2 ';
            }
            if($status == 3){//成功的
                $where = 'and a.status = 3 ';
            }
        }

        if ($activity_id) {
            $where .= " and a.id = ? ";
            $args[] = $activity_id;
        }
        if ($activity_name) {
            $where .= " and a.name like '%" . mysql_escape($activity_name) . "%' ";
        }
        //order
        $order = "order by " . addslashes($sort) . " " . $sort_type;
        $sql = "select count(a.id) as total from $table as a $join $where ";
        $count_res = self::_db()->select_row($sql, $args);
        $records = $count_res['total'];

        if ($records > 0) {
            $total_pages = ceil($records / $limit);
        } else {
            $total_pages = 1;
        }
        if ($page > $total_pages) $page = $total_pages;
        $params = array(
            'total_rows'=>$records, #(必须)
            'list_rows'=>$limit,
            'now_page'  =>$page,  #(必须),
            'base_url' => ""
        );
        $pager = new PtPager($params);
        $skip = ($page - 1) * $limit;
        $sql = "select $select_fields from $table as a $join $where $order limit $skip,$limit ";
        $rows = self::_db()->select_rows($sql, $args);
        $response['rows'] = $rows;
        $response['pager'] = $pager;
        return $response;
    }
}
<?php
/**
 * 订单
 */
class Model_Order extends BaseModel {
    static $table = "order";
    function __construct(){

    }
    /**
     * 订单列表
     */
    static function get_list($uid = '',$order_no = '',$status = '',$pay_status = '',$ship_status = '',$start_time = '',$end_time='',$ship_status = '',$limit = 20,$page = 1,$sort = "ord.id",$sort_type = "desc")
    {
        $select_fields = " act.activity_id,act_info.thumb_img_url,act_info.end_time,act_info.`status` AS activity_status,pay.*,ship.*,ord.*";
        $table = "et_order AS ord";
        $join = ' LEFT JOIN et_order_activity AS act ON act.order_id = ord.id
                 LEFT JOIN et_order_pay AS pay ON pay.order_id = ord.id
                 LEFT JOIN et_order_ship AS ship ON ship.order_id = ord.id
                 LEFT JOIN et_activity_info AS act_info ON act_info.id = act.activity_id';

        //where
        $where = " WHERE 1=1 ";
        $args =array();

        if($uid){
            $where .= 'AND ord.uid = ? ';
            $args[] = $uid;
        }
        if($order_no){
            $where .= 'AND ord.order_no = ? ';
            $args[] = $order_no;
        }
        if($status != ''){
            $where .= 'AND ord.status = ? ';
            $args[] = $status;
        }
        if($pay_status != ''){
            $where .= 'AND pay.pay_status = ? ';
            $args[] = $pay_status;
        }
        if($ship_status != ''){
            $where .= 'AND ship.$ship_status = ? ';
            $args[] = $status;
        }
        if($start_time){
            $start_time = $start_time." 00:00:00";
            $where .= 'AND ord.add_time > ? ';
            $args[] = $start_time;
        }
        if($end_time){
            $end_time = $end_time." 23:59:59";
            $where .= 'AND ord.add_time < ? ';
            $args[] = $end_time;
        }
        //order
        $order = "ORDER BY " . addslashes($sort) . " " . $sort_type;
        $sql = "SELECT COUNT(ord.id) AS total FROM $table $join $where ";
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
        $sql = "SELECT $select_fields FROM $table $join $where $order LIMIT $skip,$limit ";
        $rows = self::_db()->select_rows($sql, $args);
        $response['rows'] = $rows;
        $response['pager'] = $pager;
        return $response;
    }

    /**
     * 订单详情
     */
    static function detail_info_with_goods($order_no = ''){
        $order = self::_db()->select_row('
            SELECT act.activity_id,a.end_time,a.thumb_img_url,a.`status` AS activity_status,pay.*,ship.*,o.*
             FROM et_order AS o
             LEFT JOIN et_order_activity as act on act.order_id = o.id
             LEFT JOIN et_order_pay as pay on pay.order_id = o.id
             LEFT JOIN et_order_ship as ship on ship.order_id = o.id
             LEFT JOIN et_activity_info AS a ON a.id = act.activity_id
             where o.order_no = ? ',$order_no);
        if(!$order) throw new Exception("没有找到订单");
        $goods = self::_db()->select_rows('
              SELECT g.*,brand.name as brand_name,style.color,style.color_name,p.name as product_name,ap.img_url FROM et_order_goods as g
            left join et_product_style as style on style.id = g.style_id
            left join et_activity_product as ap on ap.activity_id = g.activity_id and style.product_id=ap.product_id
            left join et_product as p on p.id = style.product_id
            left join et_product_brand as brand on brand.id = p.brand_id
            WHERE g.order_id = ? and ap.side ="front" ',$order['id']);
        return array(
            "order"=>$order,
            "goods"=>$goods,
        );
    }
    static function gen_order_no(){
        return date('ymdHis') . sprintf('%03d', floor(microtime() * 1000)) . mt_rand(10, 99);
    }
    static function get_save_goods($activity_id,$goods){
        $rows = array();
        $styles = array();
        $_goods = array();
        foreach($goods as $g){
            $styles[] = $g['style_id'];
            $_goods[$g['style_id']] = $g;
        }
        $styles = array_unique($styles);
        $style_rows = self::_db()->select_rows("select aps.*,style.selling_price from activity_product_styles as aps left join et_product_style as style on style.id = aps.product_style_id where style.id in (".implode(",",$styles).") and aps.activity_id = ?",$activity_id);
        if(!$style_rows) throw new Exception("款式不存在");
        $quantity = 0;
        $goods_price = 0;
        $body = "";
        foreach($style_rows as $style_row){
            $g = $_goods[$style_row['product_style_id']];
            if(!$g) continue;
            $quantity += intval($g['quantity']);
            $goods_price += $style_row['sell_price'];

            $body = $g['pro_size'].'*'.$g['quantity']." ";
            $rows[] = array(
                "activity_id" => $activity_id,
                "style_id"    => $g['style_id'],
                "pro_size"    => $g['pro_size'],
                "quantity"    => $g['quantity'],
                "cost_price"  => $style_row['selling_price'],
                "sell_price"  => $style_row['sell_price']
            );
        }
        return array(
            "quantity"=>$quantity,
            "order_body"=>$body,
            "goods_price"=>$goods_price,
            "goods"=>$rows
        );
    }

    static function save_ship($order_id,$exp_price,$exp_com,$name,$tel,$province,$city,$county,$addr){
        self::_db()->insert("et_order_ship",array(
            "order_id"=>$order_id,
            "exp_com"=>$exp_com,
            "exp_price"=>$exp_price,
            "name"=>$name,
            "tel"=>$tel,
            "province"=>$province,
            "city"=>$city,
            "county"=>$county,
            "addr"=>$addr,
        ));
    }
    static function save_pay($order_id,$pay_type,$pay_price,$balance_tx = 0,$balance_ntx = 0){
        self::_db()->insert("et_order_pay",array(
            "order_id"=>$order_id,
            "pay_type"=>$pay_type,
            "pay_price"=>$pay_price,
            "balance_tx"=>$balance_tx,
            "balance_ntx"=>$balance_ntx,
        ));
    }
    static function save_goods($order_id,$goods){
        foreach($goods as &$g){
            $g['order_id'] = $order_id;
        }
        self::_db()->insert("et_order_goods",$goods);
    }

    /**
     * 保存订单
     */
    static function save($uid,$activity_id,$goods_price,$exp_price,$quantity,$subject,$body,$notes){
        $order_no = self::gen_order_no();
        //todo consider order_no nt unique
        $row = array(
            'uid'=>$uid,
            'order_no'=>$order_no,
            'goods_price'=>$goods_price,
            'exp_price'=>$exp_price,
            'quantity'=>$quantity,
            'subject'=>$subject,
            'body'=>$body,
            'notes'=>$notes,
            'add_time'=>date_time_now(),
        );
        $order_id = self::_db()->insert("et_order",$row);
        self::bind_activity($order_id,$activity_id);
        $row['order_id'] = $order_id;
        $row['order_no'] = $order_no;
        return $row;
    }
    static function bind_activity($order_id,$activity_id){
        self::_db()->insert("et_order_activity",array(
            "order_id"=>$order_id,
            "activity_id"=>$activity_id,
        ));
    }
    static function get_order_info_by_id($id){
        return self::_db()->select_row("
              select pay.*,ship.*,o.*,ac.activity_id
              from `et_order` as o
              left join et_order_pay as pay on pay.order_id = o.id
              left join et_order_ship as ship on ship.order_id = o.id
              left join et_order_activity as ac on ac.order_id = o.id
              where o.id = ?
              ",$id);
    }
    static function get_order_info_by_order_no($order_no){
        return self::_db()->select_row("
              select pay.*,ship.*,o.*,ac.activity_id
              from `et_order` as o
              left join et_order_pay as pay on pay.order_id = o.id
              left join et_order_ship as ship on ship.order_id = o.id
              left join et_order_activity as ac on ac.order_id = o.id
              where o.order_no = ?
              ",$order_no);
    }

    static function get_order_status_by_id($id){
        return self::_db()->select_row("
              select o.status,pay.pay_status,ship.ship_status
              from `et_order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              where o.id = ?
              ",$id);
    }

    static function get_order_status_by_order_no($order_no){
        return self::_db()->select_row("
              select o.status,pay.pay_status,ship.ship_status
              from `et_order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              where o.order_no = ?
              ",$order_no);
    }
}
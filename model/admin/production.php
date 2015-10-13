<?php
/**
 * 生产管理
 */
class Model_Admin_Production extends Model_Admin_Abstract{
    static $table = "et_activity_produce";
    static $production_status = array(
        0=>"未生产",
        1=>"生产中",
        2=>"生产完成",
    );
    static $operator = array(
        1=>"洪波",
        2=>"徐萍",
    );
    static $ship_status = array(
        0=>"未发货",
        1=>"已发货",
    );
    function __construct(){
        parent::__construct();
    }
    function action_do_ship_order($order_id,$exp_no){
        self::_db()->update("et_order_ship",array(
            "exp_no"=>$exp_no,
            "ship_status"=>1,
            "ship_time"=>date_time_now(),
        ),array(
            "order_id"=>$order_id
        ));
        return "ok";
    }
    function action_finish_ship($id){
        self::_db()->update("et_activity_info",array(
            "ship_status"=>1,
            "ship_time"=>date_time_now(),
        ),array(
            "id"=>$id
        ));
    }
    function action_change_man($id,$manufacturer_id){
        self::_db()->update("et_activity_produce",array(
            "man_id"=>$manufacturer_id,
        ),array(
            "id"=>$id
        ));
    }
    function action_finish_product($id){
        self::_db()->update("et_activity_info",array(
            "production_status"=>2,
        ),array(
            "id"=>$id
        ));
        self::_db()->update("et_activity_produce",array(
            "finish_time"=>date_time_now(),
        ),array(
            "id"=>$id
        ));
    }

    /**
     * 列表
     **/
    function action_list(){
        $table = "et_activity_info as a";
        $join = ' left join et_activity_produce as p on a.id = p.id';
        $request = PtLib\http_request("rows","page","sidx","sord","ship_status","production_status","activity_name","activity_id");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " p.*,a.production_status,a.ship_status,a.status,a.verify,a.id,a.name,a.uid,a.sale_count,a.sale_target,a.sale_total,a.start_time,a.sale_profit,a.end_time,a.period,a.thumb_svg_url,a.thumb_img_url,date_add(a.end_time, interval 7 day) as give_time";

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)){
            $sort = "id";
            $sort_type = "desc";
        }else{
            if(empty($sort_type)) $sort_type = "desc";
        }
        //where
        $args = array();
        //达到最低销量 或者成功的
        $where  = " where 1=1 ";

        if($request['activity_name']){
            $where .=' and a.name= ? ';
            $args[] = $request['activity_name'];
        }

        if(!empty($request['activity_id'])){
            $where .=' and a.id= ? ';
            $args[] = $request['activity_id'];
        }
        if($request['production_status'] === "0" || $request['production_status']){

            if($request['production_status'] === "01" || $request['production_status'] === '02'){//待生产
                if($request['production_status'] === "01"){
                    //进行中 完成最低销量
                    $where .=' and a.sale_profit > 0 and a.status = 1 and a.production_status = 0';
                }else{ //成功的
                    $where .=' and a.status = 3 and a.production_status = 0';
                }
            }else{

                $where .=' and a.production_status= ? and (a.sale_profit > 0 or a.status = 3)';
                $args[] = $request['production_status'];

                if($request['production_status']== 2 && ($request['ship_status'] === '0' || $request['ship_status'])){//发货状态
                    $where .=' and a.ship_status= ? ';
                    $args[] = $request['ship_status'];
                }
            }
        }else{//全部生产
            $where .=' and (a.sale_profit > 0 or a.status = 3) ';
        }

        //order
        $order = "";
        if($sort)
            $order = "order by p." .addslashes($sort) ." ".$sort_type;
        $sql = "select count(a.id) as total from $table $join $where ";
//        $count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql,$args);
        $records = $count_res['total'];
        $response = new stdClass();
        $response->page    = $page;  //cur page

        if( $records > 0 ) {
            $total_pages = ceil($records/$limit);
        }
        else {
            $total_pages = 1;
        }
        if ($page > $total_pages) $page=$total_pages;

        $response->total   = $total_pages;      //total pages
        $response->records = $records; //count

        $skip = ($page - 1) * $limit;

        $sql = "select $select_fields from $table  $join $where $order limit $skip,$limit ";
        $rows = PtLib\db()->select_rows($sql,$args);
        foreach($rows as $row){
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }
    function view_detail($id){
        $info = Model_Activity::detail_info($id);

        foreach($info['styles'] as $product_id => $styles){
            foreach($styles as $style_key =>$style){
                $style_id = $style['product_style_id'];
                $info["styles"][$product_id][$style_key]["sizes"] = self::_db()->select_rows("select
                        goods.pro_size,sum(goods.quantity) as quantity,brand.name as brand_name ,product.name as product_name
                        from et_order_goods as goods
                        left join et_product_style as style on style.id = goods.style_id
                        left join et_product as product on product.id = style.product_id
                        left join et_product_brand as brand on brand.id = product.brand_id
                        where goods.activity_id = ? and goods.style_id = ?  group by goods.pro_size ",$id,$style_id);
            }
        }

        $manufacturers = self::_db()->select_rows("select * from et_product_manufacturer");

        $produce = self::_db()->select_row("select
              produce.*,m.name as m_name
              from et_activity_produce as produce
              left join et_product_manufacturer as m on m.id = produce.man_id
              where produce.id = ?",$id);
        $res = array(
            "produce"=>$produce,
            "info"=>$info,
            "manufacturers"=>$manufacturers,
        );
        //print_r($res);exit;
        return $res;
    }
    function action_do_confirm($activity_id,$craft,$manufacturer_id,$operator_id){
        $produce = self::_db()->select_row("select * from et_activity_produce where id = ?",$activity_id);
        $res = self::_db()->select_row('select count(ord.order_id) as count from et_order_activity as ord left join et_order_pay as pay on pay.order_id = ord.order_id where pay.pay_status = 1 and ord.activity_id = ?',$activity_id);

        self::_db()->update("et_activity_info",array(
            "production_status"=>1,
        ),array("id"=>$activity_id));
        if($produce){
            self::_db()->update("et_activity_produce",array(
                "craft"=>$craft,
                "man_id"=>$manufacturer_id,
                "operator_id"=>$operator_id,
                "create_time"=>date('Y-m-d H:i:s'),
                "order_count"=>$res['count']
            ),array(
                "id"=>$activity_id,
            ));
        }else{
            self::_db()->insert("et_activity_produce",array(
                "id"=>$activity_id,
                "craft"=>$craft,
                "man_id"=>$manufacturer_id,
                "operator_id"=>$operator_id,
                "create_time"=>date('Y-m-d H:i:s'),
                "order_count"=>$res['count']
            ));
        }

        return array("ok");

    }

}
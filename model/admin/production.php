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
    function action_change_man(){
        $id = $this->_request("id");
        $manufacturer_id = $this->_request("manufacturer_id");
        self::_db()->update("activity_produces",array(
            "manufacturer_id"=>$manufacturer_id,
        ),array(
            "activity_id"=>$id
        ));
    }
    function action_finish_product(){
        $id = $this->_request("id");
        $zj_status  = $this->_request("zj_status");
        $zj_opinion = $this->_request("zj_opinion");
        self::_db()->update("activity_produces",array(
            "status"=>"待发货",
            "zj_status"=>$zj_status,
            "zj_opinion"=>$zj_opinion,
        ),array(
            "activity_id"=>$id
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
                    $where .=' and a.sale_count >= 10 and a.status = 1 and a.production_status = 0';
                }else{ //成功的
                    $where .=' and a.status = 3 and a.production_status = 0';
                }
            }else{ //已生产

                $where .=' and a.production_status= ? and (a.sale_count >= 10 or a.status = 3)';
                $args[] = $request['production_status'];

                if($request['production_status']== 2 && ($request['ship_status'] === '0' || $request['ship_status'])){//发货状态
                    $where .=' and a.ship_status= ? ';
                    $args[] = $request['ship_status'];
                }
            }
        }else{//全部生产
            $where .=' and (a.sale_count >= 10 or a.status = 3) ';
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

}
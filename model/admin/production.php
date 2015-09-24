<?php
/**
 * 生产管理
 */
class Model_Admin_Production extends Model_Admin_Abstract{
    static $table = "et_activity_produce";
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
     * 详情视图
     *
    function view_detail(){
    $request = PtLib\http_request("id");
    return self::detail($request['id']);
    }
     */

    /**
     * 列表
     **/
    function action_list(){

        return self::table_list();

    }


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
    **/
    static function table_list(){
        $table = "et_activity_info as a";
        $join = ' left join et_activity_produce as p on a.id = p.id';
        $request = PtLib\http_request("rows","page","sidx","sord","ship_status","production_status","activity_name","activity_id");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " p.*,a.*,date_add(a.end_time, interval 7 day) as give_time";

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
//            $profie = Model_Cost::calculate_profie($row['id']);
//            if($status == 'index'){
//                if($profie<=0 ){
//                    continue;
//                }
//            }
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }

    static function table_list_product(){
        $table_alias = $table = "activities";
        //$table_alias = '';
        $join = ' inner join users as u on u.id = activities.uid left join activity_produces as ap on ap.activity_id = activities.id';
        if(empty($table_alias)) throw new ErrorException("table is not defined");
//        $request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord","status","activity_name","activity_id","mobile","username");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " $table_alias.*,u.nick_name ,ap.status as product_status";

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
        $where  = " where 1=1 ";
        $status = $request['status'];
        if($status == 'index'){//侍生产
//            $where .='and activities.sales_count >= 10 and activities.real_end_time > ? and ap.status is null';
            $where .='and activities.sales_count >= 10  and ap.status is null';
//            $args[] = date('Y-m-d H:i:s');
        }
        if($status == 'producting'){
            $where .='and ap.status = "生产中" ';
        }
        if($status == 'producted'){
            $where .='and ap.status= "待发货" ';
        }
        if($status == 'shipped'){
            $where .='and ap.status= "已发货" ';
        }
        if($request['mobile']){
            $where .=' and u.mobile= ? ';
            $args[] = $request['mobile'];
        }
        if($request['username']){
            $where .=' and u.nick_name= ? ';
            $args[] = $request['username'];
        }
        if($request['activity_name']){
            $where .=' and '.$table_alias.'.name= ? ';
            $args[] = $request['activity_name'];
        }
        if($request['activity_id']){
            $where .=' and '.$table_alias.'.id= ? ';
            $args[] = $request['activity_id'];
        }
        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table $join $where ";
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

        $sql = "select $select_fields from $table $join $where $order limit $skip,$limit ";
//        $rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql,$args);
        foreach($rows as $row){
            $profie = Model_Cost::calculate_profie($row['id']);
            if($status == 'index'){
                if($profie<=0 && $row['status']!='fabrication'){
                    continue;
                }
            }
            $row['profie'] = $profie;
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }

    function action_address_list(){
        $id  = $_REQUEST['id'];
        $rows = PtLib\db()->select_rows('SELECT addr.* FROM user_addresses AS addr
            INNER JOIN orders AS o ON o.uid = addr.uid
            INNER JOIN activities AS a ON a.id = o.activity_id
            WHERE a.id = ?',$id);


        $request = PtLib\http_request("rows","page","sidx","sord");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];


        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)){
            $sort = "addr.id";
            $sort_type = "desc";
        }else{
            if(empty($sort_type)) $sort_type = "desc";
        }


        if($sort)
        $order = "order by " .addslashes($sort) ." ".$sort_type;
        $sql = "SELECT count(addr.id) AS total FROM user_addresses AS addr
            INNER JOIN orders AS o ON o.uid = addr.uid
            INNER JOIN activities AS a ON a.id = o.activity_id
            WHERE a.id = ? ".$order;
        $count_res = PtLib\db()->select_row($sql,$id);
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

        $sql = "SELECT addr.* FROM user_addresses AS addr
            INNER JOIN orders AS o ON o.uid = addr.uid
            INNER JOIN activities AS a ON a.id = o.activity_id
            WHERE a.id = ? limit $skip,$limit ";
        $rows = PtLib\db()->select_rows($sql,$id);
        foreach($rows as $row){
            $row['real_end_time'] = date('Y-m-d H:i:s',strtotime($row['real_end_time'].'+7 day'));
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }

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
<?php
/**
 * 设计
 */
class Model_Admin_Site_Design extends Model_Admin_Abstract{
    static $table = "designs";
    function __construct(){
        parent::__construct();
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
    function view_detail(){
        $request = PtLib\http_request("id");
        $row = self::detail($request['id']);
        $design_svgs = PtLib\db()->select_row("select * from design_svgs where design_id = ?",$request['id']);
        $design_product = PtLib\db()->select_rows("select * from design_product_maps where design_id = ?",$request['id']);
        $canvas = PtLib\db()->select_rows("select * from canvas where design_id = ?",$request['id']);

        $canvas_objects = PtLib\db()->select_rows("select co.*,a.url from canvas_objects as co
              left join canvas as c on c.id = co.canvas_id
              left join arts as a on a.id = co.art_id
              where c.design_id = ?",$request['id']);

        $res = array(
            "design"=>$row,
            "design_product"=>$design_product,
            "canvas"=>$canvas,
            "canvas_objects"=>$canvas_objects,
            "design_svgs"=>$design_svgs,
        );
        //\PtLib\print_json($res);
        return $res;
    }
    /**
     * 详情
     * @param $id
     * @return array
     */
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }


    /**
     * 列表
     */
    function action_list(){
        return self::table_list();
    }


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

    /*
    * 列表
    */
    static function table_list(){
        $table_alias = $table = "design_svg_side";
        $table_alias = 'd';
        $join = ' left join activities as a on a.design_id = d.design_id';
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord","design_id");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " d.* ,a.name as act_name";

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

        if($request['design_id']){
            $where .= " and d.design_id = ? ";
            $args[] = $request['design_id'];
        }
        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count(d.id) as total from $table as d $join $where ";
        //$count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql,$args);
        $records = $count_res['total'];
        $response = new stdClass();
        $response->page    = $page;  //cur page

        if( $records > 0 ) {
            $total_pages = ceil($records/$limit);
        }
        else {
            $total_pages = 0;
        }
        if ($page > $total_pages) $page=$total_pages;

        $response->total   = $total_pages;      //total pages
        $response->records = $records; //count

        $skip = ($page - 1) * $limit;

        $sql = "select $select_fields from $table as d $join $where $order limit $skip,$limit ";
        //$rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql,$args);
        foreach($rows as $row){
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }

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
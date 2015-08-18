<?php
/**
 * 产品款式
 */
class Model_Admin_Product_Style extends Model_Admin_Abstract{
    static $table = "product_style_sizes";
    function __construct(){
        parent::__construct();
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
     */
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
    */
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = " left join product_styles as ps on ps.id = $table_alias.product_style_id";
        //fields
        $select_fields = " $table_alias.*,ps.colors,ps.color_name,ps.purchase_price,ps.selling_price,ps.is_default ";
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord","product_id");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)){
            $sort = "id";
            $sort_type = "desc";
        }else{
            if(empty($sort_type)) $sort_type = "desc";
        }

        //where
        $args = array($request['product_id']);
        $where  = " where ps.product_id = ? ";
        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table as $table_alias $join $where ";
        //$count_res = db()->select_row($sql,$args);
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

        $sql = "select $select_fields from $table as $table_alias $join $where $order limit $skip,$limit ";
        //$rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql,$args);
        foreach($rows as $row){
            $colors = json_decode($row['colors'],true);
            $colors = $colors[0]['name'];
            $row['colors'] = $colors;
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
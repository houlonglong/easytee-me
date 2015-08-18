<?php
use PtLib as PtLib;
/**
 * 众筹管理
 */
class Model_Admin_Activity extends Model_Admin_Abstract{
    static $table = "activities";
    function __construct(){
        parent::__construct();
    }
    /**
     * 详情
     * @return array
     */
    static function activity_detail(){
        $request = PtLib\http_request("id");
        $row = PtLib\db_select_row("select a.*,u.nick_name from ".self::$table." as a inner join users as u on u.id = a.uid where a.id = ?",$_REQUEST['id']);
        return $row;
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

    static function action_detail_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = ' inner join users as u on u.id = '.$table_alias.'.uid  inner join orders as o on o.activity_id = '.$table_alias.'.id'.
                ' inner join order_goods as og on og.order_id = o.id inner join product_styles as ps on ps.id = og.product_style_id '.
                ' inner join products as p on p.id = ps.product_id inner join manufacturer_brands as m on m.id = p.manufacturer_brand_id
                   ';
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord");
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];

        //fields
        $select_fields = " o.*,og.*,m.name as manufacturer_name ";

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)){
            $sort = "id";
            $sort_type = "desc";
        }else{
            if(empty($sort_type)) $sort_type = "desc";
        }
        $where = 'where '.$table_alias.'.id = ?';
        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table $join $where ";
        //$count_res = db()->select_row($sql,$args);
        $count_res = PtLib\db()->select_row($sql,$_REQUEST['id']);
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
        //$rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql,$_REQUEST['id']);
        foreach($rows as $row){
            $response->rows[] = array(
                'id'=>$row['id'],
                "cell"=>$row
            );
        }
        return $response;
    }


    /**
     * 列表
     */
    function action_list(){
        return self::table_list();
    }

    function view_detail(){
        $table = self::$table;
        $request = PtLib\http_request("id");
        $act_id = $request['id'];

        $act_product_styles = PtLib\db_select_rows("select
              aps.*,p.name as p_name,psi.imgurl,psi.side,ps.color_name,ps.colors,psir.region
                      from activity_product_styles as aps
                      left join products as p on p.id = aps.product_id
                      left join product_style_images as psi on psi.product_style_id = aps.product_style_id and psi.product_id = aps.product_id
                      left join product_styles as ps on ps.id = aps.product_style_id
                      left join product_style_image_regions as psir on psi.id = psir.product_style_image_id
                      where aps.activity_id = ?",$act_id);

        //PtLib\print_json($act_product_styles);
        $act = self::detail($act_id);
        $design_id = $act['design_id'];

        $design_svgs = PtLib\db()->select_row("select * from design_svgs where design_id = ?",$design_id);
        $design_product = PtLib\db()->select_rows("select * from design_product_maps where design_id = ?",$design_id);
        $canvas = PtLib\db()->select_rows("select * from canvas where design_id = ?",$design_id);

        $canvas_objects = PtLib\db()->select_rows("select co.*,a.url from canvas_objects as co
              left join canvas as c on c.id = co.canvas_id
              left join arts as a on a.id = co.art_id
              where c.design_id = ?",$design_id);

        $res = array(
            "design_product"=>$design_product,
            "canvas"=>$canvas,
            "canvas_objects"=>$canvas_objects,
            "design_svgs"=>$design_svgs,
            "act_product_styles"=>$act_product_styles,
        );
        return $res;
    }


    /**
     * 修改
     */
    function action_edit(){
        return self::table_edit();
    }


    /*
    * 修改
    */
    static function table_edit(){
        $table = self::$table;
        if(empty($table)) throw new ErrorException("table is not defined");
        $request = PtLib\http_request("oper");
        $oper = $request['oper'];
        $id = empty($_REQUEST['id'])?"":$_REQUEST['id'];
        $condition = array("id"=>$id);
        $data = PtLib\http_request("name",'status','real_end_time','pass');
        $data['real_end_time'] = date('Y-m-d H:i:s',strtotime($data['real_end_time']));
        if($oper == 'edit' && $id && $data){
            PtLib\db()->update($table,$data,$condition);
        }
        if($oper == 'add'){
            PtLib\db()->insert($table,$data);
        }
        if($oper == 'del'&& $id && $data){
            PtLib\db()->delete($table,$condition);
        }
        return array();
    }


    /*
    * 列表
    */
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $join = ' inner join users as u on u.id = '.$table_alias.'.uid ';
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord","activity_id","activity_name","username","mobile",'startDate','endDate','pass');
        $limit = $request['rows'];
        $page = $request['page'];
        $sort = $request['sidx'];
        $sort_type = $request['sord'];
        $username = $request['username'];

        //fields
        $select_fields = " $table_alias.*,u.nick_name ";

        if(empty($limit)) $limit = 20;
        if(empty($page)) $page = 1;
        if(empty($sort)){
            $sort = "id";
            $sort_type = "desc";
        }else{
            if(empty($sort_type)) $sort_type = "desc";
        }
        $where = 'where '.$table_alias.'.status !="create" ';
        //where
        $args = array();
        if($request['mobile']){
            $where = " and u.mobile = ? ";
            $args[] = $request['mobile'];
        }
        if($username){
            $where = " and u.nick_name = ? ";
            $args[] = $username;
        }
        if($request['activity_id']){
            $where .= " and id = ? ";
            $args[] = $request['activity_id'];
        }
        if($request['activity_name']){
            $where .= " and ".$table_alias.".name like '%". mysql_escape($request['activity_name'])."%' ";
        }
        if($request['startDate']){
            $where .= ' and '.$table_alias.'.start_time >="'.date('Y-m-d 00:00:00',strtotime($request['startDate'])).'"';
        }

        if($request['endDate']){
            $where .= ' and '.$table_alias.'.real_end_time <="'.date('Y-m-d 23:59:59',strtotime($request['endDate'])).'"';
        }

        if($request['pass'] !== null){
            if($request['pass'] == 2){
                $join .=' inner join audit_reason as ar on ar.activity_id = '.$table_alias.'.id';
                $select_fields = " DISTINCT $table_alias.*,u.nick_name ";
            }else{
                $where .= ' and '.$table_alias.'.pass =?';
                $args[] = $_REQUEST['pass'];
            }

        }

        //order
        $order = "";
        if($sort)
            $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
        $sql = "select count($table_alias.id) as total from $table $join $where ";
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

        $sql = "select $select_fields from $table $join $where $order limit $skip,$limit ";
        //$rows = db()->select_rows($sql,$args);
        $rows = PtLib\db()->select_rows($sql,$args);
        foreach($rows as $row){
            $profie = Model_Cost::calculate_profie($row['id']);
            if($profie>0){
                $row['activity_status'] = '成功的众筹';
            }else{
                if($row['real_end_time']<=date('Y-m-d H:i:s')){
                    $row['activity_status'] = '失败的众筹';
                }else{
                    if($row['pass'] == 0){
                     $row['activity_status'] = '未审核';
                    }
                }
            }
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

    static function action_downloadexcel(){
        if(isset($_REQUEST['id'])){
            $id = $_REQUEST['id'];
            $table_alias = $table = self::$table;
            //$table_alias = '';
            $join = ' inner join users as u on u.id = '.$table_alias.'.uid  inner join orders as o on o.activity_id = '.$table_alias.'.id'.
                ' inner join order_goods as og on og.order_id = o.id inner join product_styles as ps on ps.id = og.product_style_id '.
                ' inner join products as p on p.id = ps.product_id inner join manufacturer_brands as m on m.id = p.manufacturer_brand_id
                   ';
            if(empty($table_alias)) throw new ErrorException("table is not defined");
            //fields
            $select_fields = " o.*,og.*,m.name as manufacturer_name ";


            $where = 'where '.$table_alias.'.id = ?';

            $sql = "select $select_fields from $table $join $where  ";
            $myval = array();
            $myval[] = "活动ID,订单号,收件人,联系电话,收货地址,订购服装品类,订购服装款式,订购服装性别,订购服装颜色,订购服装尺码,订购服装数量";
            $myval[] = "\r\n";
            $rows = PtLib\db()->select_rows($sql,$_REQUEST['id']);
            foreach($rows as $row){
                $myval[] = "\t".$_REQUEST['id'] . ",";
                $myval[] = "\t".$row['order_no'] . ",";
                $myval[] = "\t".$row['ship_name'] . ",";
                $myval[] = "\t".$row['ship_mobile'] . ",";
                $myval[] = $row['ship_province'].$row['ship_city'].$row['ship_area'].$row['ship_addr'] . ",";
                $myval[] = $row['manufacturer_name'] . ",";
                $myval[] = $row['product_style_name'] . ",";
                $myval[] = $row['product_name'] . ",";
                $myval[] = $row['product_style_name']. ",";
                $myval[] = $row['size'] . ",";
                $myval[] = $row['quantity'] . ",";
                $myval[] = "\r\n";
            }
            $content = iconv("UTF-8", "GBK", implode($myval));
            header("Content-Type: text/html; charset=GBK");
            header( "Pragma: public" );
            header( "Expires: 0" );
            header( 'Content-Encoding: none' );
            header( "Cache-Control: must-revalidate, post-check=0, pre-check=0" );
            header( "Cache-Control: public" );
            header( "Content-type: application/octet-stream\n" );
            header( "Content-Description: File Transfer" );
            header( 'Content-Disposition: attachment; filename=' . $rows[0]['name'].'.csv', $content);
            header( "Content-Transfer-Encoding: binary" );
            header( 'Content-Length: ' . strlen ( $content ) );
            echo $content;
            exit;
        }

    }

    function action_audit(){
        $id = $this->_request('id');
        if($id){
            var_dump(PtLib\db()->update('activities',array('pass'=>1),array('id'=>$id)));
        }
    }

    function action_audit_back(){
        $request = $this->_request('id','reason','notes');
        $id = $this->_request('id');
        if($id){
            $fields['activity_id'] = $id;
            $reason = $this->_request('reason');
            $notes = $this->_request('notes');
            if($reason){
                $fields['reason'] = $reason;
            }
            if($notes){
                $fields['notes'] = $notes;
            }
            $fields['username'] = 1;
            $fields['create_time'] = date('Y-m-d H:i:s');
            self::_db()->insert('audit_reasons',$fields);
        }

    }
}
<?php
/**
 * admin/product/product
 */
class Model_Admin_Product_Product extends Model_Admin_Abstract{
    static $table = "products";
    function __construct(){
        //parent::__construct();
    }
    /**
     * 详情视图
     */
    function view_detail(){
        $id = self::_request("id");
        $product = self::detail($id);

        $_styles = self::_db()->select_rows("select id,purchase_price,selling_price,enable,sequence,colors,color,color_name from product_styles where product_id = ? order by sequence desc",$product['id']);
        $styles = array();
        foreach($_styles as $style){
            if(!$style['color']){
                $colors = json_decode($style['colors'],1);
                $colors = $colors['0']['name'];
                self::_db()->update("product_styles",array("color"=>$colors),array("id"=>$style['id']));
            }
            $styles[] = $style;
        }
        //$product_styles = self::_db()->select_rows("select pss.*,ps.colors,ps.is_default,ps.color_name from product_style_sizes as pss left join product_styles as ps on ps.id = pss.product_style_id where pss.product_id = ?",$product['id']);
        //$product_sizes = self::_db()->select_rows("select * from product_sizes where product_id = ?",$product['id']);
        //var_dump($product_sizes);exit;
        return array("product"=>$product,"styles"=>$styles);
    }
    function action_style_detail(){
        $style_id = self::_request("style_id");
        $sizes = self::_db()->select_rows("select id,size,inventory,increase,enable from product_style_sizes where product_style_id = ?",$style_id);
        $_images = self::_db()->select_rows("select
                    psi.id,psir.x,psir.y,psir.w,psir.h,psi.side,psi.imgurl,psi.sequence,psir.region,psir.is_default
                    from product_style_images as psi
                    left join product_style_image_regions as psir on psir.product_style_image_id = psi.id
                    where psi.product_style_id = ?",$style_id);
        $images = array();
        foreach ($_images as $image) {
            if(!$image["x"]){
                $region = explode(",",$image['region']);
                self::_db()->update("product_style_image_regions",array(
                    "x"=>$region[0],
                    "y"=>$region[1],
                    "w"=>$region[2],
                    "h"=>$region[3],
                ),array(
                    "product_style_image_id"=>$image['id']
                ));
            }
            $image['imgurl'] = replace_cdn($image['imgurl']);
            $images[] = $image;
        }
        return array("sizes"=>$sizes,"images"=>$images);
    }

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
        $table_alias = 'p';
        $join = ' left join manufacturer_brands as mb on mb.id = p.manufacturer_brand_id
        left join manufacturers as  m on m.id = mb.manufacturer_id ';
        //fields
        $select_fields = " p.*,m.name as m_name,mb.name as mb_name ,m.type as m_type ";
        if(empty($table_alias)) throw new ErrorException("table is not defined");
        //$request = http_request("rows","page","sidx","sord");
        $request = PtLib\http_request("rows","page","sidx","sord");
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
        $args = array();
        $where  = " where 1=1 ";
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
     */
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
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
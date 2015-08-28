<?php
/**
 * 待生产
 */
class Model_Admin_Production_Step extends Model_Admin_Abstract{
    static $table = "activities";
    function __construct(){
        //parent::__construct();
    }
    /**
     * 详情视图
     */
    function view_detail(){
        $request = PtLib\http_request("id");

        $_styles = self::_db()->select_rows("select aps.*,ps.*,p.name,mb.name as mb_name from
                                            activity_product_styles as aps
                                            left join product_styles as ps on ps.id = aps.product_style_id
                                            left join products as p on p.id = ps.product_id
                                            left join manufacturer_brands as mb on mb.id = p.manufacturer_brand_id
                                            where aps.activity_id = ?",$request['id']);
        //var_dump($styles);exit;
        $activity = self::detail($request['id']);
        $styles = array();
        foreach($_styles as $style){
            $orders = self::_db()->select_rows("select size,sum(quantity) as quantity from order_goods where activity_id = ? and product_style_id = ?  group by size",$request['id'],$style['product_style_id']);
            $images = self::_db()->select_rows("select psi.*,psir.x,psir.y,psir.w,psir.h  from product_style_images as psi left join product_style_image_regions as psir on psir.product_style_image_id = psi.id where psi.product_style_id = ? ",$style['product_style_id']);
            $style['orders'] = $orders;
            $style['images'] = $images;
            $styles[] = $style;
        }
        $designs = self::_db()->select_rows("select * from design_svg_side where design_id = ? ",$activity['design_id']);
        if(!$designs){
            $sides = array("front","back","third","fourth");
            $svg = self::_db()->select_row("select * from design_svgs where design_id = ? ",$activity['design_id']);
            foreach($sides as $side){
                if(!empty($svg['svg_'.$side.'_image'])){
                    try{
                        self::_db()->insert("design_svg_side",array("design_id"=>$activity['design_id'],"side"=>$side,"svg_url"=>$svg['svg_'.$side.'_image']));
                    }catch (Exception $e){

                    }

                }
            }
            //print_r($svg);exit;
        }
        $manufacturers = self::_db()->select_rows("select * from manufacturers");
        $produce = self::_db()->select_row("select ap.*,m.name as m_name from activity_produces as ap left join manufacturers as m on m.id = ap.manufacturer_id where ap.activity_id = ?",$activity['id']);
        $res = array(
            "produce"=>$produce,
            "activity"=>$activity,
            "styles"=>$styles,
            "manufacturers"=>$manufacturers,
            "designs"=>$designs
        );
        //print_r($res);exit;
        return $res;
    }
    function action_do_confirm(){
        $activity_id = $this->_request("activity_id");
        $craft = $this->_request("craft");
        $manufacturer_id = $this->_request("manufacturer_id");
        $operator_id = $this->_request("operator_id");
        $count = PtLib\db()->select_row('select count(id) from orders where status="待发货"');
        try{
            self::_db()->insert("activity_produces",array(
                "activity_id"=>$activity_id,
                "craft"=>$craft,
                "manufacturer_id"=>$manufacturer_id,
                "operator_id"=>$operator_id,
                "status"=>'生产中',
                "create_time"=>date('Y-m-d H:i:s'),
                "order_count"=>$count
            ));
        }catch (Exception $e){

        }
        return array("ok");

    }
    function view_confirm(){
        $request = PtLib\http_request("id");
        $activity = self::detail($request['id']);
        return array("activity"=>$activity);
    }
    function view_finish(){
        $request = PtLib\http_request("id");
        $activity = self::detail($request['id']);
        return array("activity"=>$activity);
    }

    /**
     * 列表
     *
    function action_list(){
        return self::table_list();
    }
     */

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
    *
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = PtLib\get_table_list($table,$table_alias);
        return $response;
    }
    */
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
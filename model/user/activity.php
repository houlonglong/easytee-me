<?php
/**
 * 用户活动
 */
class Model_User_Activity extends Model_User_Abstract {
    function __construct(){
        parent::__construct();
    }
    function view_index(){
        $status = self::_request("status");
        if($status == "") $status = "进行中";

        $where = 'where 1=1 ';
        if($status != "全部"){
            if($status == '已结束'){
                $where .= " and real_end_time < now()";
            }else{
                $_status_array = array(
                    "进行中"=>"ongoing",
                    "成功"=>"success",
                    "编辑中"=>"create",
                );
                $_status = $_status_array[$status];
                $where .= " and status = '{$_status}'";
            }

        }

        $uid = Model_Design_Tool_Beta::get_uid();
        $p = self::_request("p");
        $page = (empty($p)  || intval($p) == 0) ? 1 : intval($p);
        $limit = 10;
        $row_total = self::_db()->select_row("select count(id) as total from activities $where and uid = ?",$uid);
        $total = $row_total['total'];
        if( $total > 0 )
            $total_pages = ceil($total/$limit);
        else
            $total_pages = 1;

        if ($page > $total_pages) $page = $total_pages;

        $skip = ($page - 1) * $limit;

        $rows = self::_db()->select_rows("select * from activities $where and uid = ? order by id desc limit {$skip},{$limit} ",$uid);
        //var_dump($rows);exit;
        $params = array(
            'total_rows'=>$total, #(必须)
            'list_rows'=>$limit,
            'now_page'  =>$page,  #(必须),
            'base_url' => "/user/activity/index"
        );
        $pager = new PtPager($params);

        $money = Model_User_Setting::get_balance_tx();
        $money_all = Model_User_Setting::get_total_earn();
        return array("pager"=>$pager,'rows'=>$rows,"money"=>$money,"money_all"=>$money_all,"status"=>$status);
    }
    function view_detail(){
        $id = self::_request("id");
        $uid = self::get_uid();
        $detail = self::_db()->select_row("select * from activities where uid = ? and id = ?",$uid,$id);
        return array("detail"=>$detail);
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
     *
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
     */

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
       $id = self::_request('id');
        if($id){
            $name = self::_request('name');
            if($name){
                $data['name'] = $name;
            }
            $descripion = self::_request('description');
            if($descripion){
                $data['description'] = $descripion;
            }
            $row = self::_db()->update('activities',$data,array('id'=>$id));
            echo $row;
        }
    }

    function action_close_activity(){
        $id = self::_request('id');
        if($id){
            $activity = self::_db()->select_row('select a.*,d.colors from activities as a INNER JOIN designs as d on a.design_id = d.id where a.id = ?',$id);
            if($activity['sales_count']<=0){
                return array('msg'=>'msg1');
            }
            if($activity['sales_count']<10){
                return array('msg'=>'msg2');
            }
            if($activity['sales_count']>10 &&  $activity['sales_count']< $activity['sales_target']){
                $salesCount = $activity['sales_count'];
                if($salesCount>=$activity['sales_target']){
                    $salesCount = $activity['sales_target'];
                }
                $eachPrice = Model_Cost::calculate_cost($activity['colors'],$salesCount);
                $profie = Model_Cost::calculate_profie($id);
                return array('msg'=>'msg3','eachPrice'=>$eachPrice,'profie'=>$profie);
            }
            if($activity['sales_count']>=$activity['sales_target']){
                return array('msg'=>'msg4');
            }
        }
        return array();
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
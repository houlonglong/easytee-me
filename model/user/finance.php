<?php
/**
 * 用户财务
 */
class Model_User_Finance extends Model_User_Abstract {
    static $table = "";
    function __construct(){
        parent::__construct();
    }
    static function get_log($uid,$start_time = '',$end_time = '',$limit = 20,$page = 1,$sort = 'f.id',$sort_type = "desc"){
        $select_fields = " w.*";
        $table = "et_user_finance_log AS f";
        $join = ' ';

        //where
        $where = " WHERE 1=1 ";
        $args =array();

        if($uid){
            $where .= 'AND f.uid = ? ';
            $args[] = $uid;
        }

        if($start_time){
            $start_time = $start_time." 00:00:00";
            $where .= 'AND f.add_time > ? ';
            $args[] = $start_time;
        }
        if($end_time){
            $end_time = $end_time." 23:59:59";
            $where .= 'AND f.add_time < ? ';
            $args[] = $end_time;
        }
        //order
        $order = "ORDER BY " . addslashes($sort) . " " . $sort_type;
        $sql = "SELECT COUNT(f.id) AS total FROM $table $join $where ";
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

}
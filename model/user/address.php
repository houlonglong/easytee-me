<?php
/**
 * 用户收货地址
 */
class Model_User_Address extends Model_User_Abstract {
    static $table = "";
    function __construct(){
        parent::__construct();
    }
    function view_index(){

    }

    function view_detail(){

    }
    static function detail($id,$uid){
        $row = self::_db()->select_row("select * from et_user_addr where id = ? and uid = ?",$id,$uid);
        return $row;
    }
    static function remove($id,$uid){
        $row = self::_db()->delete("et_user_addr",array("id"=>$id,"uid"=>$uid));
        return $row;
    }
    static function hash($uid,$name,$tel,$province,$city,$county,$addr){
        return md5($uid.$name.$tel.$province.$city.$county.$addr);
    }
    static function check_addr_exsits_by_hash($hash){
        $row = self::_db()->select_row("select id from et_user_addr where hash = ?",$hash);
        return empty($row)?false:true;
    }
    static function update($id,$uid,$name,$tel,$province,$city,$county,$addr,$from_wexin,$is_default = 0){
        $hash = self::hash($uid,$name,$tel,$province,$city,$county,$addr);
        if(self::check_addr_exsits_by_hash($hash)) throw new Exception("地址已存在");
        $id = self::_db()->update("et_user_addr",array(
            "name"=>$name,
            "uid"=>$uid,
            "tel"=>$tel,
            "province"=>$province,
            "city"=>$city,
            "county"=>$county,
            "addr"=>$addr,
            "from_wexin"=>$from_wexin,
            "hash"=>$hash,
            "is_default"=>$is_default,
        ),array("id"=>$id,"uid"=>$uid));
        return $id;
    }
    static function save($uid,$name,$tel,$province,$city,$county,$addr,$from_wexin,$is_default = 0){
        $hash = self::hash($uid,$name,$tel,$province,$city,$county,$addr);
        if(self::check_addr_exsits_by_hash($hash)) throw new Exception("地址已存在");
        $id = self::_db()->insert("et_user_addr",array(
            "name"=>$name,
            "uid"=>$uid,
            "tel"=>$tel,
            "province"=>$province,
            "city"=>$city,
            "county"=>$county,
            "addr"=>$addr,
            "from_wexin"=>$from_wexin,
            "hash"=>$hash,
            "is_default"=>$is_default,
            "add_time"=>date_time_now(),
        ));
        return $id;
    }
    static function get_list($uid,$limit = 20,$page = 1){
        $select_fields = "addr.*";
        $table = "et_user_addr as addr";
        $join = ' ';

        //where
        $where = " where 1=1 ";
        $args =array();

        if($uid){
            $where .= 'and addr.uid = ? ';
            $args[] = $uid;
        }

        //order
        $order = "order by addr.id desc ";
        $sql = "select count(addr.id) as total from $table $join $where ";
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
        $sql = "select $select_fields from $table $join $where $order limit $skip,$limit ";
        $rows = self::_db()->select_rows($sql, $args);
        $response['rows'] = $rows;
        $response['pager'] = $pager;
        return $response;
    }

}
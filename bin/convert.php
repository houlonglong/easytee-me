<?php
include_once __DIR__.'/../app/init.php';

$setting['db'] = array(
    'default'=>array(
        'type'=>'mysql',
        'host'=>'rds80919c4kbsv55h784.mysql.rds.aliyuncs.com',
        'port'=>3306,
        'dbname'=>'ptphp_db',
        'dbuser'=>'aliyun_rds_0001',
        'dbpass'=>'aliyun_rds_0001',
        'charset'=>'utf8',
    ),

    'new'=>array(
        'type'=>'mysql',
        'host' => 'rdsc1n8bpzjumxhso878cpublic.mysql.rds.aliyuncs.com',
        'port'=>3306,
        'dbname'=>'neweasytee',
        'dbuser'=>'neweasytee_write',
        'dbpass'=>'neweasytee_write',
        'charset'=>'utf8',
    ),

    'new1'=>array(
        'type'=>'mysql',
        'host'=>'127.0.0.1',
        'port'=>3306,
        'dbname'=>'new_db_001',
        'dbuser'=>'root',
        'dbpass'=>'root',
        'charset'=>'utf8',
    ),

    'open'=>array(
        'type'=>'mysql',
        'host' => 'rdsc1n8bpzjumxhso878cpublic.mysql.rds.aliyuncs.com',
        'port'=>3306,
        'dbname'=>'open_edit',
        'dbuser'=>'open_edit_write',
        'dbpass'=>'open_edit_write',
        'charset'=>'utf8',
    ),
    'open1'=>array(
        'type'=>'mysql',
        'host'=>'127.0.0.1',
        'port'=>3306,
        'dbname'=>'open_db_001',
        'dbuser'=>'root',
        'dbpass'=>'root',
        'charset'=>'utf8',
    ),
    'jzw'=>array(
        'type'=>'mysql',
        'host'=>'rdsc1n8bpzjumxhso878cpublic.mysql.rds.aliyuncs.com',
        'port'=>3306,
        'dbname'=>'jzw',
        'dbuser'=>'jzw',
        'dbpass'=>'shangbanle2014',
        'charset'=>'utf8',
    ),
    'jzw111'=>array(
        'type'=>'mysql',
        'host'=>'127.0.0.1',
        'port'=>3306,
        'dbname'=>'jzw',
        'dbuser'=>'root',
        'dbpass'=>'root',
        'charset'=>'utf8',
    )
);
$RES = Pt\db_select_row("select 1");
var_dump($RES);
exit;
$users = db("jzw")->select_rows("select * from users limit 10000");
//db("new")->_truncate("users");
//db("new")->_truncate("user_attributes");
//db("new")->_truncate("user_auths");
//db("open")->_truncate("users");
//db("open")->_truncate("user_addresses");


function get_user_addr($uid){
    $rows = db("jzw")->select_rows("select * from user_addresses where user_id = ?",$uid);
    return $rows;
}
function get_user_third_party($uid){
    $rows = db("jzw")->select_rows("select * from thirdparty_logins where user_id = ?",$uid);
    return $rows;
}
function get_pay_info($user){
    $pay_info = $user['payee_info'];
    $pay_type = $pay_account = null;
    if($pay_info){
        $pay_info = json_decode($pay_info,1);

        $_pay_type = $pay_info['type'];
        if($_pay_type == 1){
            $pay_type = "alipay";
        }
        if($_pay_type == 4){
            $pay_type = "wechat";
        }
        $pay_account = $pay_info['account'];
    }
    return array(
        "pay_account"=>$pay_account,
        "pay_type"=>$pay_type,
    );
}

function update_user_tabile($user){
    $new_user = array(
        "nickname"      => $user['name'],
        "mobile"        => $user['mobile'],
        "mobile_checked"=> $user['mobile_checked'],
        "email"         => $user['email'],
        "email_checked" => $user['email_checked'],
        "password"      => $user['password'],
        "money"         => $user['money'],
        "money_disabled"=> $user['invalid_money'],
        "money_all"     => $user['income'],
        "photo"         => $user['img_path'],
        "create_time"   => $user['create_time'],
        "login_time"    => $user['login_time'],
    );
    $uid = db("new")->insert("users",$new_user);
    return $uid;
}
function update_user_attr($user,$pay_info){
    $new_user_attr = array(
        "uid"         => $user['id'],
        "reg_ip"      => $user['reg_ip'],
        "pay_type"    => $pay_info['pay_type'],
        "pay_account" => $pay_info['pay_account']
    );
    db("new")->insert("user_attributes",$new_user_attr);
}
function update_user_addr($addrs,$user){
    $key = "etme.com.cn.www.tp";
    $url = "http://o.dev.jzw.la/pay/usertoken";
    $res = http_client()->post($url,array(
        "key"=>$key,
        "app_id"=>1,
        "app_uid"=>$user['id'],
    ));
    $usertoken = $res['body'];
    $uid = db("open")->insert("users",array(
        'app_uid' => $user['id'],
        'mobile' => $user['mobile'],
        'money' => $user['money'],
        'nick_name' => $user['name'],
        'app_id' => 1,
        'create_time' => date('Y-m-d H:i:s'),
        'token' => $usertoken,
    ));
    foreach($addrs as $addr){
        db("open")->insert("user_addresses",array(
            'uid'=>$uid,
            'name'=>$addr['name'],
            'tel'=>$addr['tel'],
            'zipcode'=>$addr['zipcode'],
            'mobile'=>$addr['mobile'],
            'province'=>$addr['province'],
            'city'=>$addr['city'],
            'county'=>$addr['county'],
            'address'=>$addr['address'],
            'hash'=>md5(str_replace(' ', '', $user['id'] . $addr['name'] . $addr['tel'] . $addr['province'] . $addr['city'] . $addr['county'] . $addr['address'])),
            'source'=>$addr['source'],
            'create_time'=>$addr['create_time'],
            'update_time'=>$addr['update_time'],
        ));
    }
}
function update_user_t_p($tps,$user){
    foreach($tps as $tp){
        $t = array(
            "qq"=>"qq",
            "wechat_web"=>"wechat",
            "wechat_mobile"=>"wechat",
            "weibo"=>"weibo",
            "alipay"=>"alipay",
            "renren"=>"renren",
            "taobao"=>"taobao",
            "douban"=>"douban",
        );
        db("new")->insert("user_auths",array(
            "uid"=>$user['id'],
            "type"=>$t[$tp['type']],
            "openid"=>$tp['out_id'],
        ));
    }
}

foreach($users as $user){
    //print_json($user);
    //pt_log(strlen($user['password']));exit;
    $addrs = get_user_addr($user['id']);
    //$orders = get_user_order($user['id']);
    $tps = get_user_third_party($user['id']);
    $pay_info = get_pay_info($user);

    $uid = update_user_tabile($user);
    $user["id"] = $uid;
    update_user_attr($user,$pay_info);
    update_user_addr($addrs,$user);
    update_user_t_p($tps,$user);
    //update_user_order($orders,$user);

}

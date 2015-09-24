<?php

class Model_Service_Activity extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }

    /**
     * 结束活动
     * @param $id 活动ID
     */
    static function close_activity($id){
        PtLib\log("[活动] id:%s 更新状态为:%s 结束活动",$id,2);
        self::_db()->update("et_activity_info",array("status"=>2),array("id"=>$id));

    }

    /**
     * 结束活动 进入生产
     * @param $id 活动ID
     */
    static function close_activity_and_produce($id,$sale_profit){
        PtLib\log("[活动] id:%s 状态为:%s,活动结束;利润为:%s",$id,2,$sale_profit);
        $row = array("status"=>2,"production_status"=>1,"sale_profit"=>$sale_profit);
        self::_db()->update("et_activity_info",$row,array("id"=>$id));
    }

    /**
     * @param $id           活动ID
     * @param $colors       颜色数量
     * @param $sale_count   销售总量
     * @param $sale_target  销售目标
     * @return float
     * @throws Exception
     */
    static function get_activity_profit($id,$colors,$sale_count,$sale_target){
        //单件印花成本
        if($sale_count > $sale_target) $_sale_count = $sale_target;
        else $_sale_count = $sale_count;
        PtLib\log("[印花成本] 活动:%s 销量:%s 目标:%s 3成本销量:%s 颜色:%s",$id,$sale_count,$sale_target,$_sale_count,$colors);
        $cost_print_one = Model_Cost::calculate_cost($colors,$_sale_count);
        //印花成本4
        $cost_print = $cost_print_one * $sale_count;
        PtLib\log("[印花成本] 活动:%s 单件:%s 总:%s",$id,$cost_print_one,$cost_print);
        $total = self::_db()->select_row("select sum(quantity*sell_price - cost_price) as profit_all from et_order_goods  where activity_id = ? ",$id);
        $profit_all = $total['profit_all'] ? $total['profit_all']:"0";
        $profit = round($profit_all - $cost_print,2);
        PtLib\log("[印刷成本] 活动:%s 不含印花利润:%s - 印花成本:%s = 利润:%s",$id,$profit_all,$cost_print,$profit);
        self::_db()->update("et_activity_info",array("sale_profit"=>$profit),array("id"=>$id));
        return $profit;
    }

    /**
     * 给卖家结算利润
     * @param $uid
     * @param $profit
     */
    static function clearing_profit($act_id,$uid,$profit){
        PtLib\log("[利润结算] 活动:%s 用户:%s 利润:%s ",$act_id,$uid,$profit);
        $profit = floatval($profit);
        $prenent_40 = $profit * 0.4;
        $prenent_60 = $profit * 0.6;
        self::_db()->run_sql('update et_user_finance set balance_block = balance_block + '.$prenent_40.',balance_tx = balance_tx + '.$prenent_60.' where uid = ?',$uid);
        PtLib\log("[帐户余额] 用户:%s 可提现:+ %s 暂时冻结:+ %s",$uid,$prenent_60,$prenent_40);
        //交易明细
        $date = date_time_now();
        $logs = array(
            array(
                'uid'      =>$uid,
                'amount'   => $prenent_60,
                'note'     => "活动收入,活动:".$act_id,
                'type'     => 5,
                'add_time' => $date,
            ),
            array(
                'uid'      =>$uid,
                'amount'   => $prenent_40,
                'note'     => "活动收入,暂时冻结,活动:".$act_id,
                'type'     => 51,
                'add_time' => $date,
            ),
        );

        self::_db()->insert('et_user_finance_block',array(
            "uid"=>$uid,
            "activity_id"=>$act_id,
            "amount"=>$prenent_40,
            "add_time"=>$date,
        ));
        self::_db()->insert('et_user_finance_log',$logs);
    }
    /*
     * 处理未成功活动 用户退款
     */
    static function do_refund($act_id,$act_name,$sale_count,$nick_name){
        $orders = self::_db()->select_rows("select o.order_no,u.mobile,o.uid,o.id,o.uid,pay.pay_price,pay.balance_tx,pay.balance_ntx from et_order as o left join et_order_pay as pay on pay.order_id = o.id
            left join et_user as u on u.id = o.uid
            left join et_order_activity as oa on oa.order_id = o.id
            where oa.activity_id = ? and pay.pay_status = 1",$act_id);

        $log = array(
            'type'=>15,
            'add_time'=>date_time_now(),
        );
        foreach($orders as $order){
            $log['uid'] = $order['uid'];
            $log['amount'] = $order['pay_price']+$order['balance_tx']+$order['balance_ntx'];
            $log['note'] = "活动:".$act_id." 未达目标,退款 订单号:".$order['order_no'];
            self::_db()->insert('et_user_finance_log',$log);
            PtLib\log("[交易明细] 用户:%s amount:%s,note:%s",$log['uid'],$log['amount'],$log['note']);
            $balance_ntx = floatval($order['balance_ntx']);
            $balance_tx = floatval($order['balance_tx']);
            $pay_price = floatval($order['pay_price']);

            self::_db()->run_sql('update et_user_finance set balance_ntx = balance_ntx + '.$balance_ntx .',balance_tx = balance_tx + '.($balance_tx + $pay_price).' where uid = ?',$order['uid']);
            PtLib\log("[帐户余额] 用户:%s 可提现:+ %s 不可提现:+ %s",$log['uid'],$balance_ntx,$balance_tx + $pay_price);

            self::_db()->update("et_order_pay",array("pay_status"=>2,"refund_time"=>date_time_now()),array("order_id"=>$order['id']));
            PtLib\log("[订单更新] 订单号:%s,pay_status 更新为:%s",$order['order_no'],2);
            //给用户发短信
            $mobile = $order['mobile'];
            if(PtApp::$ENV == 'develop'){
                $mobile = TEST_SMS_MOBILE;
            }
            $option= json_encode(array(
                'username' => $nick_name,
                'salesNum' => $sale_count,
                'activity' => $act_name,
            ));
            PtLib\log("[订单退款短信] 订单号:%s,project:%s,mobile:%s,option:%s",$order['order_no'],"4NOd3",$mobile,$option);
            self::_db()->insert("et_sms_order",array(
                "project"=>"4NOd3",
                "order_id"=>$order["id"],
                "mobile"=>$mobile,
                "option"=>$option,
                "add_time"=>date_time_now(),
            ));
        }

    }
    function cli_run($commit){
        //进行中的 结束时间小于当前时间的 活动
        $activities = self::_db()->select_rows("select i.*,u.nick_name,u.mobile,a.name
                    from et_activity_info as i
                    left join activities as a on a.id = i.id
                    left join et_user as u on u.id = i.uid
                    where i.status = 1 and i.production_status = 0 and i.end_time < now()");

        PtLib\log("=======");
        if(!$activities){
            PtLib\log("没有活动要结束");
        }

        foreach($activities as $activity){
            PtLib\log("------");
            //print_r($activity);exit;
            try{
                self::_db()->bt();
                $colors = intval($activity['colors']);
                $sale_count = intval($activity['sale_count']);
                $sale_profit = floatval($activity['sale_profit']);
                $sale_target = intval($activity['sale_target']);
                $act_id = $activity['id'];
                $uid = $activity['uid'];
                $mobile = $activity['mobile'];

                if(PtApp::$ENV == 'develop'){
                    $mobile = TEST_SMS_MOBILE;
                }

                $act_name = $activity['name'];
                $nick_name = $activity['nick_name'];

                //销售数量小于10 直接结束,并处理订单退款
                if($sale_count < 10){
                    PtLib\log("[活动] id:%s 销售数量:%s 小于 10 结束活动,处理订单退款",$act_id,$sale_count);
                    self::close_activity($act_id);
                    self::do_refund($act_id,$act_name,$sale_count,$nick_name);
                    //给卖家发送活动失败短信
                    $option = json_encode(array(
                        'salesNum' => $sale_count,
                        'activity' => $act_name,
                        'username' => $nick_name
                    ));
                    PtLib\log("[活动短信] id:%s 失败,给卖家:%s 发送短信,project:%s,option:%s",$act_id,$mobile,"oWwG62",$option);
                    self::_db()->insert("et_sms_activity",array(
                        "project"=>"oWwG62",
                        "activity_id"=>$act_id,
                        "mobile"=>$mobile,
                        "option"=>$option,
                        "add_time"=>date_time_now(),
                    ));

                }elseif($sale_count >= 10 and $sale_count < $sale_target){//大于起订量10件 并小于销售目标
                    if($sale_profit <= 0) $sale_profit = self::get_activity_profit($act_id,$colors,$sale_count,$sale_target);
                    PtLib\log("[活动] id:%s 销售数量:%s 大于起订量10件 并小于销售目标:%s 利润:%s",$act_id,$sale_count,$sale_target,$sale_profit);
                    //var_dump($sale_profit);exit;
                    if($sale_profit > 0){//有利润进入生产
                        self::close_activity_and_produce($act_id,$sale_profit);
                        //结算利润给卖家
                        self::clearing_profit($act_id,$uid,$sale_profit);
                        //给卖家发送活动成功进入生产短信
                        $option = json_encode(array(
                            'username' => $nick_name,
                            'activity' => $act_name,
                            'salesNum' => $sale_count,
                            'money' => $sale_profit,
                        ));
                        PtLib\log("[活动短信] id:%s 成功,给卖家:%s 发送短信,project:%s,option:%s",$act_id,$mobile,"fyiCw2",$option);
                        self::_db()->insert("et_sms_activity",array(
                            "project"=>"fyiCw2",
                            "activity_id"=>$act_id,
                            "mobile"=>$mobile,
                            "option"=>$option,
                            "add_time"=>date_time_now(),
                        ));
                        //发送短信给生产负责人
                        $option = json_encode(array(
                            'activityId' => $act_id,
                            'activityTitle' => $act_name,
                        ));
                        PtLib\log("[活动短信] id:%s 成功,给生产负责人:%s 发送短信,project:%s,option:%s",$act_id,PRODUCTION_NOTICE,"4NOd3",$option);
                        self::_db()->insert("et_sms_activity",array(
                            "project"=>"4NOd3",
                            "activity_id"=>$act_id,
                            "mobile"=>PRODUCTION_NOTICE,
                            "option"=>$option,
                            "add_time"=>date_time_now(),
                        ));

                    }else{//没有利润 直接结束 处理订单退款
                        self::close_activity($act_id);
                        self::do_refund($act_id,$act_name,$sale_count,$nick_name);
                        //给卖家发送活动失败短信
                        $option = json_encode(array(
                            'salesNum' => $sale_count,
                            'activity' => $act_name,
                            'username' => $nick_name
                        ));
                        PtLib\log("[活动短信] id:%s 失败,给卖家:%s 发送短信,project:%s,option:%s",$act_id,$mobile,"oWwG62",$option);
                        self::_db()->insert("et_sms_activity",array(
                            "project"=>"oWwG62",
                            "activity_id"=>$act_id,
                            "mobile"=>$mobile,
                            "option"=>$option,
                            "add_time"=>date_time_now(),
                        ));
                    }
                }else{//完成销售目标,有可能超销售目标 ==> 进入生产
                    if($sale_profit <= 0) $sale_profit = self::get_activity_profit($act_id,$colors,$sale_count,$sale_target);
                    PtLib\log("[活动] id:%s 完成销售目标 销售数量:%s 销售目标:%s 利润:%s",$act_id,$sale_count,$sale_target,$sale_profit);
                    self::close_activity_and_produce($act_id,$sale_profit);
                    //结算利润给卖家
                    self::clearing_profit($act_id,$uid,$sale_profit);
                    //给卖家发送活动成功进入生产短信
                    $option = json_encode(array(
                        'username' => $nick_name,
                        'activity' => $act_name,
                        'salesNum' => $sale_count,
                        'money' => $sale_profit,
                    ));
                    PtLib\log("[活动短信] id:%s 成功,给卖家:%s 发送短信,project:%s,option:%s",$act_id,$mobile,"fyiCw2",$option);
                    self::_db()->insert("et_sms_activity",array(
                        "project"=>"fyiCw2",
                        "activity_id"=>$act_id,
                        "mobile"=>$mobile,
                        "option"=>$option,
                        "add_time"=>date_time_now(),
                    ));
                    //发送短信给生产负责人
                    $option = json_encode(array(
                        'activityId' => $act_id,
                        'activityTitle' => $act_name,
                    ));
                    PtLib\log("[活动短信] id:%s 成功,给生产负责人:%s 发送短信,project:%s,option:%s",$act_id,PRODUCTION_NOTICE,"4NOd3",$option);
                    self::_db()->insert("et_sms_activity",array(
                        "project"=>"4NOd3",
                        "activity_id"=>$act_id,
                        "mobile"=>PRODUCTION_NOTICE,
                        "option"=>$option,
                        "add_time"=>date_time_now(),
                    ));

                }
                if($commit == 1){
                    self::_db()->commit();
                }else{
                    //PtLib\log(self::_db()->get_run_stack());
                }
            }catch (Exception $e){
                PtLib\log($e->getMessage());
                self::_db()->rollback();
            }
        }
    }

}
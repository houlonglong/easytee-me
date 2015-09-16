<?php

/**
 * Created by PhpStorm.
 * User: liaomei
 * Date: 2015/8/12
 * Time: 11:52
 */
class Model_Cost
{
    /**
     * 计算印刷成本
     * @return array
     */
    static function get_print_cost() {
        $color_nums = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        ;
        $arr = array();
        $sale_nums = array(
            10,
            20,
            30,
            40,
            50,
            100,
            150,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            1000,
        );
        $const[10][1] = 15;
        $const[10][10] = 45;

        foreach ($color_nums as $x) {
            $c = count($color_nums);
            if ($x > 1 && $x < 10) {
                $const[10][$c - $x + 1] = round($const[10][$c - $x + 2] - ($const[10][10] - $const[10][1]) / $c, 2);
            }
        }

        $const[20][1] = 13.5;
        $const[20][2] = 19.5;
        $const[20][3] = 22;
        $const[20][4] = 25;
        $const[20][5] = 27.5;
        $const[20][6] = 30.0;
        $const[20][7] = 32.0;
        $const[20][8] = 34.0;
        $const[20][9] = 38.0;
        $const[20][10] = 41.5;

        $const[500][1] = 7.5;
        $const[500][2] = 11.0;
        $const[500][3] = 12;
        $const[500][4] = 14;
        $const[500][5] = 15.0;
        $const[500][6] = 16.40;
        $const[500][7] = 17.0;
        $const[500][8] = 18.0;
        $const[500][9] = 20.0;
        $const[500][10] = 23.0;

        $const1[1] = 5;
        $const1[2] = 6.40;
        $const1[3] = 7.10;
        $const1[4] = 7.80;
        $const1[5] = 8.50;
        $const1[6] = 9.20;
        $const1[7] = 9.90;
        $const1[8] = 10.60;
        $const1[9] = 11.30;
        $const1[10] = 12.0;
        $sale_nums_length = count($sale_nums);
        $_y = 10;
        foreach ($sale_nums as $y) {
            //echo $y.":  ";
            foreach ($color_nums as $x) {
                $value = "";
                if (isset($const[$y][$x])) {
                    $value = $const[$y][$x];
                } else {
                    if ($y == 30) {
                        $value = $arr[$_y][$x] - ($const[$_y][$x] - $const1[$x]) / $sale_nums_length;
                    } else if ($y > 30) {
                        $value = $arr[$_y][$x] - ($const[10][$x] - $const1[$x]) / $sale_nums_length;
                    }
                }
                $arr[$y][$x] = $value;
                //echo round($value,2)." ";
            }
            //ECHO PHP_EOL;
            $_y = $y;
        }
        return $arr;
    }


    /**
     * 计算单价成本
     * @param $color_num  颜色数量
     * @param $sale_num   销售数量
     */
    static function calculate_cost($color_num, $sale_num) {

        if ($sale_num > 1000) {
            $sale_num = 1000;
        }
        $costs = self::get_print_cost();
//        var_dump($costs);
        $price = null;
        $pre_sale_num = 10;
        foreach ($costs as $_sale_num => $colors) {
            if ($_sale_num == $sale_num) {
                $price = isset($colors[$color_num]) ? $colors[$color_num] : null;
                break;
            } else {
                if ($sale_num < $_sale_num) {
                    //echo $pre_sale_num." : ".$sale_num." : ".$_sale_num.PHP_EOL;
                    $pre_colors = $costs[$pre_sale_num];
                    //var_dump($pre_colors[$color_num]);
                    $price = $pre_colors[$color_num] + ($colors[$color_num] - $pre_colors[$color_num]) * ($sale_num - $pre_sale_num) / ($_sale_num - $pre_sale_num);
                    break;
                }
            }
            $pre_sale_num = $_sale_num;
        }
        if ($price === null) {
            throw new Exception("没有找到成本");
        }
        //print_r($price);
        return $price;
    }

    /**
     * 计算活动利润
     * @param $activityId
     * @return mixed
     * @throws Exception
     */
    static function calculate_profie($activityId){
       // print_r($GLOBALS['setting']);exit;
       $close =  PtLib\db_select_row('SELECT
                    sum(
                            good.purchase_price * good.quantity
                        ) as closePrice,a.sales_count,a.sales_target,a.total,d.colors
                    FROM
                        activities AS a
                    INNER JOIN orders AS O ON O.activity_id = a.id
                    INNER JOIN order_goods AS good ON good.order_id = O.id
                    INNER JOIN designs as d ON d.id = a.design_id
                    WHERE a.id = ? AND a.sales_count>=10 ',$activityId);
        if(empty($close['sales_count'])){
            return 0;
        }
        $salesCount = $close['sales_count'];
        // 超过目标，用目标件数件数计算成本
        if($salesCount>=$close['sales_target']){
            $salesCount = $close['sales_target'];
        }
        $eachProfie = self::calculate_cost($close['colors'],$salesCount);
        $profie = $close['total'] - $eachProfie*$close['sales_count']-$close['closePrice'];
        return  $profie;
    }
}
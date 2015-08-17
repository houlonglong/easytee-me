<?php
/**
 * 订制成功
 */
class Model_Tshirt_Cost{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    static function get_print_cost(){
        $color_nums = array(1,2,3,4,5,6,7,8,9,10);;
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

        foreach($color_nums as $x){
            $c = count($color_nums);
            if($x > 1 && $x < 10){
                $const[10][$c - $x + 1] = $const[10][$c - $x + 2] - ($const[10][10] - $const[10][1])/$c;
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
        foreach($sale_nums as $y){
            //echo $y.":  ";
            foreach($color_nums as $x){
                $value = "";
                if(isset($const[$y][$x])){
                    $value = $const[$y][$x];
                }else {
                    if($y == 30){
                        $value = $arr[$_y][$x] - ($const[$_y][$x] - $const1[$x])/$sale_nums_length;
                    }else if($y > 30 ){
                        $value = $arr[$_y][$x] - ($const[10][$x] - $const1[$x])/$sale_nums_length;
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
     * @param $color_num  颜色数量
     * @param $sale_num   销售数量
     */
    static function calculate($color_num,$sale_num){
        $costs = self::get_print_cost();
        //var_dump($costs);
        $price = null;
        $pre_sale_num = 10;
        foreach($costs as $_sale_num => $colors){
            if ($_sale_num == $sale_num) {
                $price = isset($colors[$color_num])?$colors[$color_num]:null;
                break;
            }else{
                if($sale_num < $_sale_num){
                    //echo $pre_sale_num." : ".$sale_num." : ".$_sale_num.PHP_EOL;
                    $pre_colors = $costs[$pre_sale_num];
                    //var_dump($pre_colors[$color_num]);
                    //var_dump($colors[$color_num]);
                    $price = $pre_colors[$color_num] +($colors[$color_num] - $pre_colors[$color_num])*($sale_num - $pre_sale_num)/($_sale_num - $pre_sale_num);
                    break;
                }
            }
            $pre_sale_num = $_sale_num;
        }
        if($price === null){
            throw new Exception("没有找到成本");
        }
        //print_r($price);
        return $price;
    }
    /**
     * 详情
     * @return array
     *
    function action_detail(){
        $request = pt_http_request("id");
        return self::detail($request['id']);
    }
     */

    /**
     * 详情
     * @param $id
     * @return array
     *
    static function detail($id){
        $table = self::$table;
        $row = db_select_row("select * from $table where id = ?",$id);
        return $row;
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
        return pt_table_edit($table);
    }
    */

    /*
    * 列表
    *
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = pt_get_table_list($table,$table_alias);
        return $response;
    }
    */
    /**
     * @param
     * @return
     *
    function action_test(){
        $request = pt_http_request("id");
        $data = array();
        $data['id'] = $request;
        return $data;
    }
     */
}
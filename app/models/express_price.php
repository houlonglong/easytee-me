<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ExpressPrice extends AppModel {

    public $name = 'ExpressPrice';
    public $useDbConfig = 'write';

    /**
     * 获取指定地区的快递价格
     * @param $area
     * @return array|mixed
     */
    public function get_price_by_area($area) {
        $area = str_replace("市","",$area);
        $area = str_replace("省","",$area);
        $key = 'express_price_area_' . $area;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('area' => $area)));
            cache::write($key, $data);
        }
        return $data;
    }

    /**
     * 获取地区价格列表
     * @return array
     */
    public function get_prices() {
        $data = $this->find('all');
        return $data;
    }
}

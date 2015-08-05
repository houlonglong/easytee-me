<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class DesignSvg extends AppModel {

    public $name = 'DesignSvg';
    public $useDbConfig = 'write';

    public function saveData($configuration) {
        $this->useDbConfig = 'write';
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();
    }

    public function get($id) {
        $key = 'design_svg_design_id_' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('fields' => array('svg_front_image', 'svg_back_image', 'svg_third_image', 'svg_fourth_image'), 'conditions' => array('design_id' => $id)));
            cache::write($key, $data);
        }
        return $data;
    }

    public function deleteByDesignId($id) {
        $this->deleteAll(array('design_id' => $id));
        cache::delete('design_svg_design_id_' . $id);
    }

}

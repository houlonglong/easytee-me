<?php


class ExpressController extends AppController {

    var $uses = array('ExpressPrice');
    var $name = "ExpressController";

    function beforeFilter() {
        //parent::beforeFilter();
        $this->common = new openEditComment();
    }

    function price() {
        $prices = $this->ExpressPrice->get_prices();
        $this->common->response($prices);
    }

}

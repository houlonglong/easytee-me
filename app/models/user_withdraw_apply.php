<?php

class UserWithdrawApply extends AppModel {

    public $name = "UserWithdrawApply";
    public $useDbConfig = "write";

    function add($info) {
        $this->create();
        $info['create_time'] = date('Y-m-d H:i:s');
        $this->save($info);
        return $this->getLastInsertId();
    }
}

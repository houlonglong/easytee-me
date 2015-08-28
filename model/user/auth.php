<?php
/**
 *
 */
class Model_User_Auth extends BaseModel{
    /**
     * @param
     * @return
     *
    function action_test(){
        $request = pt_http_request("id");
        $data['id'] = $request;
        return $data;
    }
    */
    function action_do_login(){
        $request = pt_http_request("username","password");
        return $request;
    }

    function action_logout(){
        $this->_location("/");
    }
}
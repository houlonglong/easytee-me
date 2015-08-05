<?php

/**
 * Created by PhpStorm.
 * User: seanxue
 * Date: 15-2-3
 * Time: 下午2:52
 */
class DesignController extends AppController {

    var $uses = array('User');
    var $name = "Design";

    function beforeFilter() {
        parent::beforeFilter();
    }

    function index() {
        $page_name = "T恤在线设计工具";
        $activityId = '';
        $designId = '';
        if (isset($_REQUEST['ActivityID'])) {
            $activityId = $this->filterHtml($_REQUEST['ActivityID']);
            $activity = $this->open->getActivityById($activityId, $this->userToken);
            $activity = json_decode($activity, TRUE);
            $this->checkReturnData($activity);
            // 已经生产的活动不能回到设计
            if ($activity['status'] != 'create') {
                $this->redirect('/activity/' . $activity['id']);
            }
            $appProductStyleId = @$activity['app_product_style_id'];
            $appProductId = @$activity['app_product_id'];
            $designId = $activity['design_id'];
        } else {
            $activity = $this->open->initDesign($activityId, $this->userToken);
            $activity = json_decode($activity, TRUE);
            $activityId = $activity['activityId'];
            $designId = $activity['designId'];
            $this->redirect("?DesignID={$designId}&ActivityID={$activityId}");
        }
        if (!isset($appProductId)) {
            $appProductId = 2;
            $appProductStyleId = 18;
        }

        $this->set(compact('page_name', 'activityId', 'appProductId', 'appProductStyleId', 'designId'));
    }

    public function productInfo($productId) {
        $productInfo = $this->open->getProduct(array('productId' => $productId));
        $productInfo = json_decode($productInfo, TRUE);
        $this->checkReturnData($productInfo);
        $info = $productInfo['long_description'];
        $this->set(compact('info'));
    }

}

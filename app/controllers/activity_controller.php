<?php

class ActivityController extends AppController {

    var $uses = array('User');
    var $name = "Activity";

    function beforeFilter() {
        parent::beforeFilter();
    }

    function index($id = '') {
        if (!$id) {
            $this->redirect('/error/?error=缺少参数');
        }

        $easyteeAdmin = $this->Session->read('easyteeAdmin');
        $activity = $this->open->getActivityDetail($id);
        $info = json_decode($activity, true);
        $this->checkReturnData($info);
        $user = $this->User->get($this->userId);
        $user = $user['User'];
        $userImages = array();
        if ($info['activity']['newSupporter']) {
            foreach ($info['activity']['newSupporter'] as $key => $supporter) {
                $image = '';
                if (array_key_exists($supporter['userId'], $userImages)) {
                    $image = $userImages[$supporter['userId']];
                } else {
                    $suser = $this->User->get($supporter['userId']);
                    $image = $suser['User']['photo'];
                    $userImages[$supporter['userId']] = $image;
                }

                $info['activity']['newSupporter'][$key]['image'] = $image;
            }
        }
        $page_name = $info['activity']['name'];
        $this->set(compact('page_name', 'info', 'user', 'easyteeAdmin'));
        //当前活动没有通过，当前用户不是admin，当前活动不是该用户发起的
        if ($info['activity']['pass'] == 3 && !$easyteeAdmin && $this->userId != $info['activity']['publisher']['uid']) {
            $this->viewPath = 'errors';
            $this->render('nopass');
        }
    }

    /**
     * 获取活动评论
     * @param type $id
     */
    public function getForum($id) {
        $forum = $this->open->getForum($id);
        $forum = json_decode($forum, true);
        $this->checkReturnData($forum);
        $this->set(compact('forum'));
        $this->render('forum');
    }

    /**
     * 获取活动的支持者
     * @param type $id
     */
    public function getSupporter($id) {
        $page = 1;
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        }
        $params = array(
            'page' => $page,
            'limit' => 30,
            'id' => $id,
        );
        $supporter = $this->open->getSupporter($params);
        $supporter = json_decode($supporter, true);
        $this->checkReturnData($supporter);
        if (isset($supporter['uids']) && $supporter['uids']) {
            $user = $this->User->getAllImage($supporter['uids']);
            $photos = array();
            foreach ($user as $u) {
                $photos[$u['User']['id']] = $u['User']['photo'];
            }
            unset($supporter['uids']);
            if ($supporter) {
                foreach ($supporter as $key => $s) {
                    if ($key === 'count') {
                        continue;
                    }
                    $supporter[$key]['image'] = $photos[$s['userId']];
                }
            }
        }
        $this->set(compact('supporter'));
        $this->render('supporter');
    }

    public function sizes() {
        if (!isset($_REQUEST['activityId']) || !$_REQUEST['activityId']) {
            
        }
        $params['activityId'] = $_REQUEST['activityId'];
        $size = $this->open->size($params);
        $size = json_decode($size, true);
        $this->checkReturnData($size);
        $this->set(compact('size'));
        $this->render('sizes');
    }

    public function ajaxLike($activityId) {
        $params['activityId'] = $activityId;
        $params['ip'] = getIp();
        $status = $this->open->likeActivity($params, $this->userToken);
        echo $this->ajaxCheckReturnData($status);
        exit;
    }

}

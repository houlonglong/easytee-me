<?php

class ActivityComment extends AppModel {

    public $name = 'ActivityComment';

    //获取评论
    public function getActivityCommentsByActivityId($activityId) {
        $result = $this->find('count', array('conditions' => array('activity_id' => $activityId)));
        return empty($result) ? array() : $result;
    }

    //展示最新10条评论
    function getActivityCommentsByActivityIdNews($activityId) {
        return $this->find('all', array('conditions' => array('activity_id' => $activityId), 'order' => 'id desc', 'limit' => 5));
    }

    public function getActivityCommentsByActivityPage($id, $offset='', $limit='') {
        $condition = array(
            'activity_id' => $id
        );
        if ($limit) {
            $result = $this->find('all', array('conditions' => $condition, 'order' => 'id desc', 'limit' => $offset . ',' . $limit));
            $count = $this->find('count',array('conditions'=>$condition));
            $result['count'] = $count;
        } else {
            $result = $this->find('all', array('conditions' => $condition, 'order' => 'id desc'));
            $result['count'] = count($result);
        }
        return empty($result) ? array() : $result;
    }

}

?>
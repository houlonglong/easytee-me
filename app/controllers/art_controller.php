<?php

class ArtController extends AppController {

    var $uses = array('ArtCategoryMap', 'ArtCategory', 'Art', 'User');
    var $name = "ArtController";

    function beforeFilter() {
        parent::beforeFilter();
    }

    /**
     * 获取剪贴画列表
     * @param type $appKey
     * @param type $acid Art category 分类ID
     * @param type $aid Art ID
     * @param type $userToken User Token
     */
    public function getList() {
        $userToken = '';
        if (isset($_REQUEST['userToken'])) {
            $userToken = $_REQUEST['userToken'];
        }
        
        $appid = $this->_app->id;
        $acid = '';
        $aid = 0;
        if (isset($_REQUEST['ArtCategoryId'])) {
            $acid = $_REQUEST['ArtCategoryId'];
        }
        if (isset($_REQUEST['ArtId'])) {
            $aid = $_REQUEST['ArtId'];
        }
        $artListArr = array(
            'name' => 'ArtList',
        );
        if (isset($this->_app->user)) {
            $artListArr = array(
                'name' => 'UserArtList',
            );
        }
        $offset = 0;
        $page = 1;
        $limit = 30;
        if (isset($_REQUEST['page']) && $_REQUEST['page']) {
            $page = $_REQUEST['page'];
        }
        if (isset($_REQUEST['limit']) && $_REQUEST['limit']) {
            $limit = $_REQUEST['limit'];
            $offset = ($page - 1) * $limit;
        }
        $artlist = array();
        $arts = array();
        $artCategory = array();
        // 当art id 存在,列出所有art信息
        if ($aid) {
            $cidByaid = $this->ArtCategoryMap->getCategoryIdFromArtCategoryMapByAId($appid, $aid);
            $category = $this->ArtCategory->getArtCategoryById($appid, $cidByaid);
            $art = $this->Art->getArtByIds($appid, $aid);
            if (!$art) {
                $this->common->errorList(40000);
            }
            $this->getAttribute($art[0]['Art'], $category['ArtCategory'], $artlist);
        } else {
            // 当没有传参数的时候，随机去除30条art信息
            if (empty($acid) && empty($aid) && empty($userToken)) {
                $arts = $this->Art->getArtByAppIDRand($appid, $limit);
            }
            if (!empty($userToken) && empty($acid)) {
                $this->checkAppUser($appid, $userToken);
                $arts = $this->Art->getArtByUid($appid, $this->_app->user->id, $offset, $limit);
            }
            if ($arts) {
                if (isset($arts['count'])) {
                    $artlist[] = array('count' => $arts['count']);
                    unset($arts['count']);
                }
                foreach ($arts as $art) {
                    $art = $art['Art'];
                    $cidByaid = $this->ArtCategoryMap->getCategoryIdFromArtCategoryMapByAId($appid, $art['id']);
                    $category = $this->ArtCategory->getArtCategoryById($appid, $cidByaid);
                    $this->getAttribute($art, $category['ArtCategory'], $artlist);
                }
                $artListArr['item'] = $artlist;
                $this->common->response($artListArr);
                exit;
            }
            if ($acid) {
                $artCategory = $this->ArtCategory->getArtCategoryByIDOrParentId($appid, $acid);
            }

            foreach ($artCategory as $ac) {
                $ac = $ac['ArtCategory'];
                $artids = $this->ArtCategoryMap->getArtIdFromArtCategoryMapByCategoryId($appid, $ac['id']);
                $arts = $this->Art->getArtByIds($appid, $artids);
                foreach ($arts as $art) {
                    $art = $art['Art'];
                    $artids = array();
                    if (in_array($art['id'], $artids)) {
                        continue;
                    }
                    $artids[] = $art['id'];
                    $this->getAttribute($art, $ac, $artlist);
                }
            }
        }

        $artListArr['item'] = $artlist;
        $this->common->response($artListArr);
    }

    /**
     * 获取剪贴画分类列表
     * @param type $acid Art category parent id
     */
    public function getCategoryList() {
        $acpid = 0;
        if (isset($_REQUEST['ArtCategoryId'])) {
            $acpid = $_REQUEST['ArtCategoryId'];
        }
        $artCategory = $this->ArtCategory->getArtCategoryByIDParentId($this->_app->id, $acpid);
        $artCategoryList = array();
        $list = array();
        foreach ($artCategory as $ac) {
            $ac = $ac['ArtCategory'];
            $list[] = array(
                'name' => 'gallery_art_categories',
                'attribute' => array(
                    'art_category_id' => $ac['id'],
                    'name' => $ac['name_cn'],
                    'can_digital_print' => $ac['can_digital_print'],
                    'can_screen_print' => $ac['can_screen_print'],
                    'can_embroider' => $ac['can_embroider'],
                    'path' => $ac['path'],
                    'sort_order' => $ac['sort_order'],
                    'thumb_jit' => $ac['thumb_jit'],
                )
            );
        }
        $artCategoryList = array(
            'name' => 'ArtCategoryList',
            'item' => $list,
        );
        $this->common->response($artCategoryList);
    }

    /**
     * 保存上传的剪贴画
     * @param $appKey
     * @param $userToken
     * @param $uid
     */
    public function save() {
        if (!isset($_REQUEST['userToken'])) {
            $this->common->errorList(10007);
        }
        $userToken = $_REQUEST['userToken'];
        $appid = $this->_app->id;
        $value = rand(10000, 99999);
        $infos = $_POST;
        $art['date_created'] = date('Y-m-d H:i:s');
        $art['uid'] = $this->_app->user->id;
        $art['app_id'] = $appid;
//        $art['colors'] = $infos['colorLength'];
        $this->loadModel('Art');
        $lastId = $this->Art->saveData($art);
        if (!$lastId) {
            $this->common->errorList(11008);
        }
        $artData = $this->common->saveUploadFiles($lastId, $value,$appid,@$_REQUEST['DesignID'],$this);
        $art['id'] = $lastId;
        $art['original_art_path'] = $artData['originalPath'];
        $art['thumb_jit'] = $artData['thumbpath'];
        $art['art_path'] = $artData['originalPath'];
        $art['art_extension'] = $artData['extention'];
        $art['type'] = 'image';
        if (!in_array(strtolower($artData['extention']), array('jpg', 'jpeg', 'png', 'gif', 'bmp'))) {
            $art['type'] = 'vector';
        }
        $lastId = $this->Art->saveData($art);
        $printAtr = array(
            'name' => 'Art',
            'item' => array(
                array(
                    'name' => 'ArtID',
                    'value' => $lastId
                ),
                array(
                    'name' => 'SessionID',
                    'value' => $userToken
                ),
                array(
                    'name' => 'SessionToken',
                    'value' => $userToken
                ),
                array(
                    'name' => 'ArtName',
                    'value' => $artData['originalName'],
                ),
                array(
                    'name' => 'Status',
                    'value' => 'OK'
                ),
            ),
        );
        $this->common->response($printAtr);
        
        
    }

    private function getAttribute($art, $artCategory, &$artlist) {
        $colors = json_decode($art["art_colors"], true);
        $artColor = array();
        if (is_array($colors) && $colors) {
            foreach ($colors as $color) {
                $artColor[] = array(
                    'name' => 'art_colors',
                    'attribute' => array(
                        'color' => $color,
                    )
                );
            }
        }
        $artlist[] = array(
            'name' => 'art',
            'attribute' => array(
                'art_id' => $art['id'],
                //TODO  这里的宽高不应该是写死的
                'width' => empty($art['width'])?'373':$art['width'],
                'height' => empty($art['height'])?'253':$art['height'],
                'art_type' => $art['type'],
                'can_screen_print' => $art['can_screen_print'],
                'is_featured' => $art['is_featured'],
                'colors' => $art['colors'],
                'art_name' => $art['name'],
                'is_digitized' => $art['is_digitized'],
                'date_created' => $art['date_created'],
                'art_jit' => $art['art_jit'],
                'art_cached' => $art['art_cached'],
                'thumb_jit' => $this->cdnReplace($art['thumb_jit']),
                'thumb_cached' => $art['thumb_cached'],
                'art_path' => $this->cdnReplace($art['art_path']),
                'art_category_id' => $artCategory['id'],
                'category_name' => $artCategory['name_cn'],
                'category_path' => $artCategory['path'],
            ),
            'item' => $artColor,
        );
    }

}

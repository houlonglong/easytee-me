<?php

class FontController extends AppController {

    var $uses = array('FontCategory', 'FontCategoryMap', 'Font');
    var $name = "FontController";

    function beforeFilter() {
        parent::beforeFilter();
    }

    /**
     * 获取字体列表
     *
     * @param type $fcid font_category id
     */
    public function getList() {
        if (!isset($_REQUEST["fontCategorieId"]) && empty($_REQUEST["fontCategorieId"])) {
            $this->common->errorList(20001);
        }
        $fcid = $_REQUEST["fontCategorieId"];

        $fontCategorys = $this->FontCategory->getFontCategoryById($this->_app->id, $fcid);

        if (!$fontCategorys) {
            $this->common->errorList(20001);
        }
        $fontIds = $this->FontCategoryMap->getFontIdByFromFontCategoryMapByFontCategoryId($this->_app->id, $fcid);
        $fonts = $this->Font->getFontById($this->_app->id, $fontIds);
        $FontList = array();
        foreach ($fonts as $key => $font) {
            $font = $font['Font'];
            $FontList[] = array(
                'name' => 'fonts',
                'attribute' => array(
                    'font_id' => $font['id'],
                    'name' => $font['name'],
                    'swfpath' => $font['swfpath'],
                    'jspath' => $font['jspath'],
                    'gifpath' => $font['gifpath'],
                    'is_embroidery' => $fontCategorys[0]['FontCategory']['is_embroidery'],
                    'FontCount' => $fontCategorys[0]['FontCategory']['font_count'],
                ),
            );
        }
        $result = array(
            'name' => 'FontList',
            'item' => $FontList,
        );
        $this->common->response($result);
    }

    /**
     * 获取指定文字对应字体的js Path
     * @param $appKey
     * @param $fontname     字体名称
     * @param string $text 需要获取的文字
     */
    public function getJsFont() {
        if (!isset($_REQUEST['fontid'])) {
            $this->common->errorList(19991);
        }
        $fontid = $_REQUEST['fontid'];

        if (!isset($_REQUEST['text'])) {
            $this->common->errorList(19990);
        }
        $text = $_REQUEST["text"];
        $font = $this->Font->getFontById($this->_app->id, $fontid);
        if (!$font) {
            $font = $this->Font->getFontById($this->_app->id, 136);
        }
        $arr = array();
        if ($text) {
            $text = urldecode($text);
            $text = preg_split('/(?<!^)(?!$)/u', $text);
            $text = array_unique($text);
            header('Content-Type:application/json;charset=utf-8');
            $font = $this->Font->get($fontid);
            $config = json_decode($font['Font']['config'], true);
            $this->loadModel('FontGlyphs');
            $glyphps = array();
            $fontGlyphs = $this->FontGlyphs->getByFontIdStr($fontid, $text);
            foreach ($fontGlyphs as $key => $value) {
                $value = $value['FontGlyphs'];
                $glyphps[$value['str']] = json_decode($value['glyph']);
            }
            $config['glyphs'] = $glyphps;
            echo 'Raphael.registerFont(' . $this->common->json_encode_cn($config) . ');';
            exit;
        }
        $fonts = $this->Font->getSvgFontById($this->_app->id, $fid, $text);
        if (empty($fonts)) {
            $this->common->errorList(11009);
        }
    }

}

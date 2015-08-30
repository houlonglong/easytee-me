<?php
/**
 * 字体
 */
class Model_Font extends BaseModel{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_get_list(){
        $fontCategorieId = self::_request("fontCategorieId");
        $fonts = self::_db(NEW_DB)->select_rows("select f.*,c.is_embroidery,c.font_count from font as f left join font_cat_rel as rel on rel.font_id = f.id left join font_cat as c on c.id = rel.cat_id where c.id = ?",$fontCategorieId);
        $FontList = array();
        foreach ($fonts as $key => $font) {
            $FontList[] = array(
                'name' => 'fonts',
                'attribute' => array(
                    'font_id' => $font['id'],
                    'name' => $font['name'],
                    'swfpath' => $font['swfpath'],
                    'jspath' => $font['jspath'],
                    'gifpath' => $font['gifpath'],
                    'is_embroidery' => $font['is_embroidery'],
                    'FontCount' => $font['font_count'],
                ),
            );
        }
        $result = array(
            'name' => 'FontList',
            'item' => $FontList,
        );
        xml_response($result);
    }
    function action_get_js_font(){
        $fontid = self::_request("fontid");
        $text = self::_request("text");
        $font = self::_db(NEW_DB)->select_row("select * from font where id = ?",$fontid);
        if (!$font) {
            $font = self::_db(NEW_DB)->select_row("select * from font where id = ?",136);
        }

        $arr = array();
        if ($text) {
            $text = urldecode($text);
            $text = preg_split('/(?<!^)(?!$)/u', $text);
            $text = array_unique($text);
            header('Content-Type:application/json;charset=utf-8');
            $config = json_decode($font['config'], true);
            $glyphps = array();
            $fontGlyphs = self::_db(NEW_DB)->select_rows("select * from font_glyph where font_id = ? and str in ('".implode("','",$text)."')",$fontid);
            foreach ($fontGlyphs as $value) {
                $glyphps[$value['str']] = json_decode($value['glyph']);
            }
            $config['glyphs'] = $glyphps;
            echo 'Raphael.registerFont(' . json_encode($config). ');'; exit;
        }
    }
    /**
     * 详情
     * @return array
     *
    function action_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }
     */

    /**
     * 详情
     * @param $id
     * @return array
     *
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
     */

    /**
     * 列表
     *
    function action_list(){
        return self::table_list();
    }
     */

    /**
     * 修改
     *
    function action_edit(){
        return self::table_edit();
    }
     */

    /*
    * 修改
    *
    static function table_edit(){
        $table = self::$table;
        return PtLib\table_edit($table);
    }
    */

    /*
    * 列表
    *
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = PtLib\get_table_list($table,$table_alias);
        return $response;
    }
    */
    /**
     * @param
     * @return
     *
    function action_test(){
        $request = PtLib\http_request("id");
        $data = array();
        $data['id'] = $request;
        return $data;
    }
     */
}
<?php
/**
 * 设计
 */
class Model_Design{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    static function reset_svg($svg){
        if (!preg_match('/<image(.*?)xlink:href="([0-9]+)"(.*?)\/>/i', $svg)) {
            return $svg;
        }
        preg_match_all('/<image(.*?)xlink:href="([0-9]+)"(.*?)\/>/i', $svg, $res);
        if (empty($res[2])) {
            return $svg;
        }
        $art_ids = $res[2];
        $arts = PtLib\db_select_rows("select id,thumb_jit,url,art_extension from arts where id in (".implode(",",$art_ids).")");
        foreach ($arts as $art) {
            //$image = $art['thumb_jit'];
            $image = $art['url'];
            if($image){
                $extension = $art['art_extension'];
                $file = file_get_contents($image);
                $file = base64_encode($file);
                $svg = preg_replace('/<image(.*?)xlink:href=\"' . $art['id'] . '\"(.*?)\/>/s', '<image$1xlink:href="data:image/'.$extension.';base64,' . $file . '"$2/>', $svg);

            }
        }
        return $svg;

    }
    /*
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
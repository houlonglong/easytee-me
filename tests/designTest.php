<?php
use PtLib\UnitTest as UnitTest;
/**
 * 设计
 * xml 格式化工具 http://tool.oschina.net/codeformat/xml/
 */
class DesignTest extends UnitTest{
    /**
     *
     *
    function test_cli_test(){
        $this->cli("deamon/task","run");
    }
     */
    /**
     * init
     */
    function test_action_init(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $this->set_test_host("2.dev.jzw.com");
        $res = $this->post_action("api",array(
            "model"=>"design",
            "action"=>"init",
            "pro_id"=>2,
        ));

        print_r($res);
    }
    function test_action_design_get(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $this->set_test_host("2.dev.jzw.com");
        $res = $this->post_action("api",array(
            "model"=>"design",
            "action"=>"get",
        ));

        print_r($res);
    }
    function test_action_design_save(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $xmlDesign = '<UserDesign><designs designer_version="HTML5DS" admin="None" is_embroidery="0" design_id="11" name="未命名" product_style_id="18" notes=""/><canvases canvas_id="-1"   distress_id="" is_distressed="0"  region="前胸" region_id="69" location="front" width="436" height="86" bgcolor="DEB7CA" shadow="false" /><canvas_text  x = "44" y = "256" width = "348" height = "69" value = "请输入文字" fill_color = "FFFFFF" stroke_color = "FFFFFF" shape = "arcup" font_id = "136" location = "FRONT"/></UserDesign>';

        $this->set_local_test_proxy();
        $this->set_test_host("2.dev.jzw.com");
        $res = $this->post_action("api",array(
            "model"=>"design",
            "action"=>"save",
            "xmlDesign"=>$xmlDesign
        ));
        print_r($res);
    }
    /**
     * 设计工具页面
     */
    function test_action_design(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>1,
        ));
        $this->set_local_test_proxy();
        $this->set_test_host("http://11.dev.jzw.com/");
        $res = $this->get_action("/design/");
        $r_url = $this->response_info['redirect_url'];
        $this->set_local_test_proxy();
        $res = $this->get_action($r_url);
        print_r($res);
    }

    /**
     * 初始化
     */
    function test_init_config(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->get_action("http://11.dev.jzw.com/init/getConfig/?appKey=wqdc&productId=2&embroideryMode=false");
        $xmlDatas = simplexml_load_string($res, 'SimpleXMLElement', LIBXML_NOCDATA);
        //echo $res;
        echo PtLib\unicodeString(json_encode($xmlDatas,JSON_PRETTY_PRINT));
    }

    /**
     * product_getCategoryList
     */
    function test_product_getCategoryList(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->get_action("http://11.dev.jzw.com/product/getCategoryList/?appKey=wqdc");
        $xmlDatas = simplexml_load_string($res, 'SimpleXMLElement', LIBXML_NOCDATA);
        //echo $res;
        echo PtLib\unicodeString(json_encode($xmlDatas,JSON_PRETTY_PRINT));
    }
    /**
     * test_Design_get
     */
    function test_Design_get(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->get_action("http://11.dev.jzw.com/Design/Get/?appKey=wqdc&designId=741&userToken=9fafd364225b156f23b4e17fe89d5e9763f94245");
        $xmlDatas = simplexml_load_string($res, 'SimpleXMLElement', LIBXML_NOCDATA);
        //echo $res;
        echo PtLib\unicodeString(json_encode($xmlDatas,JSON_PRETTY_PRINT));
    }

    function test_product_getlist(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->get_action("http://11.dev.jzw.com/product/getList/1/?productCategoryId=1&appKey=wqdc");
        $xmlDatas = simplexml_load_string($res, 'SimpleXMLElement', LIBXML_NOCDATA);
        //echo $res;
        echo PtLib\unicodeString(json_encode($xmlDatas,JSON_PRETTY_PRINT));
    }

    function test_product_get(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->get_action("http://11.dev.jzw.com/Product/Get/?appKey=wqdc&productId=2&productStyleId=18");
        $xmlDatas = simplexml_load_string($res, 'SimpleXMLElement', LIBXML_NOCDATA);
        //echo $res;
        echo PtLib\unicodeString(json_encode($xmlDatas,JSON_PRETTY_PRINT));
    }
    function test_font_getList(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->get_action("http://11.dev.jzw.com/font/getList/45/true/?fontCategorieId=45&appKey=wqdc");
        $xmlDatas = simplexml_load_string($res, 'SimpleXMLElement', LIBXML_NOCDATA);
        //echo $res;
        echo PtLib\unicodeString(json_encode($xmlDatas,JSON_PRETTY_PRINT));
    }

    function test_font_get(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->get_action("http://11.dev.jzw.com/font/getJsFont/?appKey=wqdc&fontid=136&text=%E8%AF%B7%E8%BE%93%E5%85%A5%E6%96%87%E5%AD%97");
        echo $res;
    }
    function test_activity_activityInfo(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->post_action("http://11.dev.jzw.com/activity/activityInfo/",array(
            "dataType"=>"json",
            "appKey"=>"json",
            "userToken"=>"9fafd364225b156f23b4e17fe89d5e9763f94245",
            "activityId"=>"741",
        ));
        echo json_encode(json_decode($res),JSON_PRETTY_PRINT);
    }
    function test_art_save(){
        $ch =curl_init();
        $cfile = curl_file_create(__DIR__.'/_res/3.png','image/png','file');
        $data = array('file' => $cfile);
        curl_setopt($ch,CURLOPT_URL,'http://11.dev.jzw.com/art/save/?appKey=wqdc&userToken=9fafd364225b156f23b4e17fe89d5e9763f94245&DesignID=767');
        curl_setopt($ch,CURLOPT_POST,true);
        curl_setopt($ch,CURLOPT_HTTPPROXYTUNNEL,true);
        curl_setopt($ch,CURLOPT_PROXY,"127.0.0.1:80");
        curl_setopt($ch,CURLOPT_VERBOSE,2);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
        $content = curl_exec($ch);
        echo $content;

    }
    function test_design_save(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->post_action("http://11.dev.jzw.com/design/save?appKey=wqdc&userToken=9fafd364225b156f23b4e17fe89d5e9763f94245",array(
            "xmlDesign"=>'<UserDesign><designs designer_version="HTML5DS" admin="None" is_embroidery="0" design_id="741" name="未命名" product_style_id="18" notes=""/><canvases canvas_id="-1"   distress_id="" is_distressed="0"  region="前胸" region_id="69" location="front" width="436" height="86" bgcolor="DEB7CA" shadow="false" /><canvas_text  x = "44" y = "256" width = "348" height = "69" value = "请输入文字11" fill_color = "FFFFFF" stroke_color = "FFFFFF" shape = "arcup" font_id = "145" location = "FRONT"/></UserDesign>',
            "svgfront"=>'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="270" version="1.1" width="202.5" id="svg1" style="overflow: hidden; position: relative; height: 270px;" preserveAspectRatio="xMinYMin"></svg>'
        ));
        echo $res;
    }
    function test_active_save(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->post_action("http://11.dev.jzw.com/activity/save/",array(
            "dataType"=>'json',
            "appKey"=>'wqdc',
            "userToken"=>'9fafd364225b156f23b4e17fe89d5e9763f94245',
            "type"=>0,
            "activityId"=>741,
            "designId"=>741,
            "target"=>50,
            "products[0][id]"=>'2',
            "products[0][price]:"=>'47',
            "products[0][styles][0][id]"=>'18',
        ));
        echo $res;
    }
    function test_active_saveActivityInfo(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->post_action("http://11.dev.jzw.com/activity/saveActivityInfo/",array(
            "dataType"=>'json',
            "appKey"=>'wqdc',
            "userToken"=>'9fafd364225b156f23b4e17fe89d5e9763f94245',
            "type"=>0,
            "activityId"=>741,
            "designId"=>741,
            "name"=>"name",
            "description"=>"<p>desc</p>",
            "deadline"=>15,
            "deliveryType"=>"custom",
            "freePostage"=>false,
            "addressInfo"=>"",
        ));
        echo $res;
    }
}
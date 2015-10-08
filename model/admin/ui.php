<?php
/**
 *
 */
class Model_Admin_Ui{
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
    static function siderbar(){
        $menus = file_get_contents(PATH_CONFIG."/architecture/setting.json");
        return json_decode($menus,1);
    }
    static function html_title(){

    }
    static function get_menu_url($menu){
        if(empty($menu['url']))
            return "javascript:void(0);";
        else{
            $url = $menu['url'];
            return substr($url,-4) == ".php"?substr($url,0,-4):$url;
        }
    }
    static function siderbar_active_sub_menu($sub_menu){
        $url = self::get_menu_url($sub_menu);
        return ($url == PtApp::$control)?"active":"";
    }
    static function siderbar_active_menu($menu){
        $url = self::get_menu_url($menu);
        if(!empty($menu['control'])){
            foreach($menu['control'] as $sub_menu){
                $sub_menu_url = self::get_menu_url($sub_menu);
                if($sub_menu_url == PtApp::$control){
                    PtApp::$breadcrumb = array(
                        array(
                            "title"=>$menu['title'],
                            'url'=>$url
                        ),
                        $sub_menu,
                    );
                    return "active open";
                }
            }
        }
        return ($url == PtApp::$control)?"active":"";
    }
    static function breadcrumb(){
        echo '<li><i class="ace-icon fa fa-home home-icon"></i> 首页</li>';
        $title = "";
        if(!empty(PtApp::$breadcrumb)){
            $last = array_pop(PtApp::$breadcrumb);
            $title = $last['title']."";
            foreach(PtApp::$breadcrumb  as $breadcrumb){
                echo '<li><a href="'.$breadcrumb['url'].'">'.$breadcrumb['title'].'</a></li>';
                $title .= " - ".$breadcrumb['title'];
            }
            echo '<li class="active">'.$last['title'].'</li>';
        }
        echo "<script>document.title = '$title';</script>";
    }
}


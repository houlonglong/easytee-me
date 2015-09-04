<?php
function parse_control($control){
    $act = "/activity/";
    $_control = substr($control,0,strlen($act));
    if($_control == $act){
        $_REQUEST['id'] = $_GET['id'] = str_replace($act,"",$control);
        $control = "/activity";
    }
    return $control;
}
/**
 * 判断是不是微信浏览器
 * @return bool
 */
function is_wechat_browser(){
    return isset($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false;
}
function email_check($email){
    // Remove all illegal characters from email
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    // Validate e-mail
    return !filter_var($email, FILTER_VALIDATE_EMAIL) === false;
}
function date_time_now(){
    return date("Y-m-d H:i:s");
}
/**
 * @param $content
 * @return mixed
 */
function replace_cdn($content){
    return str_replace("REPLACE_DOMAIN_WITH",CDN_DOMAIN_OPEN,$content);
}
function xml_response($xml){
    header("Content-Type:text/xml");
    if(is_array($xml)) $xml = arrayToXML($xml);
    echo $xml;exit;
}
function arrayToXML($Arraydata) {
    $xml = '';
    if (isset($Arraydata[0])) {
        foreach ($Arraydata as $key => $value) {
            $xml .= arrayToXML($value);
        }
    } else {

        if (isset($Arraydata['attribute']) && is_array($Arraydata['attribute'])) {
            $xml .= "<" . $Arraydata['name'] . ' ';
            foreach ($Arraydata['attribute'] as $akey => $attr) {
                $xml .= $akey . '="' . htmlspecialchars($attr) . '" ';
            }
        } else {
            $xml .= "<" . $Arraydata['name'];
        }
        if (isset($Arraydata['value'])) {
            $xml .= '>' . @htmlspecialchars($Arraydata['value']) . '</' . $Arraydata['name'] . '>';
            ;
        } else {
            if (isset($Arraydata['item']) && is_array($Arraydata['item']) && $Arraydata['item']) {
                $xml .='>';
                $xml .= arrayToXML($Arraydata['item']);
                $xml .= @htmlspecialchars("") . '</' . $Arraydata['name'] . '>';
            } else {
                $xml .= '/>';
            }
        }
    }
    return $xml;
}



/*
 *
 *
#$_SERVER['REQUEST_URI'] = "/test?a=1&b=2&p=2";

$p = (empty($_GET['p'])  || intval($_GET['p']) == 0) ? 1 : intval($_GET['p']);

$params = array(
    'total_rows'=>$total, #(必须)
    'list_rows'=>$limit,
    'now_page'  =>$p,  #(必须),
    'base_url' => "/cat.php"
);
$pager = new PtPager($params);
echo $pager;

 *
 */

class PtPager
{
    public     $first_row;        //起始行数
    public     $list_rows;        //列表每页显示行数
    protected  $total_pages;      //总页数
    protected  $total_rows;       //总行数
    protected  $now_page;         //当前页数
    protected  $method  = 'defalut'; //处理情况 Ajax分页 Html分页(静态化时) 普通get方式
    protected  $parameter = '';
    protected  $page_name;        //分页参数的名称
    protected  $ajax_func_name;
    public     $plus = 3;         //分页偏移量
    protected  $url;

    /**
     * 构造函数
     * @param unknown_type $data
     */
    public function __construct($data = array())
    {
        $this->total_rows = $data['total_rows'];
        $this->base_url   = isset($data['base_url'])?$data['base_url']:"/";
        $this->parameter         = !empty($data['parameter']) ? $data['parameter'] : '';
        $this->list_rows         = !empty($data['list_rows']) && $data['list_rows'] <= 100 ? $data['list_rows'] : 15;
        $this->total_pages       = ceil($this->total_rows / $this->list_rows);
        $this->page_name         = !empty($data['page_name']) ? $data['page_name'] : 'p';
        $this->ajax_func_name    = !empty($data['ajax_func_name']) ? $data['ajax_func_name'] : '';

        $this->method           = !empty($data['method']) ? $data['method'] : '';

        /* 当前页面 */
        if(!empty($data['now_page']))
        {
            $this->now_page = intval($data['now_page']);
        }else{
            $this->now_page   = !empty($_GET[$this->page_name]) ? intval($_GET[$this->page_name]):1;
        }
        $this->now_page   = $this->now_page <= 0 ? 1 : $this->now_page;


        if(!empty($this->total_pages) && $this->now_page > $this->total_pages)
        {
            $this->now_page = $this->total_pages;
        }
        $this->first_row = $this->list_rows * ($this->now_page - 1);
    }

    /**
     * 得到当前连接
     * @param $page
     * @param $text
     * @return string
     */
    protected function _get_link($page,$text,$cls = '')
    {
        if($cls != ''){
            $cls = 'class="'.$cls.'"';
        }
        switch ($this->method) {
            case 'ajax':
                $parameter = '';
                if($this->parameter)
                {
                    $parameter = ','.$this->parameter;
                }
                return '<a onclick="' . $this->ajax_func_name . '(\'' . $page . '\''.$parameter.')" href="javascript:void(0)">' . $text . '</a>' . "\n";
                break;

            case 'html':
                $url = str_replace('?', $page,$this->parameter);
                return '<a href="' .$url . '">' . $text . '</a>' . "\n";
                break;

            default:
                return '<a '.$cls.' href="' . $this->_get_url($page) . '">' . $text . '</a>';
                break;
        }
    }


    /**
     * 设置当前页面链接
     */
    protected function _set_url()
    {
        $query = isset($_SERVER['QUERY_STRING'])?$_SERVER['QUERY_STRING']:'';
        $url = $this->base_url;
        if($query) {
            parse_str($query,$params);
            unset($params[$this->page_name]);
            unset($params["__R__"]);
            unset($params["__tag_name__"]);
            if($params){
                $url   .=  "?".http_build_query($params)."&";
            }else{
                $url .= '?';
            }

        }else{
            $url .= '?';
        }

        $this->url = $url;
    }

    /**
     * 得到$page的url
     * @param $page 页面
     * @return string
     */
    protected function _get_url($page)
    {
        if($this->url === NULL)
        {
            $this->_set_url();
        }
        //  $lable = strpos('&', $this->url) === FALSE ? '' : '&';
        return $this->url . $this->page_name . '=' . $page;
    }


    /**
     * 得到第一页
     * @return string
     */
    public function first_page($name = '第一页')
    {
        if($this->now_page > 5)
        {
            return $this->_get_link('1', $name);
        }
        return '';
    }

    /**
     * 最后一页
     * @param $name
     * @return string
     */
    public function last_page($name = '最后一页')
    {
        if($this->now_page < $this->total_pages - 5)
        {
            return $this->_get_link($this->total_pages, $name);
        }
        return '';
    }

    /**
     * 上一页
     * @return string
     */
    public function up_page($name = '◀')
    {
        if($this->now_page != 1)
        {
            return $this->_get_link($this->now_page - 1, $name,"previous_page");
        }
        return '<span class="previous_page disabled">◀</span>';
    }

    /**
     * 下一页
     * @return string
     */
    public function down_page($name = '▶')
    {
        if($this->now_page < $this->total_pages)
        {
            return $this->_get_link($this->now_page + 1, $name,"next_page");
        }
        return '<span class="next_page disabled">▶</span>';
    }


    public function display()
    {
        if($this->total_rows < 1)
        {
            return '';
        }

        if($this->total_pages != 1)
        {
            $return = '<div class="pagination">';
            $return .= $this->up_page('◀')."\n";
            for($i = 1;$i<=$this->total_pages;$i++)
            {
                if($i == $this->now_page)
                {
                    $return .= '<em class="current">'.$i.'</em>'."\n";
                }
                else
                {
                    if($this->now_page-$i>=4 && $i != 1)
                    {
                        $return .= '<span class="gap">…</span>'."\n";
                        $i = $this->now_page-3;
                    }
                    else
                    {
                        if($i >= $this->now_page+5 && $i != $this->total_pages)
                        {
                            $return .= '<span class="gap">…</span>'."\n";
                            $i = $this->total_pages;
                        }
                        $return .= $this->_get_link($i, $i) . "\n";
                    }
                }
            }
            $return .= $this->down_page('▶');

            $return .= '</div>';

        }else{
            $return = "";
        }
        return $return;



    }
    function __toString(){
        $str = $this->display();
        return $str;
    }

}
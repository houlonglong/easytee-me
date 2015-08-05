<?php

require_once APP . '/webroot/aliyun2/sdk.class.php';

class openEditComment {

    private $dataType = 'XML';

    public function __construct() {
        if (isset($_REQUEST['dataType']) && !empty($_REQUEST['dataType'])) {
            $this->dataType = strtoupper($_REQUEST['dataType']);
        }
    }

    public function array2xml($Arraydata, $tag = '') {
        $xml = '';
        foreach ($Arraydata as $key => $value) {
            if (is_numeric($key)) {
                if (is_array($value)) {
                    $xml .= "<$tag>";
                    $xml .= self::array2xml($value);
                    $xml .= "</$tag>";
                } else {
                    $xml .= "<$tag>$value</$tag>";
                }
            } else {
                if (is_array($value)) {
                    $keys = array_keys($value);
                    if (@is_numeric($keys[0])) {
                        $xml .= self::array2xml($value, $key);
                    } else {
                        $xml .= "<$key>";
                        $xml .= self::array2xml($value);
                        $xml .= "</$key>";
                    }
                } else {
                    $xml .= "<$key>$value</$key>";
                }
            }
        }
        return $xml;
    }

    public function array2json($data) {
        if (is_array($data)) {
            $data = $this->json_encode_cn($data);
            return urldecode($this->formatJson($data));
        }
    }

    public function formatJson($jsonData) {
        $formatted = $jsonData;
        $formatted = str_replace('"{', '{', $formatted);
        $formatted = str_replace('}"', '}', $formatted);
        return $formatted;
    }

    public function response($data, $status = 200) {
        $this->status = $status;
        $this->set_headers();

        if ($this->dataType == 'XML') {
            echo is_array($data) ? $this->arrayToXML($data) : $data;
        } else {
            if (isset($_REQUEST['easytee_callback']) && $_REQUEST['easytee_callback']) {
                $data = is_array($data) ? $this->array2json($data) : $data;
                echo $_REQUEST['easytee_callback'] . "(" . $data . ");";
            } else {
                echo is_array($data) ? $this->array2json($data) : $data;
            }
        }
        exit;
    }

    public function errorList($status) {
        $str = '';
        switch ($status) {
            case 1:
                $str = array(
                    "message" => '缺少参数',
                    "code" => "INVALID_SERVICE"
                );
                break;
            case 10001:
                $str = array(
                    "message" => '不存在的服务',
                    "code" => "INVALID_SERVICE"
                );
                break;
            case 10002:
                $str = array(
                    "message" => '未注册的APP',
                    "code" => "ERROR_APPKEY"
                );
                break;
            case 10003:
                $str = array(
                    "message" => '缺少appkey',
                    "code" => "ERROR_APPKEY"
                );
                break;
            case 10004:
                $str = array(
                    "message" => '缺少secret',
                    "code" => "ERROR_SECRET"
                );
                break;
            case 10005:
                $str = array(
                    "message" => '缺少Sign',
                    "code" => "ERROR_TOKEN"
                );
                break;

            case 10007:
                $str = array(
                    "message" => '错误的User Token',
                    "code" => "ERROR_USER_TOKEN"
                );
                break;
            case 10008:
                $str = array(
                    "message" => '错误的作用域',
                    "code" => "ERROR_DOMAIN"
                );
                break;
            case 10009:
                $str = array(
                    "message" => '错误的Token',
                    "code" => "ERROR_TOKEN"
                );
                break;
            case 10010:
                $str = array(
                    "message" => '没有数据需要更新',
                    "code" => "ERROR_TOKEN"
                );
                break;
            case 10011:
                $str = array(
                    "message" => '缺少SIGN',
                    "code" => "ERROR_TOKEN"
                );
                break;
            case 11000:
                $str = array(
                    "message" => '缺少的UID',
                    "code" => "ERROR_UID_IS_NULL"
                );
                break;
            case 11008:
                $str = array(
                    "message" => '图片上传失败',
                    "code" => "ERROR_UPLOAD_PICTURE"
                );
                break;
            case 11009:
                $str = array(
                    "message" => '缺少Publish ID',
                    "code" => "ERROR_PUBLISH_ID"
                );
                break;
            case 11006:
                $str = array(
                    "message" => '缺少Product ID',
                    "code" => "ERROR_PRODUCT_ID"
                );
                break;
            case 11010:
                $str = array(
                    "message" => '缺少产品分类 ID或产品分类不存在',
                    "code" => "ERROR_PRODUCT_CATEGORY_ID"
                );
                break;
            case 11011:
                $str = array(
                    "message" => '默认产品不存在',
                    "code" => "ERROR_PRODUCT_ID"
                );
                break;
            case 11012:
                $str = array(
                    "message" => '当前Product ID产品不存在',
                    "code" => "ERROR_PRODUCT_ID"
                );
                break;
            case 11013:
                $str = array(
                    "message" => '当前Product ID产品对应的样式不存在',
                    "code" => "ERROR_PRODUCT_ID"
                );
                break;
            case 11014:
                $str = array(
                    "message" => '当前Product Style ID不存在在',
                    "code" => "ERROR_PRODUCT_STYLE_ID"
                );
                break;
            case 19990:
                $str = array(
                    "message" => '缺少TEXT',
                    "code" => "ERROR_FONT_NAME"
                );
                break;
            case 19991:
                $str = array(
                    "message" => '缺少Font ID',
                    "code" => "ERROR_FONT_NAME"
                );
                break;
            case 20001:
                $str = array(
                    "message" => '缺少Font Category ID',
                    "code" => "ERROR_CATEGORY_ID"
                );
                break;
            case 20002:
                $str = array(
                    "message" => '当前APP ID 查找不到对应的字体',
                    "code" => "ERROR_APP_ID"
                );
                break;
            case 20003:
                $str = array(
                    "message" => 'Font Category ID',
                    "code" => "ERROR_CATEGORY_ID"
                );
                break;
            case 30000:
                $str = array(
                    "message" => '当前APP ID 查找不到对应的颜色分类',
                    "code" => "ERROR_APP_ID"
                );
                break;
            case 40000:
                $str = array(
                    "message" => '当前Art ID 不存在',
                    "code" => "ERROR_ART_ID"
                );
                break;
            case 50000:
                $str = array(
                    "message" => '当前Design ID不存在',
                    "code" => "ERROR_DESIGN_ID"
                );
                break;
            case 500001:
                $str = array(
                    "message" => '有编辑该Design的权限',
                    "code" => "ERROR_DESIGN_NOT_PUBLIC"
                );
                break;
            case 500102:
                $str = array(
                    "message" => '缺少设计内容',
                    "code" => "ERROR_DESIGN_IS_EMPTY"
                );
                break;
            case 500103:
                $str = array(
                    "message" => '提交保存的XML格式有误',
                    "code" => "ERROR_DESIGN_XML_ERROR"
                );
                break;
            case 500304:
                $str = array(
                    "message" => '商品不存在或者已下架',
                    "code" => "ERROR_PRODUCT_IS_NULL"
                );
                break;
            case 500305:
                $str = array(
                    "message" => '对应的款式不存在或者已下架',
                    "code" => "ERROR_PRODUCT_STYLE_IS_NULL"
                );
                break;
            case 500306:
                $str = array(
                    "message" => '该商品的尺码已经断供',
                    "code" => "ERROR_PRODUCT_SIZE_IS_NULL"
                );
                break;
            case 500307:
                $str = array(
                    "message" => '部分尺码已经断供',
                    "code" => "ERROR_PRODUCT_SIZE_IS_NULL"
                );
                break;
            case 600000:
                $str = array(
                    "message" => '收件人不能为空',
                    "code" => "ERROR_ADDRESS_NAME_ERROR"
                );
                break;
            case 600001:
                $str = array(
                    "message" => '收件人手机号码不能为空',
                    "code" => "ERROR_MOBILE_NUMBER_ERROR"
                );
                break;
            case 600002:
                $str = array(
                    "message" => '收件人所在省份不能为空',
                    "code" => "ERROR_ADDRESS_PROVICE_ERROR"
                );
                break;
            case 600003:
                $str = array(
                    "message" => '收件人所在国家不能为空',
                    "code" => "ERROR_DESIGN_XML_ERROR"
                );
                break;
            case 600004:
                $str = array(
                    "message" => '收件人所在城市不能为空',
                    "code" => "ERROR_DESIGN_XML_ERROR"
                );
                break;
            case 600005:
                $str = array(
                    "message" => '收件人所在街道不能为空',
                    "code" => "ERROR_DESIGN_XML_ERROR"
                );
                break;
            case 600006:
                $str = array(
                    "message" => '地址保存不成功',
                    "code" => "ERROR_ADDRESS_SAVE_ERROR"
                );
                break;
            case 600007:
                $str = array(
                    "message" => 'id对应的地址不存在',
                    "code" => "ERROR_ADDRESS_NOT_EXISTS_ERROR"
                );
                break;
            case 600008:
                $str = array(
                    "message" => '请输入id',
                    "code" => "ERROR_ADDRESS_NOT_EXISTS_ERROR"
                );
                break;
            case 700000:
                $str = array(
                    "message" => '当前活动不存在',
                    "code" => "ERROR_ACTIVITY__ERROR"
                );
                break;
            case 700001:
                $str = array(
                    "message" => '当前活动已过期',
                    "code" => "ERROR_ACTIVITY_TIME_OUT_ERROR"
                );
                break;
            case 700002:
                $str = array(
                    "message" => '删除活动产品样式表失败',
                    "code" => "ERROR_DELETE_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 700003:
                $str = array(
                    "message" => '更新活动失败',
                    "code" => "ERROR_UPDATE_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 700004:
                $str = array(
                    "message" => '保存活动产品样式失败',
                    "code" => "ERROR_SAVE_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 700005:
                $str = array(
                    "message" => '活动类型没有定义',
                    "code" => "ERROR_SAVE_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 700006:
                $str = array(
                    "message" => '活动详情不能为空',
                    "code" => "ERROR_ACTIVITY_DESC_IS_NULL_ERROR"
                );
                break;
            case 700007:
                $str = array(
                    "message" => '活动名称不能为空',
                    "code" => "ERROR_ACTIVITY_NAME_IS_NULL_ERROR"
                );
                break;
            case 700008:
                $str = array(
                    "message" => '活动结束时间不能为空',
                    "code" => "ERROR_ACTIVITY_END_TIME_IS_NULL_ERROR"
                );
                break;
            case 700009:
                $str = array(
                    "message" => '活动统一配送地址有误',
                    "code" => "ERROR_ACTIVITY_ADDRESS_ERROR"
                );
                break;
            case 700010:
                $str = array(
                    "message" => '活动产品样式为空',
                    "code" => "ERROR_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 700011:
                $str = array(
                    "message" => '当前活动设计没有Canvas，不能复制',
                    "code" => "ERROR_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 701001:
                $str = array(
                    "message" => 'POST活动产品样式不能为空',
                    "code" => "ERROR_POST_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 701002:
                $str = array(
                    "message" => 'POST活动产品尺码不能为空',
                    "code" => "ERROR_POST_ACTIVITY_PRODUCT_STYLE_ERROR"
                );
                break;
            case 701003:
                $str = array(
                    "message" => 'POST活动产品购买数量不能为空',
                    "code" => "ERROR_POST_ACTIVITY_PRODUCT_QUANTITY_ERROR"
                );
                break;
            case 701004:
                $str = array(
                    "message" => 'POST活动产品支付方式不能为空',
                    "code" => "ERROR_POST_ACTIVITY_PRODUCT_PAY_TYPE_ERROR"
                );
                break;
            case 701005:
                $str = array(
                    "message" => 'POST活动产品支付方式不能为空',
                    "code" => "ERROR_POST_ACTIVITY_PRODUCT_PAY_TYPE_ERROR"
                );
                break;
            case 800000:
                $str = array(
                    "message" => '订单状态不能为空',
                    "code" => "ERROR_ORDER_STATUS_IS_NULL_ERROR"
                );
                break;
            case 800001:
                $str = array(
                    "message" => '订单Id不能为空',
                    "code" => "ERROR_ORDER_ID_IS_NULL_ERROR"
                );
                break;
        }
        $this->response(array(
            "name" => 'error',
            "attribute" => array("code" => $str["code"]),
            "value" => $str["message"],
                ), 500);
        exit;
    }

    public function response_error($msg, $code = "") {
        $this->response(array(
            "name" => 'error',
            "attribute" => array("code" => $code),
            "value" => $msg,
                ), 500);
        exit;
    }

    public function set_headers() {
        header("HTTP/1.1 " . $this->status . " " . $this->get_status_message());
        #header("Access-Control-Allow-Origin:*");
        header("Content-Type:" . ($this->dataType == 'XML' ? 'text/xml' : 'application/json') . ';charset=utf-8');
    }

    public function get_status_message() {
        $status = array(
            200 => 'OK',
            201 => 'Created',
            204 => 'No Content',
            404 => 'Not Found',
            406 => 'Not Acceptable',
            500 => 'Internal Server Error',
        );
        return ($status[$this->status]) ? $status[$this->status] : $status[500];
    }

    public function aasort($source_array, $order_field, $sort_type = 'DESC', $index = false) {
        if (!is_array($source_array) or sizeof($source_array) == 0) {
            return false;
        }

        foreach ($source_array as $array_key => $array_row) {
            $sort_array[$array_key] = $array_row[$order_field];
        }

        $sort_func = ($sort_type == 'ASC' ? 'asort' : 'arsort');

        $sort_func($sort_array);

        // 重组数组
        $keyIndex = 0;
        foreach ($sort_array as $key => $val) {
            $keyIndex = $index ? $keyIndex : $key;
            $sorted_array[$keyIndex] = $source_array[$key];
            $keyIndex++;
        }

        return $sorted_array;
    }

    function arrayToXML($Arraydata) {
        $xml = '';
        if (isset($Arraydata[0])) {
            foreach ($Arraydata as $key => $value) {
                $xml .= self::arrayToXML($value);
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
                    $xml .= self::arrayToXML($Arraydata['item']);
                    $xml .= @htmlspecialchars($Arraydata['value']) . '</' . $Arraydata['name'] . '>';
                } else {
                    $xml .= '/>';
                }
            }
        }
        return $xml;
    }

    function json_encode_cn($var) {
        if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
            return json_encode($var, JSON_UNESCAPED_UNICODE);
        } else {
            return preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2BE', 'UTF-8', pack('H4', '\\1'))", json_encode($var));

            if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
                return preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2LE', 'UTF-8', pack('H4', '\\1'))", json_encode($var));
            } else {
                return preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2BE', 'UTF-8', pack('H4', '\\1'))", json_encode($var));
            }
        }
    }

    function saveUploadFiles($id,$rand) {
        if (isset($_FILES['Filename'])) {
            $files = $_FILES['Filename'];
            // 获取svg转换位图后的图片
            $extention = str_replace('image/', '', $files['type']);
            $originalName = $files['name'];
            $filepath = $files['tmp_name'];
            $filename = $originalName . $rand . '.' . $extention;
            $newfilename = $originalName;
            $path = "arts/svg/{$id}/{$newfilename}";
            $type = 'svg';
        } else {
            $files = $_FILES['file'];
            $extention = str_replace('image/', '', $files['type']);
            if (in_array(strtolower($extention), array('jpg', 'jpeg', 'png', 'gif', 'bmp'))) {
                $originalName = $files['name'];
                $filename = $originalName . $rand . '.' . $extention;
                $newfilename = $filename;
                $filepath = $files['tmp_name'];
                m_log($filepath);
                $path = "arts/Bitmap/{$id}/{$newfilename}";
                $type = 'bit';
            }
            //TODO 矢量图的处理
        }
        $thumbpath = "arts/Art/{$id}/{$filename}";
        $path = '' . $path;
        $data['file'] = base64_encode(file_get_contents($files['tmp_name']));
        $data['type'] = $type;
        $data['thumbpath'] = $thumbpath;
        $data['path'] = $path;
        task_notice(EASYTEE_SERVICE_UPLOAD, $data, 'POST');
        $arr = array(
            'extention' => $extention,
            'originalPath' => "REPLACE_DOMAIN_WITH".$path,
            'thumbpath' => "REPLACE_DOMAIN_WITH".$thumbpath,
            'originalName' => $originalName,
        );
        return $arr;
    }

    /**
     * 把数组所有元素  按照“参数=参数值”的模式用“&”字符拼接成字符串
     * @param $para ;需要拼接的数组
     * @return 拼接完成以后的字符串
     */
    function createLinkstring($para) {
        $arg = "";

        $para = $this->paraFilter($para);
        while (list ($key, $val) = each($para)) {
            $arg.=$key . "=" . $val . "&";
        }
        //去掉最后一个&字符
        $arg = substr($arg, 0, count($arg) - 2);

        //如果存在转义字符，那么去掉转义
        if (get_magic_quotes_gpc()) {
            $arg = stripslashes($arg);
        }

        return $arg;
    }

    /**
     * 除去数组中的空值和签名参数
     * @param $para 签名参数组
     * @return 去掉空值与签名参数后的新签名参数组
     */
    private function paraFilter($para) {
        $para_filter = array();
        $keys = array(
            'signTime',
            'sign',
            'url',
            'dataType',
        );
        while (list ($key, $val) = each($para)) {
            if (in_array($key, $keys))
                continue;
            else
                $para_filter[$key] = $para[$key];
        }
        return $this->argSort($para_filter);
    }

    /**
     * 对数组排序
     * @param $para 排序前的数组
     * @return 排序后的数组
     */
    private function argSort($para) {
        ksort($para);
        reset($para);
        return $para;
    }

    function filterHtml($str) {
        $str = strip_tags($str);
        $str = preg_replace("/\t/", "", $str); //使用正则表达式替换内容，如：空格，换行，并将替换为空。
        $str = preg_replace("/\r\n/", "", $str);
        $str = preg_replace("/\r/", "", $str);
        $str = preg_replace("/\n/", "", $str);
        $str = preg_replace("/ /", "", $str);
        $str = preg_replace("/  /", "", $str);  //匹配html中的空格
        return $str; //返回字符串
    }

    /**
     * svg 图片转换为位图
     */
    function svgToBitmap($appTemplateSvg) {
        $ch = curl_init();
        $options = array(
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_HEADER => FALSE,
            CURLOPT_SSL_VERIFYPEER => FALSE,
            CURLOPT_USERAGENT => 'Easytee PHP SDK by yfzhu',
            CURLOPT_POST => TRUE,
            CURLOPT_POSTFIELDS => $appTemplateSvg,
            CURLOPT_URL => EASYTEE_CONVERT,
        );
        $options[CURLOPT_HTTPHEADER] = array(
            'Content_type: application/x-www-form-urlencoded', 'Expect:'
        );
        curl_setopt_array($ch, $options);
        $result = curl_exec($ch);
        return $result;
    }

}

<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 15/8/17
 * Time: 下午10:44
 */

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
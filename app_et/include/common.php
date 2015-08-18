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
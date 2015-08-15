<?php
namespace PtLib;

/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/17/15
 * Time: 12:33 PM
 */

class Crypt{
    static function format_field($s){
        return strlen($s).":".$s;
    }

    static function _create_signature($secret,$to_sign){
        return hash_hmac("sha256", $to_sign, $secret);
    }

    static function create_signed_value($secret, $name, $value){
        $timestamp = time();

        $value = base64_encode($value);

        $t = array(
            "2|1:0",
            self::format_field($timestamp),
            self::format_field($name),
            self::format_field($value),
            ''
        );

        $to_sign = implode("|",$t);
        $signature = self::_create_signature($secret, $to_sign);
        return $to_sign . $signature;
    }
    static function _consume_field($s){
        $i = strpos($s,":");
        $j = strpos($s,"|");
        #\Console::log(" : position :{1}",$i);
        #\Console::log(" | position :{1}",$j);
        $len = substr($s,0,$i);
        $field_value = substr($s,$i+1,$j-$i-1);
        #\Console::log(" len :{1}",$len);
        #\Console::log(" field_value :{1}",$field_value);
        $rest = substr($s,$j+1);
        return array(
            'field_value'=>$field_value,
            'rest'=>$rest,
        );
    }
    static function decode_signed_value($secret, $name, $value, $max_age_days=31){
        $clock = time();
        $rest = substr($value,2);
        #\Console::log($rest);
        $res = self::_consume_field($rest);
        #\Console::log($res);
        $key_version = $res['field_value'];
        $rest = $res['rest'];

        $res = self::_consume_field($rest);
        #\Console::log($res);
        $timestamp = $res['field_value'];
        $rest = $res['rest'];


        $res = self::_consume_field($rest);
        #\Console::log($res);
        $name_field = $res['field_value'];
        $rest = $res['rest'];

        $res = self::_consume_field($rest);
        #\Console::log($res);
        $value_field = $res['field_value'];
        $rest = $res['rest'];
        $passed_sig = $rest;
        $signed_string = substr($value,0,-strlen($passed_sig));

        $expected_sig = self::_create_signature($secret, $signed_string);
        #\Console::log($expected_sig);
        #\Console::log($passed_sig);
        if($expected_sig != $passed_sig){
            return null;
        }
        if($name_field != $name){
            return null;
        }

        if(intval($timestamp) < (time() - $max_age_days * 86400)){
            return null;
        }

        return base64_decode($value_field);
    }

}
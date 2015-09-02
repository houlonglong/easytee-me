订单
======

#订单保存

Api Url
------

    /api?model=order&action=save

请求参数
------

     {
         "model": "order",
         "action": "save",
         "act_id": 1,
         "goods": "[{\"style_id\":1,\"size\":\"XL\",\"quantity\":1}]",
         "pay_type": 0,
         "ship_name": "李四",
         "ship_tel": "13555555555",
         "ship_province": "上海市",
         "ship_city": "上海市",
         "ship_county": "长宁",
         "exp_price": 8,
         "notes": ""
     }

响应
------



正常:



     {

     }


异常:

    {

    }
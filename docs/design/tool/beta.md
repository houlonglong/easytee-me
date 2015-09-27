设计工具
======

获取设计初始化信息
------

Api Url
------

    /api

请求参数
------

     {
         "model": "design/tool/beta",
         "action": "design_init",
         "json": 1
     }

响应
------

正常:

     {
         "return": {
             "product_info": {
                 "cats": {
                     "4": {#产品分类ID
                         "cat_name": "短袖T恤"
                     },
                     "6": {
                         "cat_name": "速干衫"
                     },
                     "1": {
                         "cat_name": "套头卫衣"
                     }
                 },
                 "products": {
                     "4": {
                         "1": {
                             "product_name": "圆领通款",
                             "man_name": "纯色大王",
                             "brand_name": "Gildan",
                             "product_design": [
                                 {
                                     "product_id": 1,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/front.png",
                                     "x": "285.0",
                                     "y": "210.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 1,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/back.png",
                                     "x": "287.0",
                                     "y": "180.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 1,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/third.png",
                                     "x": "340.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 1,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/fourth.png",
                                     "x": "350.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "2": {
                             "product_name": "圆领男款",
                             "man_name": "纯色大王",
                             "brand_name": "Gildan",
                             "product_design": [
                                 {
                                     "product_id": 2,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/front.png",
                                     "x": "285.0",
                                     "y": "210.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 2,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/back.png",
                                     "x": "287.0",
                                     "y": "180.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 2,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/third.png",
                                     "x": "340.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 2,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/2\/fourth.png",
                                     "x": "350.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "3": {
                             "product_name": "圆领女款",
                             "man_name": "纯色大王",
                             "brand_name": "Gildan",
                             "product_design": [
                                 {
                                     "product_id": 3,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/3\/front.png",
                                     "x": "320.0",
                                     "y": "230.0",
                                     "w": "363.0",
                                     "h": "454.0"
                                 },
                                 {
                                     "product_id": 3,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/3\/back.png",
                                     "x": "320.0",
                                     "y": "210.0",
                                     "w": "363.0",
                                     "h": "454.0"
                                 },
                                 {
                                     "product_id": 3,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/3\/third.png",
                                     "x": "420.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 3,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/3\/fourth.png",
                                     "x": "290.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "4": {
                             "product_name": "圆领男款",
                             "man_name": "达衫",
                             "brand_name": "E&T",
                             "product_design": [
                                 {
                                     "product_id": 4,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/4\/front.png",
                                     "x": "285.0",
                                     "y": "210.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 4,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/4\/back.png",
                                     "x": "287.0",
                                     "y": "180.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 4,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/4\/third.png",
                                     "x": "340.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 4,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/4\/fourth.png",
                                     "x": "350.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "5": {
                             "product_name": "圆领女款",
                             "man_name": "达衫",
                             "brand_name": "E&T",
                             "product_design": [
                                 {
                                     "product_id": 5,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/5\/front.png",
                                     "x": "320.0",
                                     "y": "230.0",
                                     "w": "363.0",
                                     "h": "454.0"
                                 },
                                 {
                                     "product_id": 5,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/5\/back.png",
                                     "x": "320.0",
                                     "y": "210.0",
                                     "w": "363.0",
                                     "h": "454.0"
                                 },
                                 {
                                     "product_id": 5,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/5\/third.png",
                                     "x": "420.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 5,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/5\/fourth.png",
                                     "x": "290.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         }
                     },
                     "6": {
                         "6": {
                             "product_name": "速干衫",
                             "man_name": "AIBU",
                             "brand_name": "AIBU",
                             "product_design": [
                                 {
                                     "product_id": 6,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/6\/front.png",
                                     "x": "300.0",
                                     "y": "210.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 6,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/6\/back.png",
                                     "x": "300.0",
                                     "y": "180.0",
                                     "w": "380.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 6,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/6\/third.png",
                                     "x": "340.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 6,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/6\/fourth.png",
                                     "x": "350.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "7": {
                             "product_name": "速干衫",
                             "man_name": "SC",
                             "brand_name": "SC",
                             "product_design": [
                                 {
                                     "product_id": 7,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/7\/front.png",
                                     "x": "285.0",
                                     "y": "210.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 7,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/7\/back.png",
                                     "x": "300.0",
                                     "y": "195.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 7,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/7\/third.png",
                                     "x": "340.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 7,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/7\/fourth.png",
                                     "x": "350.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "8": {
                             "product_name": "ET速干衫男款",
                             "man_name": "达衫",
                             "brand_name": "E&T",
                             "product_design": [
                                 {
                                     "product_id": 8,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/8\/front.png",
                                     "x": "295.0",
                                     "y": "210.0",
                                     "w": "405.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 8,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/8\/back.png",
                                     "x": "308.0",
                                     "y": "180.0",
                                     "w": "397.0",
                                     "h": "540.0"
                                 },
                                 {
                                     "product_id": 8,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/8\/third.png",
                                     "x": "340.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 8,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/8\/fourth.png",
                                     "x": "350.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "9": {
                             "product_name": "ET速干衫女款",
                             "man_name": "达衫",
                             "brand_name": "E&T",
                             "product_design": [
                                 {
                                     "product_id": 9,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/9\/front.png",
                                     "x": "315.0",
                                     "y": "230.0",
                                     "w": "363.0",
                                     "h": "454.0"
                                 },
                                 {
                                     "product_id": 9,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/9\/back.png",
                                     "x": "315.0",
                                     "y": "210.0",
                                     "w": "363.0",
                                     "h": "454.0"
                                 },
                                 {
                                     "product_id": 9,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/9\/third.png",
                                     "x": "420.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 9,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/9\/fourth.png",
                                     "x": "290.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         }
                     },
                     "1": {
                         "10": {
                             "product_name": "ET 套头卫衣",
                             "man_name": "达衫",
                             "brand_name": "E&T",
                             "product_design": [
                                 {
                                     "product_id": 10,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/10\/front.png",
                                     "x": "325.0",
                                     "y": "250.0",
                                     "w": "360.0",
                                     "h": "350.0"
                                 },
                                 {
                                     "product_id": 10,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/10\/back.png",
                                     "x": "305.0",
                                     "y": "230.0",
                                     "w": "380.0",
                                     "h": "530.0"
                                 },
                                 {
                                     "product_id": 10,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/10\/third.png",
                                     "x": "370.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 10,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/10\/fourth.png",
                                     "x": "295.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         },
                         "11": {
                             "product_name": "AG 套头卫衣",
                             "man_name": "东信",
                             "brand_name": "AG",
                             "product_design": [
                                 {
                                     "product_id": 11,
                                     "side": "front",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/11\/front.png",
                                     "x": "310.0",
                                     "y": "250.0",
                                     "w": "375.0",
                                     "h": "320.0"
                                 },
                                 {
                                     "product_id": 11,
                                     "side": "back",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/11\/back.png",
                                     "x": "305.0",
                                     "y": "230.0",
                                     "w": "380.0",
                                     "h": "530.0"
                                 },
                                 {
                                     "product_id": 11,
                                     "side": "third",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/11\/third.png",
                                     "x": "370.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 },
                                 {
                                     "product_id": 11,
                                     "side": "fourth",
                                     "img_url": "http:\/\/cdn.open.easytee.me\/products\/11\/fourth.png",
                                     "x": "295.0",
                                     "y": "540.0",
                                     "w": "305.0",
                                     "h": "305.0"
                                 }
                             ]
                         }
                     }
                 },
                 "styles": {
                     "1": {
                         "1": {
                             "color": "DEB7CA",
                             "color_name": "浅粉色",
                             "is_default": 1
                         },
                         "2": {
                             "color": "582D40",
                             "color_name": "栗色",
                             "is_default": 0
                         },
                         "3": {
                             "color": "B7312C",
                             "color_name": "红色",
                             "is_default": 0
                         },
                         "4": {
                             "color": "DD4814",
                             "color_name": "橙色",
                             "is_default": 0
                         },
                         "5": {
                             "color": "FCD450",
                             "color_name": "雏菊色",
                             "is_default": 0
                         },
                         "6": {
                             "color": "00985F",
                             "color_name": "爱尔兰绿",
                             "is_default": 0
                         },
                         "7": {
                             "color": "203731",
                             "color_name": "森林绿",
                             "is_default": 0
                         },
                         "8": {
                             "color": "21314D",
                             "color_name": "藏青色",
                             "is_default": 0
                         },
                         "9": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "10": {
                             "color": "6F9AD3",
                             "color_name": "卡罗莱纳蓝",
                             "is_default": 0
                         },
                         "11": {
                             "color": "A4B3C9",
                             "color_name": "浅蓝色",
                             "is_default": 0
                         },
                         "12": {
                             "color": "443135",
                             "color_name": "深巧克力色",
                             "is_default": 0
                         },
                         "13": {
                             "color": "CAC0B6",
                             "color_name": "沙色",
                             "is_default": 0
                         },
                         "14": {
                             "color": "ffffff",
                             "color_name": "白色",
                             "is_default": 0
                         },
                         "15": {
                             "color": "88898b",
                             "color_name": "RS运动灰色",
                             "is_default": 0
                         },
                         "16": {
                             "color": "4e4f53",
                             "color_name": "炭色",
                             "is_default": 0
                         },
                         "17": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         }
                     },
                     "2": {
                         "18": {
                             "color": "DEB7CA",
                             "color_name": "浅粉色",
                             "is_default": 1
                         },
                         "19": {
                             "color": "EB67B9",
                             "color_name": "杜鹃花色",
                             "is_default": 0
                         },
                         "20": {
                             "color": "E21776",
                             "color_name": "海利康花色",
                             "is_default": 0
                         },
                         "21": {
                             "color": "582D40",
                             "color_name": "栗色",
                             "is_default": 0
                         },
                         "22": {
                             "color": "B7312C",
                             "color_name": "红色",
                             "is_default": 0
                         },
                         "23": {
                             "color": "DD4814",
                             "color_name": "橙色",
                             "is_default": 0
                         },
                         "24": {
                             "color": "FFB612",
                             "color_name": "金色",
                             "is_default": 0
                         },
                         "25": {
                             "color": "FCD450",
                             "color_name": "雏菊色",
                             "is_default": 0
                         },
                         "26": {
                             "color": "76D750",
                             "color_name": "浅绿色",
                             "is_default": 0
                         },
                         "27": {
                             "color": "6D6F64",
                             "color_name": "军绿色",
                             "is_default": 0
                         },
                         "28": {
                             "color": "00985F",
                             "color_name": "爱尔兰绿",
                             "is_default": 0
                         },
                         "29": {
                             "color": "00966C",
                             "color_name": "麻灰爱尔兰绿",
                             "is_default": 0
                         },
                         "30": {
                             "color": "203731",
                             "color_name": "森林绿",
                             "is_default": 0
                         },
                         "31": {
                             "color": "21314D",
                             "color_name": "藏青色",
                             "is_default": 0
                         },
                         "32": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "33": {
                             "color": "0073B0",
                             "color_name": "宝石蓝",
                             "is_default": 0
                         },
                         "34": {
                             "color": "6F9AD3",
                             "color_name": "卡罗莱纳蓝",
                             "is_default": 0
                         },
                         "35": {
                             "color": "A4B3C9",
                             "color_name": "浅蓝色",
                             "is_default": 0
                         },
                         "36": {
                             "color": "412D5D",
                             "color_name": "紫色",
                             "is_default": 0
                         },
                         "37": {
                             "color": "614D7D",
                             "color_name": "麻灰紫",
                             "is_default": 0
                         },
                         "38": {
                             "color": "443135",
                             "color_name": "深巧克力色",
                             "is_default": 0
                         },
                         "39": {
                             "color": "866761",
                             "color_name": "栗黄色",
                             "is_default": 0
                         },
                         "40": {
                             "color": "CAC0B6",
                             "color_name": "沙色",
                             "is_default": 0
                         },
                         "41": {
                             "color": "ffffff",
                             "color_name": "白色",
                             "is_default": 0
                         },
                         "42": {
                             "color": "88898b",
                             "color_name": "RS运动灰色",
                             "is_default": 0
                         },
                         "43": {
                             "color": "4e4f53",
                             "color_name": "炭色",
                             "is_default": 0
                         },
                         "44": {
                             "color": "404545",
                             "color_name": "深麻灰色",
                             "is_default": 0
                         },
                         "45": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         }
                     },
                     "3": {
                         "46": {
                             "color": "DEB7CA",
                             "color_name": "浅粉色",
                             "is_default": 1
                         },
                         "47": {
                             "color": "EB67B9",
                             "color_name": "杜鹃花色",
                             "is_default": 0
                         },
                         "48": {
                             "color": "E21776",
                             "color_name": "海利康花色",
                             "is_default": 0
                         },
                         "49": {
                             "color": "B7312C",
                             "color_name": "红色",
                             "is_default": 0
                         },
                         "50": {
                             "color": "FFB612",
                             "color_name": "金色",
                             "is_default": 0
                         },
                         "51": {
                             "color": "FCD450",
                             "color_name": "雏菊色",
                             "is_default": 0
                         },
                         "52": {
                             "color": "76D750",
                             "color_name": "浅绿色",
                             "is_default": 0
                         },
                         "53": {
                             "color": "6D6F64",
                             "color_name": "军绿色",
                             "is_default": 0
                         },
                         "54": {
                             "color": "00985F",
                             "color_name": "爱尔兰绿",
                             "is_default": 0
                         },
                         "55": {
                             "color": "21314D",
                             "color_name": "藏青色",
                             "is_default": 0
                         },
                         "56": {
                             "color": "0073B0",
                             "color_name": "宝石蓝",
                             "is_default": 0
                         },
                         "57": {
                             "color": "A4B3C9",
                             "color_name": "浅蓝色",
                             "is_default": 0
                         },
                         "58": {
                             "color": "412D5D",
                             "color_name": "紫色",
                             "is_default": 0
                         },
                         "59": {
                             "color": "866761",
                             "color_name": "栗黄色",
                             "is_default": 0
                         },
                         "60": {
                             "color": "FFFFFF",
                             "color_name": "白色",
                             "is_default": 0
                         },
                         "61": {
                             "color": "88898b",
                             "color_name": "RS运动灰色",
                             "is_default": 0
                         },
                         "62": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         }
                     },
                     "4": {
                         "63": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 1
                         },
                         "64": {
                             "color": "FFFFFF",
                             "color_name": "白色",
                             "is_default": 0
                         },
                         "65": {
                             "color": "21314D",
                             "color_name": "藏青色",
                             "is_default": 0
                         },
                         "66": {
                             "color": "666766",
                             "color_name": "深麻灰",
                             "is_default": 0
                         },
                         "67": {
                             "color": "DCD7D4",
                             "color_name": "浅麻灰",
                             "is_default": 0
                         },
                         "83": {
                             "color": "00985F",
                             "color_name": "爱尔兰绿",
                             "is_default": 0
                         },
                         "84": {
                             "color": "FFB612",
                             "color_name": "金色",
                             "is_default": 0
                         },
                         "85": {
                             "color": "B7312C",
                             "color_name": "红色",
                             "is_default": 0
                         },
                         "86": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "87": {
                             "color": "6D6F64",
                             "color_name": "军绿色",
                             "is_default": 0
                         }
                     },
                     "5": {
                         "68": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 1
                         },
                         "69": {
                             "color": "FFFFFF",
                             "color_name": "白色",
                             "is_default": 0
                         },
                         "70": {
                             "color": "21314D",
                             "color_name": "藏青色",
                             "is_default": 0
                         },
                         "71": {
                             "color": "666766",
                             "color_name": "深麻灰",
                             "is_default": 0
                         },
                         "72": {
                             "color": "DCD7D4",
                             "color_name": "浅麻灰",
                             "is_default": 0
                         },
                         "88": {
                             "color": "00985F",
                             "color_name": "爱尔兰绿",
                             "is_default": 0
                         },
                         "89": {
                             "color": "FFB612",
                             "color_name": "金色",
                             "is_default": 0
                         },
                         "90": {
                             "color": "B7312C",
                             "color_name": "红色",
                             "is_default": 0
                         },
                         "91": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "92": {
                             "color": "DEB7CA",
                             "color_name": "浅粉色",
                             "is_default": 0
                         }
                     },
                     "6": {
                         "73": {
                             "color": "FFFFFF",
                             "color_name": "白色 ",
                             "is_default": 1
                         },
                         "74": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         },
                         "75": {
                             "color": "B7312C",
                             "color_name": "红色",
                             "is_default": 0
                         },
                         "76": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         }
                     },
                     "7": {
                         "77": {
                             "color": "FFFFFF",
                             "color_name": "白色 ",
                             "is_default": 0
                         },
                         "78": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         },
                         "79": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "80": {
                             "color": "0073B0",
                             "color_name": "宝石蓝",
                             "is_default": 0
                         },
                         "81": {
                             "color": "c4d52a",
                             "color_name": "荧光黄色",
                             "is_default": 1
                         },
                         "82": {
                             "color": "98d55c",
                             "color_name": "荧光绿色",
                             "is_default": 0
                         }
                     },
                     "8": {
                         "93": {
                             "color": "FFFFFF",
                             "color_name": "白色 ",
                             "is_default": 0
                         },
                         "94": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         },
                         "95": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "96": {
                             "color": "c4d52a",
                             "color_name": "荧光黄色",
                             "is_default": 1
                         }
                     },
                     "9": {
                         "97": {
                             "color": "FFFFFF",
                             "color_name": "白色 ",
                             "is_default": 0
                         },
                         "98": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         },
                         "99": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "100": {
                             "color": "c4d52a",
                             "color_name": "荧光黄色",
                             "is_default": 1
                         }
                     },
                     "10": {
                         "101": {
                             "color": "8C8985",
                             "color_name": "麻灰色",
                             "is_default": 0
                         },
                         "102": {
                             "color": "21314D",
                             "color_name": "藏青色",
                             "is_default": 0
                         },
                         "103": {
                             "color": "672E45",
                             "color_name": "紫红色",
                             "is_default": 0
                         },
                         "104": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 1
                         }
                     },
                     "11": {
                         "105": {
                             "color": "FFFFFF",
                             "color_name": "白色",
                             "is_default": 1
                         },
                         "106": {
                             "color": "000000",
                             "color_name": "黑色",
                             "is_default": 0
                         },
                         "107": {
                             "color": "8C8985",
                             "color_name": "麻灰色",
                             "is_default": 0
                         },
                         "108": {
                             "color": "f6d400",
                             "color_name": "深黄色",
                             "is_default": 0
                         },
                         "109": {
                             "color": "B7312C",
                             "color_name": "红色",
                             "is_default": 0
                         },
                         "110": {
                             "color": "1D4F91",
                             "color_name": "宝蓝色",
                             "is_default": 0
                         },
                         "111": {
                             "color": "21314D",
                             "color_name": "藏青色",
                             "is_default": 0
                         }
                     }
                 },
                 "sizes": {
                     "1": {
                         "1": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "2": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "3": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "4": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "5": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "6": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "7": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "8": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "9": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "10": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "11": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "12": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "13": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "14": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "15": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "16": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "17": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ]
                     },
                     "2": {
                         "18": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "19": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "20": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "21": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "22": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "23": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "24": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "25": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "26": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "27": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "28": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "29": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "30": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "31": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "32": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "33": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "34": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "35": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "36": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "37": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "38": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "39": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "40": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "41": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "42": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "43": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "44": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ],
                         "45": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             }
                         ]
                     },
                     "3": {
                         "46": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "47": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "48": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "49": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "50": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "51": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "52": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "53": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "54": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "55": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "56": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "57": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "58": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "59": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "60": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "61": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "62": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ]
                     },
                     "4": {
                         "63": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "64": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "65": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "66": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "67": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "83": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "84": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "85": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "86": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "87": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ]
                     },
                     "5": {
                         "68": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "69": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "70": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "71": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "72": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "88": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "89": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "90": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "91": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "92": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ]
                     },
                     "6": {
                         "73": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ],
                         "74": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ],
                         "75": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ],
                         "76": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ]
                     },
                     "7": {
                         "77": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             },
                             {
                                 "size": "XXXL"
                             }
                         ],
                         "78": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             },
                             {
                                 "size": "XXXL"
                             }
                         ],
                         "79": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             },
                             {
                                 "size": "XXXL"
                             }
                         ],
                         "80": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             },
                             {
                                 "size": "XXXL"
                             }
                         ],
                         "81": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             },
                             {
                                 "size": "XXXL"
                             }
                         ],
                         "82": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             },
                             {
                                 "size": "XXXL"
                             }
                         ]
                     },
                     "8": {
                         "93": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "94": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "95": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ],
                         "96": [
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             }
                         ]
                     },
                     "9": {
                         "97": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "98": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "99": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ],
                         "100": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             }
                         ]
                     },
                     "10": {
                         "101": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ],
                         "102": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ],
                         "103": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ],
                         "104": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "XXL"
                             }
                         ]
                     },
                     "11": {
                         "105": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             },
                             {
                                 "size": "3XL"
                             }
                         ],
                         "106": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             },
                             {
                                 "size": "3XL"
                             }
                         ],
                         "107": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             },
                             {
                                 "size": "3XL"
                             }
                         ],
                         "108": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             },
                             {
                                 "size": "3XL"
                             }
                         ],
                         "109": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             },
                             {
                                 "size": "3XL"
                             }
                         ],
                         "110": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             },
                             {
                                 "size": "3XL"
                             }
                         ],
                         "111": [
                             {
                                 "size": "XS"
                             },
                             {
                                 "size": "S"
                             },
                             {
                                 "size": "M"
                             },
                             {
                                 "size": "L"
                             },
                             {
                                 "size": "XL"
                             },
                             {
                                 "size": "2XL"
                             },
                             {
                                 "size": "3XL"
                             }
                         ]
                     }
                 }
             },
             "design": [],
             "templates": []
         },
         "message": "",
         "redirect": "",
         "status": 0,
     }



异常:

    {
    	 "return":[],
		 "message": "error msg",
         "redirect": "",
         "status": 1,
     }
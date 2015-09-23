用户注册
======

保存用户注册信息
------
Api Url


    /api

请求参数


     {
         "model": "user/register",
         "action": "do_register",
         "redirect": "/order?id=1",
         "mobile": "13555555555",
         "password": "111111",
         "captcha": "1111"
     }

响应


正常:

     {
         "return": {
            "message":"注册成功",
            "redirect":"/user/index",
         },
         "message": "",
         "redirect": "",
         "status": 0,
     }
     
备注:

    1.如果请求参数中 `redirect`不为空 注册成功返回参数会有`return.redirect`,`return.redirect`跳转
    2.注册成功直接登陆成功 按`return.redirect`跳转
     
异常:

    {
         "return": [],
         "message": "验证码不能为空",
         "redirect": "",
         "status": 1,
     }
     
status:

- 0      注册成功
- 8001   验证码不能为空
- 80011  验证码不正确
- 8002   手机号不合法
- 8003   密码不合法
- 8004   当前号码已经注册过


获取手机验证码
------
Api Url


    /api

请求参数


     {
         "model": "user/register",
         "action": "get_code",
         "mobile": "13555555555"
     }

响应


正常:

     {
        "return": "手机验证码已发送",
        "message": "当前号码已经注册过",
        "redirect": "",
        "status": 0,
     }


异常:

    {
       "return": [],
       "message": "当前号码已经注册过",
       "redirect": "",
       "status": 1,
    }
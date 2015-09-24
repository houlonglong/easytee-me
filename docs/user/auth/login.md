用户认证
======

Api Url
------

    /api

请求参数
------

     {
         "model": "user/auth",
         "action": "login",
         "mobile": "18601628937",
         "password": "111111",
         "redirect":"/user/index",
     }

响应
------

正常:

     {
         "return": {
             "message":"登陆成功",
             "redirect":"/user/index",
          },
         "message": "",
         "redirect": "",
         "status": 0,
     }
     
备注:

    1.如果请求参数中 `redirect`不为空 登陆成功返回参数会有`return.redirect`,按`return.redirect`跳转,ajax 登陆成功看情况处理
    
异常:

    {
        "return": [],
        "message": "用户不存在",
        "redirect": "",
        "status": 8102,
    }
    
status:
    
    - 0      登陆成功
    - 8101   手机号不合法
    - 8102   用户不存在
    - 8103   密码不正确
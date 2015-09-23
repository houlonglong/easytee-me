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
         "password": "111111"
     }

响应
------

正常:

     {

     }


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
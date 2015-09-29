忘记密码
======

密码重置
------
Api Url


    /api

请求参数

    {
         "model": "user/forgetpass",
         "action": "do_forgetpass",
         "mobile": "13564898513",
         "password": "3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d",
         "captcha": "610569",
         "verify_password": "3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d"
    }

响应


正常:

    {
         "return": "更新成功",
         "message": "",
         "redirect": "",
         "status": 0,
    }

异常:

    {
          "return": [],
          "message": "验证码不正确",
          "redirect": "",
          "status": 1,
    }

获取手机验证码
------

Api Url

    /api

请求参数

    {
         "model": "user\/forgetpass",
         "action": "get_code",
         "mobile": "13564898513"
    }

响应


正常:

    {
         "return": "手机验证码已发送",
         "message": "",
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
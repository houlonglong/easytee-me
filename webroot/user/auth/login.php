<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="css/common/style.css">
    <link rel="stylesheet" type="text/css" href="css/login/login.css">
    <script type="text/javascript" src="js/app/common/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="js/app/common/index.js"></script>
    <title></title>
</head>
<body>
<div class="try"><i></i></div>
<header>
    <span class="header-bg"></span>
    <div class="inHead">
        <nav class="typeArea clearfix nav">
            <h1 class="logo">
                <a href="index.html">易衫网</a>
            </h1>
            <span class="how">如何开始</span>
            <div class="login">
                <a href="#" class="begin">发起活动</a>
                <div>
                    <a href="#">消息</a>
                    <a href="#">登录</a>
                    <a href="#">注册</a>
                </div>
            </div>
        </nav>
    </div>
    <div class="head-foot"></div>
</header>


<div class="denglu">
    <img src="css/common/images/denglu-bg.png" >
    <div>
        <div class="denglu-con show">
            <h3 >请登录</h3>
            <div class=' mar-center  tel'>
                <label for="phone">手机</label>
                <br>
                <input type="text" id="phone">
                <span  class="hidden"></span>
            </div>
            <div class='login-p'>
                <label for="LoginPass">登录密码</label>
                <br>
                <input type="password" id="LoginPass"  >
                <span class="hidden">密码有误</span>
            </div>
            <div class="forget">
                <a href="#">忘记密码</a>
            </div>
            <div>
                <a href="#" class="btnLogin">登录</a>
            </div>
            <div class="other-login ">
                <span>第三方登录</span>
                <a href="#" class="qq"></a>
                <a href="#" class="wb"></a>
                <a href="#" class="wx"></a>
            </div>
            <div class="zc-link">
                <a href="#">没有账号？免费注册</a>
            </div>
        </div>
        <!--  重置密码 -->
        <div class="reset-con ">
            <h3>重置密码</h3>
            <div class="sj ">
                <input type="text" placeholder="请输入您的手机号" id="res-phone">
                <button id="testing" >获取验证码</button>
                <i class="hidden">抱歉无此账号</i>

            </div>
            <div>
                <input type="text" placeholder="请输入验证码" id="res-test" >
                <i class="hidden">验证码错误</i>
            </div>
            <h4>请输入新密码</h4>
            <div>
                <input type="password" placeholder="6~32位字符" id="res-pass">
                <i class="hidden">密码格式错误</i>
            </div>
            <div class="" >
                <input type="password" placeholder="请再次输入密码" id="res-pass2">
                <i class="hidden">密码不一致</i>
            </div>
            <button class="res-btn">提交重置</button>
        </div>
        <!-- 注册 -->
        <div class="register">
            <h3>免费注册</h3>
            <div class="sj ">
                <label for="">手机号</label>
                <input type="text" placeholder="请输入您的手机号">
                <span>获取验证码</span>
                <i>无效号码</i>
            </div>
            <div class="yzm-err">
                <label for="">验证码</label>
                <input type="text" ><i>验证码有误</i>
            </div>
            <div class="mm-err">
                <label for="">登录密码</label>
                <input type="password" placeholder="必须是3~32位字符"></div>

            <div class="zc-btn">
                <a href="#" class="anniu reg-anniu">免费注册</a>
            </div>
            <div class="other-login ">
                <span>第三方登录</span>
                <a href="#" class="qq"></a>
                <a href="#" class="wb"></a>
                <a href="#" class="wx"></a>
            </div>
            <div class="zc-link">
                <a href="#">没有账号？免费注册</a>
            </div>
        </div>
        <!-- 注册成功 -->
        <div class="zc-success ">
            <h3>注册成功!</h3>
            <p>感谢注册易衫网！我们将在<i>5</i>秒后回到当前页面</p>
            <div class="link-btn">
                <a href="#">跳至首页</a>
                <a href="#">回当前页</a>
            </div>
        </div>

        <!-- 关联成功 -->
        <div class="zc-success ">
            <h3>关联成功!</h3>
            <p>您已成功关联！我们将在<i>5</i>秒后回到当前页面</p>
            <div class="link-btn">
                <a href="#">跳至首页</a>
                <a href="#">回当前页</a>
            </div>
        </div>
        <!-- 重置密码成功 -->
        <div class="zc-success ret-success">
            <h3>重置成功!</h3>
            <p>您已重置成功！我们将在<i>5</i>秒后回到当前页面</p>
            <div class="link-btn">
                <a href="#">跳至首页</a>
                <a href="#">回当前页</a>
            </div>
        </div>

        <!-- 关联手机 -->
        <div class="guanlian-sj ">
            <h3>关联手机</h3>
            <p>为了给您更好的体验，请您联一个常用手机号，下次即可快速登录</p>
            <div class="err">
                <label for="">手机号码</label>
                <input type="text">
                <i>此号码已注册</i>
            </div>
            <div>
                <label for="">设置密码</label>
                <input type="text">
            </div>
            <div class="xieyi">
                <a href="#">查看协议</a>
            </div>
            <div>
                <button class="agree">同意协议并注册</button>
            </div>
            <div>
                <button class="zc-link">还没有账号？免费注册</button>
            </div>
        </div>

        <!-- 关联已有账户 -->
        <div class="guanlian-sj guanlian-account ">
            <h3>关联已有账户</h3>
            <p>为了给您更好的体验，请您关联已有易衫账户，下次即可快速登录</p>
            <div class="err">
                <label for="">手机号码</label>
                <input type="text">
                <i>未注册号码</i>
            </div>
            <div>
                <label for="">登录密码</label>
                <input type="text">
            </div>
            <!-- <div class="xieyi">
                <a href="#">查看协议</a>
            </div> -->
            <div>
                <button class="agree">建立关联</button>
            </div>
            <div>
                <button class="zc-link">还没有账号？免费注册</button>
            </div>
        </div>
    </div>
</div>


<!-- <input type="password" id="tel">   //判断手机号的正则
<button id="btnJ">提交</button> -->




<div class="foot">
    <div class="infooter clearfix">
        <h2>易衫网</h2>
        <dl>
            <dt>导航</dt>
            <dd>
                <a href="#">首页</a>
            </dd>
            <dd>
                <a href="#">开始设计</a>
            </dd>
            <dd>
                <a href="#">关于我们</a>
            </dd>
            <dd>
                <a href="#">帮助中心</a>
            </dd>
        </dl>
        <dl>
            <dt>服务</dt>
            <dd>客服QQ：12345678</dd>
        </dl>
        <dl>
            <dt>联系我们</dt>
            <dd>工作日：上午9点 - 下午6点</dd>
            <dd>休息日：上午9点 - 下午5点</dd>
            <dd>客服热线 ： 400-92020-85</dd>
        </dl>
        <dl>
            <dt>官方</dt>
            <dd class="weibo">
                <a href="#">微博</a>
            </dd>
            <dd class="weixin">微信</dd>
        </dl>
        <span class="ewm"></span>
        <p>Copyright © 2014-2015 易衫网 沪公网备310107100040719</p>
    </div>
</div>
</body>
</html>
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
                <i class="hidden">输入有误</i>

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
            <div class="sj">
                <label for="">手机号</label>
                <input type="text" placeholder="请输入您的手机号" id="reg-phone">
                <button id="reg-testing" >获取验证码</button>
                <i class="hidden">输入错误</i>
            </div>
            <div class="">
                <label for="">验证码</label>
                <input type="text" placeholder="输入验证码" id="reg-test">
                <i class="hidden">验证码有误</i>
            </div>
            <div class="">
                <label for="">登录密码</label>
                <input type="password" placeholder="必须是6~32位字符" id="reg-pass">
                <i class="hidden">密码格式错误</i>
            </div>


            <div class="zc-btn">
                <a href="#" class="anniu reg-btn">免费注册</a>
            </div>
            <div class="other-login ">
                <span>第三方登录</span>
                <a href="#" class="qq"></a>
                <a href="#" class="wb"></a>
                <a href="#" class="wx"></a>
            </div>
            <div class="zc-link">
                <a href="#">已有账号？立即登录</a>
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
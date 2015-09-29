<div class="denglu">
		<img src="/css/common/images/denglu-bg.png" >
		<div>
			<!-- 注册 -->
			<div class="register show">
				<h3>免费注册</h3>
				<div class="sj">
					<label for="">手机号</label>
					<input type="text" placeholder="请输入您的手机号" id="reg-phone">
					<button id="reg-testing" >获取验证码</button>
					<i class="hidden triangle">输入错误</i>
				</div>
				<div class="">
					<label for="">验证码</label>
					<input type="text" placeholder="输入验证码" id="reg-test">
					<i class="hidden triangle">验证码有误</i>
				</div>
				<div class="">
					<label for="">登录密码</label>
					<input type="password" placeholder="必须是6~32位字符" id="reg-pass">
					<i class="hidden triangle">密码格式错误</i>
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
			<div class="zc-success reg-success">
				<h3>注册成功!</h3>
				<p>感谢注册易衫网！我们将在<i>5</i>秒后回到当前页面</p>
				<div class="link-btn">
					<a href="/index.php">跳至首页</a>
					<a href="">返回当前页</a>
				</div>
			</div>
			
			<!-- 关联成功 -->
			<div class="zc-success rel-success">
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
					<a href="<?php echo $_SERVER['PHP_SELF'] ?>">跳至首页</a>
					<a href="#">回当前页</a>
				</div>
			</div>
			
		</div>
	</div>


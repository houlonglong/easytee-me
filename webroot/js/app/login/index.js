$(function() {
	$('.zc-link a').click(function(event) {
		$(this).attr('href','http://2.dev.jzw.com/user/register');
	});

	$('.forget a').click(function(event) {
		$(this).attr('href','http://2.dev.jzw.com/user/forget_pass');
		//alert('message')
	});
});
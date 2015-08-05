<h1><?=$user['User']['name'];?> 
<!-- 	<span>收入:<i>￥<?=$user['User']['income'];?></i></span>
	<span>支出:<i>￥<?php printf("%.2f", $user['User']['income'] - $user['User']['money']);?></i></span> -->
	<span>余额:<i>￥<?=$user['User']['money'];?></i></span>
    <a href="javascript:void(0)" id="withdrawal">提现</a><a href="/home/moneyFlow">收支明细</a>
</h1>
<script type="text/javascript">
$("#withdrawal").click(function(){
	popup("申请提现",'/home/withdrawApply',true,function(m){
		 m.find('.modal-dialog').css("width","800px");
		 m.find('.btn-primary').click(function(){
		 	var realMoney 	= parseFloat($('#realMoney').html());
		 	var cash 		= parseFloat($('#cash').val());
		 	var total 		= parseFloat($('#total').html());
		 	if(total > realMoney){
		 		alert('您的余额不足');
		 		return;
		 	}

		 	$.get('/home/withdrawApply/'+cash,function(d){
		 		if(d == 1){
		 			alert('提现申请已提交');
                    m.modal('hide');
		 		}
		 	});
		 })
	},false);
});
</script>
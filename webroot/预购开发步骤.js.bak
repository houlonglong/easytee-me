/* 
* @Author: sky
* @Date:   2015-09-18 11:04:40
* @Last Modified by:   sky
* @Last Modified time: 2015-09-18 21:16:41
*/

'use strict';

//首先你需要数据，该款式的衣服图片，尺码列表，颜色列表。
//在打开尺码信息时，你需要组装一个数组对象。这个对象是用来生成尺码信息列表。并且最终传给后台使用。
$(function(){
	//定义数据模型-Dialog的视图是一致的。并且最终传给后台使用。
	var data = {
		arr: [],
		total: 0
	};

	var productImage;//衣服的图片
	var sizeList;//尺码列表
	var styleList;//款式列表
	var selectedColor;//已选中的颜色
	var colorList;//颜色列表
	var price;//产品售价

	//初始化数据模型
	$.get("/api",{
        model:'activity',
        action:'detail',
        id:2595
    },function(data){
        if(data.status == 0){//成功返回
            console.log(data)
            var activity_detail = data.return;
            console.log(activity_detail)

            //1、初始化数据
			productImage = responseData.productImage;
			sizeList = responseData.sizeList;
			styleList = responseData.styleList;
			//已选中的颜色
			selectedColor = responseData.selectedColor;// {id: '222', value: '#998877'}
			colorList = responseData.colorList;
			price = responseData.price;

			//2、组装第一条数据(data)
			data.arr[0] = {
				pruductImage: productImage,//产品图片
				number: 1,
				size: sizeList[0],//0-S 1-M 2-L 
				style: styleList[0],
				color: colorList[0],
				subtotal: price
			};
			//3、生成列表
			buildList();

        }else{//异常
            alert(data.message)
        }
    },"json");

	function buildSizeList(list){
		for(var j=0; j<sizeList.length; j++){
        	var size = sizeList[j];
        	htmlStr += '<option value="'+size.id+'">'+size.name+'</option>';	
        }
	}

	function buildStyleList(list){
		for(var j=0; j<styleList.length; j++){
        	var style = styleList[j];
        	htmlStr += '<option value="'+style.id+'">'+style.name+'</option>';	
        }
	}

	function buildColorList(list){
		for(var j=0; j<colorList.length; j++){
        	var color = colorList[j];
        	htmlStr += '<a href="#" data-id="'+color.id+'"><i style="background-color: '+color.value+'"></i></a>';	
        }
	}

    //生成列表
	function buildList(){
		//1、生成HTML
		var list = data.arr;
		for(var i=0; i<list.length; i++){
			var item = list[i];
			var htmlStr = '';
			htmlStr += '<li class="clearfix">';
            htmlStr += '<img src="css/sale/images/sytle-img.png">';
            htmlStr += '<div class="number-info">';
            htmlStr += '<span class="left">-</span>';
            htmlStr += '<input type="text" value="'+item.number+'">';
            htmlStr += '<span class="right">+</span>';
            htmlStr += '</div>';
            htmlStr += '<select name="" id="" class="chima-info">';

			htmlStr += buildSizeList(sizeList);

            htmlStr += '</select>';
            htmlStr += '<select name="" id="" class="product-info">';

            htmlStr +=  buildStyleList(styleList);
            
            htmlStr += '</select>';
            htmlStr += '<div data-id="'+selectedColor.id+'" class="yanse-info current">';
            htmlStr += '<span style="'+selectedColor.value+'"></span>';
            htmlStr += '<div class="palette">';

            htmlStr += buildColorList(colorList);

            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '<div class="money-info">';
            htmlStr += '￥<i>'+subtotal+'</i>';
            htmlStr += '</div>';
            htmlStr += '</li>';
		}
		$('ul.style-info').empty().append(htmlStr);

		//2、绑定事件
		var number = 1;
	    $('.number-info .left').click(function(event) {
	    	var parent = $(this).parents('li');
	    	var idx = parent.index();
			number--;
			if($('.number-info input', parent).val() <= 1){
				number=1;
			}else{
				$('.number-info input', parent).val(number);
			}
			data.arr[idx].number=number;//同步数据到模型
	    });
	    

	    $('.number-info .right').click(function(event) {
	    	var parent = $(this).parents('li');                     
	    	var idx = parent.index();
	        number++;
	        $('.number-info input', parent).val(number);
	        data.arr[idx].number=number;//同步数据到模型
	    });
	    $('.select1').change(function(){
	    	//同步数据到模型
	    	 var parent1 = $(this).parents('li');                     
	    	var idx1 = parent.index();
	    	data.arr[idx1].sizeList.val()=$(this).val();
	    });
	    $('.select2').change(function(){
	    	//同步数据到模型
	    });
	    
	    $('.color').click(function(e){
	    	e.stopPropagation();
	    	$('.menu').toggle();
	    });
	    $('.color>.menu').click(function(e){
	    	e.stopPropagation();
	    });
	    $('.color>.menu').find('a').click(function(e){
	    	e.stopPropagation();
	    	var value = $(this).attr('value');
	    	var parent3= $(this).parents('li');
	    	var idx3=parent3.index();
	    	data.arr[idx3].color=value;
	    	//把value值应用到current span bgcolor
	    	
	    	var dataId = $(this).attr('data-id');
	    	//把dataId同步到数据模型
	    });
	}

	$(window).click(function(){
		$('.color>.menu').hide();
	});


});
设计工具
======

保存设计
------

Api Url
------

    /api

请求参数
------

     {
         "model": "design/tool/beta",
         "action": "design_save",
		 "color_count": 5,                 # 颜色数量
		 "default_side": "front",          # 默认面
		 "design_front": "design_front",   # 前胸设计
		 "design_back": "design_back",     # 后背设计
		 "design_third": "design_third",   # 左袖设计
		 "design_fourth": "design_fourth", # 右袖设计
		 "cat_id": 1,                      # 默认产品分类ID
		 "product_id": 1,                  # 默认产品ID
		 "style_id": 10,                   # 默认产品款式ID
		 "json": 1
     }

响应
------

正常:

     {
         "return": "保存成功",
         "message": "",
		 "redirect": "",
		 "status": 0
	}
         
异常:

    {
    	 "return":[],
		 "message": "error msg",
         "redirect": "",
         "status": 1,
     }


获取模板列表
------

Api Url
------

    /api

请求参数
------

     {
         "model": "design/tool/beta",
         "action": "get_templates",
         "json": 1
     }

响应
------

正常:

     {
         "return": {
			   "templates": [
				   {
					   "img_url": "http:\/\/www.xxx.com\/test.png",
					   "svg_url": "http:\/\/www.xxx.com\/test.svg",
					   "name": "name"
				   },
				   {
					   "img_url": "http:\/\/www.xxx.com\/test1.png",
					   "svg_url": "http:\/\/www.xxx.com\/test1.svg",
					   "name": "name"
				   }
			   ]
		   },
		   "message": "",
		   "redirect": "",
		   "status": 0
	}
         
异常:

    {
    	 "return":[],
		 "message": "error msg",
         "redirect": "",
         "status": 1,
     }

计算印刷成本
------

Api Url
------

    /api

请求参数
------

     {
         "model": "design/tool/beta",
         "action": "product_pricing",
         "sale_count": 50, # 销售数量
         "color_count": 3, # 颜色数量
         "style_id": 77,   # 款式ID
         "json": 1
     }

响应
------

正常:

     {
         "return": {
			   "print_cost": 31.95625 #印刷成本,
			   "selling_price": 100 #售价
		   },
		   "message": "",
		   "redirect": "",
		   "status": 0
	}
         
异常:

    {
    	 "return":[],
		 "message": "error msg",
         "redirect": "",
         "status": 1,
     }
     
message 备注:
	- sale_count 不能为空
	- sale_count 不能大于1000件 且不能小于10件
	- 颜色数量不能为空
	- 颜色数量不能大于10种
	- 款式ID不能为空
	- 款式不存在

获取设计初始化信息
------

Api Url
------

    /api

请求参数
------

     {
         "model": "design/tool/beta",
         "action": "design_init",
         "json": 1
     }

响应
------

正常:

     {
         "return": {
         	product_info: {
				cats: {#产品分类
					1: {
						cat_name: "套头卫衣"#分类名
					},
					4: {
						cat_name: "短袖T恤"
					},
					6: {
						cat_name: "速干衫"
					}
				},
				products: {
					1: {#分类ID
						10: {#产品ID
							product_name: "ET 套头卫衣",
							man_name: "达衫",
							brand_name: "E&T",
							product_design: [
								{
									product_id: 10,
									side: "front",
									img_url: "http://cdn.open.easytee.me/products/10/front.png",
									x: "325.0",
									y: "250.0",
									w: "360.0",
									h: "350.0"
								},
								{
									product_id: 10,
									side: "back",
									img_url: "http://cdn.open.easytee.me/products/10/back.png",
									x: "305.0",
									y: "230.0",
									w: "380.0",
									h: "530.0"
								},
								{
									product_id: 10,
									side: "third",
									img_url: "http://cdn.open.easytee.me/products/10/third.png",
									x: "370.0",
									y: "540.0",
									w: "305.0",
									h: "305.0"
								},
								{
									product_id: 10,
									side: "fourth",
									img_url: "http://cdn.open.easytee.me/products/10/fourth.png",
									x: "295.0",
									y: "540.0",
									w: "305.0",
									h: "305.0"
								}
							]
						},
					}
				},
				styles: {#款式
					1: {#产品ID
						1: {#款式ID
							color: "DEB7CA",
							color_name: "浅粉色",
							is_default: 1
						},
            		}
            	},
            	sizes: {#尺码
            		1: {#产品ID
						1: [#款式ID
							{
								size: "XS"#尺码
							},
							{
								size: "S"
							},
						
						],
					}
            	}
            },
            design: [ ],
            templates: [ ]
            },
         },
         "message": "",
         "redirect": "",
         "status": 0,
     }


异常:

    {
    	 "return":[],
		 "message": "error msg",
         "redirect": "",
         "status": 1,
     }
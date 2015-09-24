<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="css/common/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/design.css"/>
    <script src="js/app/design/vendor/jquery-1.11.2.js"></script>
    <script src="js/app/design/main.js"></script>
</head>
<body>
<header>
    <div class="inHead">
        <nav class="banxin clearfix nav">
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
</header>
<div class="design-main">
    <div class="design-top">
        <div class="design-top-leaf"></div>
        <div class="design-top-center">
            <div class="design-top-nav">
                <a class="step step-1 active" href="#"><i class="scissors"></i>1.设计</a>
                <a class="step step-2" href="/pricing"><i class="scissors"></i>2.设定目标</a>
                <a class="step step-3 clearfix" href="/push"><i class="scissors"></i>3.添加描述</a>
            </div>
            <div class="btn-group">
                <a class="btn btn-default" href="javascript:;">保存</a>
            </div>
        </div>
    </div>
    <div class="design-center">
        <div class="design-tools">
            <div class="tabs">
                <div class="tab active">
                    <a href="javascript:;">文字</a>
                </div>
                <div class="tab">
                    <a href="javascript:;">图片</a>
                </div>
            </div>
            <div class="tab-content active">
                <div class="form-row">
                    <span class="form-label">文字内容</span>
                </div>
                <div class="form-row">
                    <input class="form-control" type="text" placeholder="请输入文字"/>
                </div>
                <div class="form-row">
                    <span class="form-label">选择字体</span>
                </div>
                <div class="form-row">
                    <div class="design-dropdown l-per-70">
                        <div class="design-dropdown-btn">
                            <div class="design-dropdown-fontfamily">
                                <img src="/js/app/design/fonts/Popluar/helvetica.png" alt=""/>
                            </div>
                        </div>
                        <div class="design-dropdown-menu">
                            <div class="form-row">
                                <select class="form-control" name="" id="">
                                    <option value="popular">热门</option>
                                    <option value="">type1</option>
                                    <option value="">type2</option>
                                </select>
                            </div>
                            <div class="form-row">
                                <div class="font-families">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="design-dropdown r-per-25">
                        <div class="design-dropdown-btn">
                            <div class="design-dropdown-color">
                                <span style="background: #000000;"></span>
                            </div>
                        </div>
                        <div class="design-dropdown-menu">
                            <div class="color-picket-list">
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-row">
                    <span class="form-label">选择描边</span>
                </div>
                <div class="form-row">
                    <select class="form-control l-per-70" name="" id="">
                        <option value="0">无描边</option>
                        <option value="1">细描边</option>
                        <option value="2">中描边</option>
                        <option value="3">粗描边</option>
                    </select>
                    <div class="design-dropdown r-per-25">
                        <div class="design-dropdown-btn">
                            <div class="design-dropdown-color">
                                <span style="background: #ffffff;"></span>
                            </div>
                        </div>
                        <div class="design-dropdown-menu">
                            <div class="color-picket-list">
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-content-image-layout">
                    <a id="upload_location_btn" class="upload-location-btn" href="javascript:;">上传你的设计</a>
                </div>
                <div class="tab-content-image-layout-or">
                    或
                </div>
                <div class="tab-content-image-layout">
                    <a id="image_store_btn" class="upload-vendor-btn" href="javascript:;">浏览模板库</a>
                </div>
                <div class="upload-location">
                    <p>
                        <span>支持的文件类型 ：</span>
                        <br>
                        <span class="font-color-red">.png  /  .jpg  /  .jpeg  /  .svg</span>
                    </p>
                    <p>
                        <span>图片像素 ：</span>
                        <br>
                        <span class="font-color-red">不低于200×200像素</span>
                        <br>
                        <span class="font-color-red">不高于3000×3000像素</span>
                        <br>
                        <span class="font-color-red">最大不超过5M</span>
                    </p>
                    <p>
                        <span>图片上传条款 ：</span>
                        <br/>
                        <span>您提交的任何设计必须是您设计或者拥有合法使用权。你不得使用他人拥有的内容，除非你得到他们的许可。如果有人因为你的设计向我们索赔，您同意支付我们受到损失，包括律师费等任何损失。</span>
                    </p>
                    <div>
                        <a class="upload-location-btn" href="javascript:;">选择本地图片</a>
                    </div>
                </div>
                <div class="image-store">
                    <div class="form-row">
                        <input type="text" class="form-control" placeholder="关键字搜索"/>
                    </div>
                    <div class="form-row">
                        <div class="image-list">
                            <div class="image-list-item active">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>99.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>99.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>
                            <div class="image-list-item">
                                <a href="javascript:;" class="img-wrap">
                                    <img src="/css/design/image-list-item.png" alt=""/>
                                </a>
                                <span>999.00元/件</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="used-images">
                <div class="label">
                    使用过的模版
                </div>
                <div class="image-list">
                    <a href="javascript:;">
                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">
                    </a>
                    <a href="javascript:;">
                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">
                    </a>
                    <a href="javascript:;">
                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">
                    </a>
                    <a href="javascript:;">
                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">
                    </a>
                    <a href="javascript:;">
                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">
                    </a>
                </div>
            </div>
        </div>
        <div class="product-preview">
            <img src="/css/design/product_type_1_front.png" alt=""/>
        </div>
        <div class="product-choices clearfix">
            <span class="label">款式和颜色</span>
            <select class="form-control" name="" id="">
                <option value="">基础T恤款</option>
                <option value="">超级T恤款</option>
            </select>
            <ul class="product-list">
                <li class="product-item" tips="基础圆领T恤">
                    <img src="/css/design/product-thumbnail.png"/>
                    <div>
                        <span class="name">基础圆领T恤基础圆领T恤</span>
                        <span class="desc">成本优选</span>
                        <a href="#" class="info">详情</a>
                    </div>
                    <div class="product-color-picket">
                        <ul class="color-column quick-colors">
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="more-color">
                                <span></span>
                            </li>
                        </ul>
                        <ul class="color-column">
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                        </ul>
                        <ul class="color-column">
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                            <li class="color-item">
                                <span style="background-color: #0000ff;"></span>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="product-item" tips="基础圆领T恤">
                    <img src="/css/design/product-thumbnail.png"/>
                    <div>
                        <span class="name">基础圆领T恤基础圆领T恤</span>
                        <span class="desc">成本优选</span>
                        <a href="#" class="info">详情</a>
                    </div>
                </li>
                <li class="product-item active" tips="基础圆领T恤">
                    <img src="/css/design/product-thumbnail.png"/>
                    <div>
                        <span class="name">基础圆领T恤基础圆领T恤</span>
                        <span class="desc">成本优选</span>
                        <a href="#" class="info">详情</a>
                    </div>
                </li>
                <li class="product-item" tips="基础圆领T恤">
                    <img src="/css/design/product-thumbnail.png"/>
                    <div>
                        <span class="name">基础圆领T恤</span>
                        <span class="desc">成本优选</span>
                        <a href="#" class="info">详情</a>
                    </div>
                </li>
                <li class="product-item">
                    <img src="/css/design/product-thumbnail.png"/>
                    <div>
                        <span class="name">基础圆领T恤</span>
                        <span class="desc">成本优选</span>
                        <a href="#" class="info">详情</a>
                    </div>
                </li>
            </ul>
            <div class="pre-cost">
                印制
                <i>50</i>
                件的成本：<i>¥</i>
                <i>999.00</i>
            </div>
            <a href="#" class="btn">
                购买素衫
            </a>
        </div>
        <div class="design-selected-tools">
            <div class="form-row">
                <input type="checkbox" id="123"/>
                <label for="123">引导居中</label>
            </div>
            <div class="form-row">
                <a href="javascript:;">复制</a>
                <a href="javascript:;">移到底层</a>
                <a href="javascript:;">对齐中心</a>
                <a href="javascript:;">水平翻转</a>
                <a href="javascript:;">垂直翻转</a>
            </div>
        </div>
    </div>
</div>
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
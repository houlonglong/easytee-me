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
        <textarea id="addTextInput" class="form-control" type="text" placeholder="请输入文字"></textarea>
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
                <div class="design-dropdown-menu-arrow"></div>
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
                <div class="design-dropdown-color" id="textFillColor">
                    <span style="background: #000000;"></span>
                </div>
            </div>
            <div class="design-dropdown-menu">
                <div class="design-dropdown-menu-arrow"></div>
                <div class="color-picket-list" id="textFillColorPicket">
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-row">
        <span class="form-label">选择描边</span>
    </div>
    <div class="form-row">
        <select class="form-control l-per-70" id="changeTextOutline">
            <option value="0">无描边</option>
            <option value="0.33">细描边</option>
            <option value="0.66">中描边</option>
            <option value="1">粗描边</option>
        </select>

        <div class="design-dropdown r-per-25">
            <div class="design-dropdown-btn">
                <div class="design-dropdown-color" id="strokeColor">
                    <span style="background: #ffffff;"></span>
                </div>
            </div>
            <div class="design-dropdown-menu">
                <div class="design-dropdown-menu-arrow"></div>
                <div class="color-picket-list" id="textStrokeColorPicket">
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
            <div class="upload-location-btn-wrap">
                <a class="upload-location-btn" href="javascript:;">选择本地图片</a>

                <form>
                    <input type="file" id="upload_location_input">
                </form>

            </div>
        </div>
    </div>
    <!--                <div class="image-editor">-->
    <!--                    <div class="form-row">-->
    <!--                        <div id="showImageInput" class="form-control" placeholder="请输入文字">-->
    <!--                            <a href="javascript:;" class="del-btn"></a>-->
    <!--                        </div>-->
    <!--                    </div>-->
    <!--                </div>-->
    <div class="image-store">
        <div class="form-row">
            <div class="text-form-control">
                <input type="text" placeholder="关键字搜索"/>
                <a href="#" class="search-btn"></a>
            </div>
        </div>
        <div class="form-row">
            <div id="image_store_list" class="image-list">
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>99.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>99.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
                <!--                            <div class="image-list-item">-->
                <!--                                <a href="javascript:;" class="img-wrap">-->
                <!--                                    <img src="/css/design/image-list-item.png" alt=""/>-->
                <!--                                </a>-->
                <!--                                <span>999.00元/件</span>-->
                <!--                            </div>-->
            </div>
        </div>
    </div>
</div>
<!--            <div class="used-images">-->
<!--                <div class="label">-->
<!--                    使用过的模版-->
<!--                </div>-->
<!--                <div class="image-list">-->
<!--                    <a href="javascript:;">-->
<!--                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">-->
<!--                    </a>-->
<!--                    <a href="javascript:;">-->
<!--                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">-->
<!--                    </a>-->
<!--                    <a href="javascript:;">-->
<!--                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">-->
<!--                    </a>-->
<!--                    <a href="javascript:;">-->
<!--                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">-->
<!--                    </a>-->
<!--                    <a href="javascript:;">-->
<!--                        <img class="image-list-item" src="/css/design/image-list-item.png" alt="">-->
<!--                    </a>-->
<!--                </div>-->
<!--            </div>-->
</div>
<div class="product-preview">
    <div id="ds" class="ds"></div>
    <div class="product-sides">
        <a class="product-side active" href="javascript:;">正面</a>
        <a class="product-side" href="javascript:;">反面</a>
        <a class="product-side" href="javascript:;">左袖</a>
        <a class="product-side" href="javascript:;">右袖</a>
    </div>
</div>
<div class="design-right-tools clearfix">
    <div class="product-choices ">
        <span class="label">款式和颜色</span>
        <select class="form-control" id="selectProductCategories">
            <!--                    <option value="">基础T恤款</option>-->
            <!--                    <option value="">超级T恤款</option>-->
        </select>
        <ul class="product-list">
            <!--                    <li class="product-item" tips="基础圆领T恤">-->
            <!--                        <img src="/css/design/product-thumbnail.png"/>-->
            <!--                        <div>-->
            <!--                            <span class="name">基础圆领T恤基础圆领T恤</span>-->
            <!--                            <span class="desc">成本优选</span>-->
            <!--                            <a href="#" class="info">详情</a>-->
            <!--                        </div>-->
            <!--                    </li>-->
            <!--                    <li class="product-item" tips="基础圆领T恤">-->
            <!--                        <img src="/css/design/product-thumbnail.png"/>-->
            <!--                        <div>-->
            <!--                            <span class="name">基础圆领T恤基础圆领T恤</span>-->
            <!--                            <span class="desc">成本优选</span>-->
            <!--                            <a href="#" class="info">详情</a>-->
            <!--                        </div>-->
            <!--                    </li>-->
            <!--                    <li class="product-item active" tips="基础圆领T恤">-->
            <!--                        <img src="/css/design/product-thumbnail.png"/>-->
            <!--                        <div>-->
            <!--                            <span class="name">基础圆领T恤基础圆领T恤</span>-->
            <!--                            <span class="desc">成本优选</span>-->
            <!--                            <a href="#" class="info">详情</a>-->
            <!--                        </div>-->
            <!--                    </li>-->
            <!--                    <li class="product-item" tips="基础圆领T恤">-->
            <!--                        <img src="/css/design/product-thumbnail.png"/>-->
            <!--                        <div>-->
            <!--                            <span class="name">基础圆领T恤</span>-->
            <!--                            <span class="desc">成本优选</span>-->
            <!--                            <a href="#" class="info">详情</a>-->
            <!--                        </div>-->
            <!--                    </li>-->
            <!--                    <li class="product-item">-->
            <!--                        <img src="/css/design/product-thumbnail.png"/>-->
            <!--                        <div>-->
            <!--                            <span class="name">基础圆领T恤</span>-->
            <!--                            <span class="desc">成本优选</span>-->
            <!--                            <a href="#" class="info">详情</a>-->
            <!--                        </div>-->
            <!--                    </li>-->
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
    <a class="next-step" href="javascript:;">下一步</a>
</div>
<div id="design_selected_tools" class="design-selected-tools">
    <div class="form-row">
        <div class="form-label">
            <input type="checkbox" id="snapCenter" checked/>
            <label for="snapCenter">引导居中</label>
        </div>
    </div>
    <div class="form-row">
        <a href="javascript:;" id="duplicateBtn" class="icon-tools icon-tools-duplicate" title="复制"></a>
        <a href="javascript:;" id="alignToCenterBtn" class="icon-tools icon-tools-align-center" title="对齐中心"></a>
        <a href="javascript:;" id="moveToBottomBtn" class="icon-tools icon-tools-move-bottom" title="移到底层"></a>
        <a href="javascript:;" id="horizontalBtn" class="icon-tools icon-tools-horizontal" title="水平翻转"></a>
        <a href="javascript:;" id="verticalBtn" class="icon-tools icon-tools-vertical" title="垂直翻转"></a>

        <div class="clearfix"></div>
    </div>
</div>
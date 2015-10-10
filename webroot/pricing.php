<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="css/common/style.css">
    <link rel="stylesheet" type="text/css" href="css/design/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/pricing.css"/>
    <script src="js/app/design/vendor/jquery-1.11.2.js"></script>
</head>
<div class="design-main">
    <div class="design-top">
        <div class="design-top-leaf"></div>
        <div class="design-top-center">
            <div class="design-top-nav">
                <a class="step step-1" href="/design"><i class="scissors"></i>1.设计</a>
                <a class="step step-2 active" href="#"><i class="scissors"></i>2.设定目标</a>
                <a class="step step-3 clearfix" href="/push"><i class="scissors"></i>3.添加描述</a>
            </div>
            <div class="btn-group">
                <a class="btn btn-default" href="javascript:;">保存</a>
            </div>
        </div>
    </div>
    <div class="design-center">
        <div class="ds-pricing-left">
            <div class="ds-pricing-row">
                <div class="ds-pricing-row-label">设定目标</div>
                <div id="saleScroll"></div>
            </div>
            <div class="ds-pricing-row">
                <div class="ds-pricing-row-left-panel">
                    <input class="sale-goal" type="text"/>
                    <span class="sale-goal-unit">件</span>
                </div>
                <div class="ds-pricing-row-right-panel">
                    <p>
                        目标是你希望能达到的销售目标，超过目标可以继续销售，不过你的成本将按照你设定的销售目标计算。如果没有达到目标，只要达到10件，且你设定的价格高于实际成本，我们仍将为你生产。
                    </p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="ds-pricing-row dotted-top-line">
                <div class="ds-pricing-row-left-panel">
                    <div class="ds-pricing-row-left-panel-label">预计利润</div>
                </div>
                <div class="ds-pricing-row-right-panel">
                    <div class="total-profit">
                        <span class="money-unit-cn">¥</span>
                        <span class="money-num">2,555.73+</span>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="ds-pricing-row dotted-top-line">
                <div class="ds-pricing-row-label">
                    设定售价
                </div>
                <div class="product-list">
                    <div class="product-item product-item-default">
                        <div class="product-item-icon"></div>
                        <div class="product-item-left">
                            <img class="product-image" src=""/>
                        </div>
                        <div class="product-item-right">
                            <div class="product-item-pricing-info">
                                <div class="product-item-right-column">
                                    <div class="product-item-right-column-label">
                                        成本：
                                    </div>
                                    <div class="product-item-right-column-info">
                                        ¥
                                        <span class="product-item-right-column-info-num">35.79</span>
                                    </div>
                                </div>
                                <div class="product-item-right-column product-item-right-column-sign">
                                    <span>+</span>
                                </div>
                                <div class="product-item-right-column">
                                    <div class="product-item-right-column-label">
                                        利润：
                                    </div>
                                    <div class="product-item-right-column-info">
                                        ¥
                                        <span class="product-item-right-column-info-num">35.79</span>
                                    </div>
                                </div>
                                <div class="product-item-right-column product-item-right-column-sign">
                                    <span>=</span>
                                </div>
                                <div class="product-item-right-column">
                                    <div class="product-item-right-column-label" style="text-align: center;">
                                        售价：
                                    </div>
                                    <div class="product-item-right-column-info">
                                        <span class="product-item-right-column-money-unit">¥</span>
                                        <input type="text" class="product-item-right-column-input"/>
                                    </div>
                                </div>
                            </div>
                            <div class="product-item-color-info">
                                <span class="product-item-color-info-label">已选颜色</span>
                                <div class="product-item-selected">
                                    <div class="product-item-color product-item-color-default">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                    <div class="product-item-color">
                                        <span class="product-item-color-inner"></span>
                                        <span class="product-item-color-delete"></span>
                                    </div>
                                </div>
                                <div class="product-item-color-dropdown">
                                    <div class="product-item-color-btn"></div>
                                    <div class="product-item-color-menu">
                                        <div class="product-item-color-menu-arrow"></div>
                                        <div class="product-item-color-menu-color-list">
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                            <a class="product-item-color-menu-color-item" title="黑色" data-color="#000000"><span style="background: #000000;"></span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        <a class="product-item-delete" href="#"></a>
                    </div>
                </div>
                <div class="product-add">
                    <div class="product-add-icon"></div>
                    <div class="product-add-total">还可以添加 <span>9</span> 种商品</div>
                    <div class="product-add-tool">
                        <div class="product-add-control">
                            <div class="product-add-label">款式选择</div>
                            <div class="product-add-select"></div>
                        </div>
                        <div class="product-add-control">
                            <div class="product-add-label">产品选择</div>
                            <div class="product-add-select"></div>
                        </div>
                        <div class="product-add-control">
                            <div class="product-add-btn">添加</div>
                        </div>
                    </div>
                    <div class="product-add-desc">
                        添加更多的品类，让你的产品选择更加丰富
                    </div>
                </div>
            </div>
        </div>
        <div class="ds-pricing-right">
            <div class="ds-pricing-product-view">
                <div id="ds_preview"></div>
            </div>
            <div class="ds-pricing-product-sides">
                <a class="ds-pricing-products-side" href="#">正面</a>
                <a class="ds-pricing-products-side" href="#">反面</a>
                <a class="ds-pricing-products-side" href="#">左袖</a>
                <a class="ds-pricing-products-side" href="#">右袖</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>
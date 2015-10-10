<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="css/common/style.css">
    <link rel="stylesheet" type="text/css" href="css/design/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/push.css"/>
    <script src="js/app/design/vendor/jquery-1.11.2.js"></script>
</head>
<div class="design-main">
    <div class="design-top">
        <div class="design-top-leaf"></div>
        <div class="design-top-center">
            <div class="design-top-nav">
                <a class="step step-1" href="/design"><i class="scissors"></i>1.设计</a>
                <a class="step step-2" href="/pricing"><i class="scissors"></i>2.设定目标</a>
                <a class="step step-3 active clearfix" href="#"><i class="scissors"></i>3.添加描述</a>
            </div>
            <div class="btn-group">
                <a class="btn btn-default" href="javascript:;">保存</a>
            </div>
        </div>
    </div>
    <div class="design-center">
        <div class="ds-push-left">
            <div class="form-row">
                <div class="form-label">活动名称</div>
                <div class="form-label-desc">活动描述文字不超过40个字</div>
                <div class="text-form-control">
                    <input type="text"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">详细描述</div>
                <div class="text-form-control">
                    <input type="text"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">标签</div>
                <div class="form-label-desc">标签能帮助用户更方便的找到你的活动。请输入不超过五个标签描述你的活动（如：大学，篮球等)</div>
                <select class="form-control" name="" id=""></select>
            </div>
            <div class="form-row">
                <div class="form-label">活动周期</div>
                <div class="form-label-desc">众筹成功，用户将在活动结束后的7-10天收到物品</div>
                <select class="form-control" name="" id=""></select>
            </div>
            <div class="form-row">
                <div class="form-label">URL</div>
                <div class="form-label-desc">通过你专属的地址分享你的活动</div>
                <div class="text-form-control">
                    <input type="text"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">发货方式</div>
                <div class="form-label">
                    <input type="checkbox"/>
                    <label for="snapCenter">统一发货，让购买者到你指定的地址提货</label>
                </div>
            </div>
            <div class="form-row">
                <div class="form-label">默认显示</div>
                <select class="form-control" name="" id="">
                    <option value="">正面</option>
                    <option value="">反面</option>
                    <option value="">左袖</option>
                    <option value="">右袖</option>
                </select>
            </div>
        </div>
        <div class="ds-push-right">
            <div class="ds-push-product-view">
                <div id="ds_preview_2"></div>
            </div>
            <div class="ds-push-product-sides">
                <a class="ds-push-products-side active" href="#">正面</a>
                <a class="ds-push-products-side" href="#">反面</a>
                <a class="ds-push-products-side" href="#">左袖</a>
                <a class="ds-push-products-side" href="#">右袖</a>
                <div class="clearfix"></div>
            </div>
            <a class="last-step" href="javascript:;">发起活动</a>
        </div>
    </div>
</div>
</body>
</html>
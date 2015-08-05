<!DOCTYPE html>
<html lang="zh-CN">
    <?php echo $this->element('site-header'); ?>
    <link rel="stylesheet" type="text/css" href="/resources/theme/index/css/index.css">
    <body>

        <?php echo $this->element('page-header'); ?>
        <div class="page-wrapper">
            <!-- 横幅 -->
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img class="first-slide" style="display:block;margin: 0 auto" src="/resources/theme/index/image/side1.jpg"
                             alt="First slide">

                        <div class="container">
                            <div class="carousel-caption">
                                <p><a href="/design" class="btn btn-lg btn-started design hidden-xs" href="#" role="button">开始设计</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <a class="left carousel-control hidden" href="#myCarousel" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">上一个</span>
                </a>
                <a class="right carousel-control hidden" href="#myCarousel" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">下一个</span>
                </a>
            </div>
            <!-- /.横幅 -->
            <div class="container video-block hidden">
                <div class="row">
                    <div class="col-xs-6"><img
                            src="http://img2.imgtn.bdimg.com/it/u=3314021191,3873244427&fm=21&gp=0.jpg"
                            class="img-responsive"></div>
                    <div class="col-xs-6">
                        <h3>易衫网可以帮助您零成本、零风险、零烦恼的销售高品质个性化服装</h3>

                        <p>您只需设计出一个图案，设定价格、销售目标和期限，就可以开始一次服装的众筹！当实现您设定的目标，我们就会开始生产并直接发货给买家，而你则获得利润</p>
                    </div>
                </div>
            </div>
            <div class="top-activities">
                <div class="container">
                    <h3>热门活动</h3>
                    <div class="row">
                        <?php
                        if ($activity && is_array($activity)) {
                            foreach ($activity as $a) {
                                $width = ($a['sales_count'] / $a['sales_target']) * 100;
                                if ($width > 100) {
                                    $width = 100;
                                }
                                ?>
                                <div class="col-lg-3 col-md-4 col-xs-12 col-sm-6">
                                    <div class="mod-item">
                                        <div class="mod-head">
                                            <a href="/activity/<?php echo $a['id']; ?>" target="_blank" class="img"><img
                                                    src="<?php echo $a['style']['image']; ?>" alt="" title=""></a>
                                        </div>
                                        <div class="mod-body">
                                            <h3><a href="/activity/<?php echo $a['id']; ?>" target="_blank" title="活动名称"><?php echo $a['name']; ?></a></h3>

                                            <div class="progress">
                                                <div class="progress-bar progress-bar-success progress-bar-green" role="progressbar"
                                                     aria-valuenow="22" aria-valuemin="0" aria-valuemax="0" style="width: <?php echo $width; ?>%">
                                                    <span class="sr-only"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mod-footer">
                                            <div class="status clearfix">
                                                <span><b>¥ <?php echo $a['style']['price']; ?></b>售价</span>
                                                <span class="pull-right"><b><?php echo $a['sales_count'] . '/' . $a['sales_target']; ?></b>已售/目标</span>
                                            </div>
                                            <div class="desc clearfix">
                                                <a href="/activity/<?php echo $a['id']; ?>" target="_blank" class="label label-blue">
                                                    众筹 | 进行中</a>
                                                <a href="/activity/<?php echo $a['id']; ?>" target="_blank" class="pull-right">支持: <?php echo empty($a['orderGoodsQuantity'])?0:$a['orderGoodsQuantity']; ?></a>
                                                <!--<a href="/activity/1#project-support">讨论: 32</a>-->

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <?php echo $this->element('site-footer'); ?>
    </body>
</html>
<?php
$design_id = $row['activity']['design_id'];
$svgs = PtLib\db()->select_rows("select * from design_svg_side where design_id = ?",$design_id);


?>
<div class="row">
    <div class="col-xs-12">
        <div class="widget-box">
            <div class="widget-header">
                <h4 class="widget-title"><?php echo $row['activity']['name']; ?></h4>
            </div>

            <div class="widget-body">
                <div class="widget-main">
                    <div class="row">
                        <div class="col-xs-2">
                            <?php if($row['activity']["thumb_img_url"]){ ?>
                                <img style="width: 100px;height:100px;" src="<?=$row['activity']["thumb_img_url"]?>" alt="">
                            <?php } else { ?>
                                <img style="width: 100px;height:100px;" src="<?=$row['activity']["thumb_svg_url"]?>" alt="">
                            <?php } ?>
                        </div>
                        <div class="col-xs-8">
                            <table class="table">
                                <tr>
                                    <th style="text-align: right">发起人UID</th>
                                    <td style="text-align: left"><a target='_blank' href='/admin/user/modify?id=<?php echo $row['activity']['uid']; ?>'><?php echo $row['activity']['uid']; ?></a></td>
                                    <th style="text-align: right">开始时间</th>
                                    <td style="text-align: left"><?php echo $row['activity']['start_time']; ?></td>
                                    <th style="text-align: right">结束时间</th>
                                    <td style="text-align: left"><?php echo $row['activity']['end_time']; ?></td>
                                </tr>
                                <tr>
                                    <th style="text-align: right">销售目标</th>
                                    <td style="text-align: left"><?php echo $row['activity']['sale_target']; ?></td>
                                    <th style="text-align: right">实际销售</th>
                                    <td style="text-align: left"><?php echo $row['activity']['sale_count']; ?></td>
                                    <th style="text-align: right">颜色数量</th>
                                    <td style="text-align: left"><?php echo $row['activity']['colors']; ?></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <div class="row">
                                <?php foreach($svgs as $svg){ ?>
                                <div class="col-xs-3">
                                    <img src="<?=$svg['svg_url']?>" alt="" style="border: 1px solid grey; background-color: #F9F9F9">
                                    <br><a class="btn btn-primary" target="_blank" href="<?=$svg['svg_url']?>"><?=$svg['side']?> 下载</a>
                                </div><?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
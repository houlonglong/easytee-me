<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title></title>
<style type="text/css">
    * { margin: 0; padding: 0; }
    body { font-size: 12px; color: #333; font-family: "宋体"; }
    img { border: 0 none; vertical-align: middle; }
    ul, ol { list-style: none; }
    span, em, i { font-style: normal; }
    dl, dd, dt { margin: 0; padding: 0; }
    a { text-decoration: none; }
    .clearfix:after { clear: both; content: "."; display: block; height: 0; visibility: hidden; }
    h2 { font-size: 28px; line-height: 1.8em; border-bottom: 1px solid #333; }
    table { margin: 20px 0; border-collapse: collapse; }
    table thead th, table tbody td { text-align: center; vertical-align: middle; height: 30px; border: 1px solid #666; }
    .wrap { width: 600px; margin: 30px auto; }
    .email-title p { margin-bottom: 25px; }
    .email-title p b { font-size: 22px; }
    .email-pattern ul li { margin-top: 20px; }
    .email-pattern-left { width: 48%; float: left; }
    .email-pattern-left dl dt img, .email-pattern-right dt img { display: block; width: 100px; height: 100px; }
    .email-pattern-left dl dt, .email-pattern-right dt { margin-bottom: 10px; }
    .email-pattern-left dl dd p b { font-size: 14px; }
    .email-pattern-left dl dd p { margin-bottom: 10px; }
    .email-pattern-left dl dd p span { margin-right: 15px; }
    .email-pattern-right { width: 48%; float: right; }
    .email-pattern-right p b { font-size: 14px; }
    .email-pattern-right p { line-height: 1.5em; }
    .email-pattern-right p:first-child { margin-bottom: 10px; }
    .email-size { margin-top: 15px; }
    .email-remind p { margin-top: 20px; line-height: 1.5em; }
</style>
</head>
<?php
$designData = json_decode($designInfo['DesignInfo']['design'], true);
$quantity   = 0;
?>
<body>
    <div class="wrap">
        <div class="email-title">
            <p><b><?=$name;?>活动的成衣印花订单 - 易衫网</b></p>
            <p>本次成衣印刷订单信息如下：</p>
        </div>
        <div class="email-pattern">
            <h2>印花图案</h2>
            <ul>
                <?php
                    $i = 0; 
                    for($i=0; $i<4; $i++){
                        if(empty($designData['side'.$i])) continue;
                    ?>
                <li class="clearfix">
                    <div class="email-pattern-left">
                      <dl class="clearfix">
                        <dt> <a href="<?=$products['0']['styles']['0']['image'][$i]['l'];?>" target="_blank" ><img src="<?=$products['0']['styles']['0']['image'][$i]['s'];?>"></a> </dt>
                        <dd>
                            <p><b>面<?=$i;?></b></p>
                            <p>颜色数量：<?=count($designData['productConfig']['printColors'][$i])?></p>
                            <p>尺寸：<?=$designData['productConfig']['printSize'][$i]?></p>
                        </dd>
                      </dl>
                    </div>
                    <div class="email-pattern-right">
                      <dl class="clearfix">
                        <dt> <a href="<?=WWW_URL;?>/design/getDesignInfo/<?=$designInfo['DesignInfo']['design_id']?>">查看设计图</a></dt>
                        <dd>
                          <p><b>备注</b></p>
                          <p><?=$sideRemark[$i]?></p>
                        </dd>
                      </dl>
                    </div>
                  </li>
                <?php } ?>
            </ul>
        </div>
        <div class="email-size">
            <h2>服装数量&尺码</h2>
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>款式</th>
                        <th>尺码</th>
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($products as $product){ ?>
                    <?php if(!empty($product['styles'])){ ?>
                    <?php foreach($product['styles'] as $style){ ?>
                    <?php foreach($style['designs'] as $goods){ 
                        $quantity += $goods['quantity'];
                        ?>
                    <tr>
                        <td><?=$product['name'];?> <?=$goods['color'];?></td>
                        <td><?=$goods['size'];?></td>
                        <td><?=$goods['quantity'];?></td>
                    </tr>
                    <?php } ?>
                    <?php } ?>
                    <?php } ?>
                    <?php } ?>
                    <tr>
                        <td colspan="3" style="text-align: right;padding-right:10px;">合计：<?=$quantity?>件</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="email-remind">
            <h2>特别提醒</h2>
            <p><?=$remark;?></p>
        </div>
    </div>
</body>
</html>
<div class="size-modal">
    <ul class="nav nav-tabs hidden-xs" role="tablist">
        <?php $i = 0;
        $typename = '';
        foreach ($size as $s) {
            if ($i == 0) {
                $typename = $s[0]['name'];
            }
            ?>
            <li role="presentation" class=" <?php echo ($i == 0) ? 'active' : ''; ?>">
                <a href="#activity-sizes-<?php echo $s[0]['product_id']; ?>"
                   aria-controls="activity-sizes-<?php echo $s[0]['product_id']; ?>" role="tab" data-toggle="tab">
                    <?php echo $s[0]['name']; ?>
                </a>
            </li>
            <?php $i++;
        }
        ?>

    </ul>
    <select class="form-control visible-xs" onchange="showSizeChang(this)">
        <?php $i = 0;
        foreach ($size as $s) { ?>
            <option value="activity-sizes-<?php echo $s[0]['product_id']; ?>">
                <?php echo $s[0]['name']; ?>

            </option>
            <?php $i++;
        }
        ?>
    </select>

    <div class="tab-content">
        <?php $i = 0;
        foreach ($size as $key => $s) { ?>

            <div role="tabpanel" class="tab-pane fade in <?php echo ($i == 0) ? 'active' : ''; ?>"
                 id="activity-sizes-<?php echo $s[0]['product_id']; ?>">
                <div class="table-responsive">
                    <table class="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th>品牌</th>
                            <th>尺码</th>
                            <th class="product-size-length">衣长</th>
                            <th class="breast">半胸围</th>
                            <!-- <th class="shoulder-width">肩宽</th> -->
                            <th class="product-size-height">推荐身高</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php ;
                        foreach ($s as $key => $info) { ?>
                        <tr>
                            <td><?php echo $info['name']; ?></td>
                            <td><?php echo $info['size']; ?></td>
                            <td class="product-size-length"><?php echo $info['length']; ?>cm</td>
                            <td class="breast"><?php echo $info['breast']; ?>cm</td>
                            <!-- <td class="shoulder-width"><?php echo $info['shoulder_width']; ?>cm</td> -->
                            <td class="product-size-height"><?php echo $info['height']; ?>cm</td>
                        </tr>
                        </tbody>
                        <?php } ?>
                    </table>
                </div>
            </div>
            <?php $i++;
        } ?>
        <p class="visible-xs">表格看不全？请试试水平拖动</p>
    </div>
</div>
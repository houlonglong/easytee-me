<?php
$rows = <<<EOT
tools/deploy|部署工具
tools/merge_db_from_old|数据库迁移

EOT;

include_once(__DIR__."/../init.php");
get_tests($rows);
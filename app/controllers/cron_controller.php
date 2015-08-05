<?php

/**
 * 定时任务
 */
class CronController extends AppController {
    var $name = 'Cron';
    var $uses = array("Order","ProductStyleSize");

    function beforeFilter() {
        $this->layout = '';
    }
    function order(){
        try {
            $this->Order->query('START TRANSACTION');
            $rows = $this->Order->getExpiredOrder(0.25);
            foreach ($rows as $row) {
                $OrderGoods = $row['OrderGoods'];
                foreach ($OrderGoods as $OrderGood) {
                    if ($OrderGood["product_style_size_id"]) {
                        //echo json_encode($OrderGood);
                        $this->ProductStyleSize->handle_inventory_by_id($OrderGood["product_style_size_id"], $OrderGood['quantity'], "+");
                    }
                }
                $this->Order->delExpiredOrder($row['Order']['id']);
            }
            $this->Order->query('COMMIT');
        }catch (EtException $e) {
            $this->Order->query('ROLLBACK');
            pt_log($e->getMessage());
        } catch (Exception $e) {
            $this->Order->query('ROLLBACK');
            pt_log($e->getMessage());
        }
        echo "order";exit;
    }
    function activity(){
        echo "activity";exit;

    }
}

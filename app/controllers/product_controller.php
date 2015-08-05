<?php

class ProductController extends AppController {

    var $uses = array('Product', 'Manufacturer',
        'ProductStyle', 'ProductStyleSize', 'ProductStyleImage', 'ProductStyleImageRegion', 'AppProduct', 'ProductCategory',
        'ProductCategoryMap', 'AppProductCategory', 'AppProductCategoryMap', 'AppProductStyle',);
    var $name = "ProductController";

    function beforeFilter() {
        parent::beforeFilter();
    }

    /**
     * 获取产品信息
     * @param type $pid 产品ID
     * @param type $psid 产品样式ID
     */
    public function get() {

        if (!isset($_REQUEST['productId']) || empty($_REQUEST['productId'])) {
            $this->common->errorList(11006);
        }
        $pid = $_REQUEST["productId"];
        $psid = '';
        if (isset($_REQUEST['productStyleId'])) {
            $psid = $_REQUEST['productStyleId'];
        }

        $result = $this->getProductInfo($this->_app->id, $pid, $psid);
        $this->common->response($result);
    }

    public function getProductById() {
        if (!isset($_REQUEST['productId']) || empty($_REQUEST['productId'])) {
            $this->common->errorList(11006);
        }
        $pid = $_REQUEST["productId"];
        $product = $this->Product->getProductById($pid);
        if (!$product) {
            $this->common->errorList(11012);
        }
        $product['Product']['long_description'] = $this->cdnReplace($product['Product']['long_description']);
        $this->common->response($product['Product']);
    }

    /**
     * 根据产品分类ID获取产品列表
     * @param type $pcid 产品分类ID
     */
    public function getList() {
        if (!isset($_REQUEST["productCategoryId"]) || empty($_REQUEST["productCategoryId"])) {
            $this->common->errorList(11010);
        }
        $pcid = $_REQUEST["productCategoryId"];
        $productCategory = $this->AppProductCategory->getAppProductCategoryById($this->_app->id, $pcid);
        if (!$productCategory) {
            $this->common->errorList(11010);
        }
        $ids = $this->AppProductCategoryMap->getAppProductIdFromProductCategoryMapByCategoryId($this->_app->id, $pcid);
        $appProduct = $this->AppProduct->getAppProductByIds($this->_app->id, $ids);
        $CS = array();
        $this->loadModel('ManufacturerBrand');

        foreach ($appProduct as $a => $b) {
            $b = $b['AppProduct'];
            $product = $this->Product->getProductById($b['product_id']);
            // 如果产品已下架，则继续下一条
            if (!$product) {
                continue;
            }
            // var_dump($this->_app->id, $b['id']);
            $appProductStyle = $this->AppProductStyle->getAppProductStyleListByPidAndIsDefault($this->_app->id, $b['id']);

            $ProductStyle = $this->ProductStyle->getProductStyleListByIds($appProductStyle['AppProductStyle']['product_style_id']);
            if (!$ProductStyle) {
                continue;
            }
            $image = $this->ProductStyleImage->getProductStyleImageByStyleIdAndName($this->_app->id, $ProductStyle[0]['ProductStyle']['id']);
            $manufacturer = $this->Manufacturer->getManufacturerById($this->_app->id, $product['Product']['manufacturer_id']);
            $ManufacturerBrand = $this->ManufacturerBrand->getManufacturerBrandById($this->_app->id, $product['Product']['manufacturer_brand_id']);
            $pss = json_decode($ProductStyle[0]['ProductStyle']['colors'], TRUE);
            $CS[] = array(
                'name' => 'CS',
                'attribute' => array(
                    'category' => $productCategory['AppProductCategory']['name'],
                    'manufacturer' => @$ManufacturerBrand['ManufacturerBrand']['name'],
                    'manufacturer_sku' => $product['Product']['manufacturer_sku'],
                    'product_id' => $b['id'],
                    'product_category_id' => $pcid,
                    'sku' => $product['Product']['sku'],
                    'is_static' => 0,
                    'name' => $b['product_name'],
                    'product_style_id' => $appProductStyle['AppProductStyle']['id'],
                    'product_style_uri' => $appProductStyle['AppProductStyle']['id'],
                    'is_default' => 0,
                    'color' => $ProductStyle[0]['ProductStyle']['color_name'],
                    'html_color' => @$pss[0]['name'],
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'unit_price' => $appProductStyle['AppProductStyle']['selling_price'],
                    'thumburl_front' => @$image['ProductStyleImage']['imgurl'],
                    'thumburl_front_cached' => @$image['ProductStyleImage']['thumburl'],
                ),
            );
        }
        $result = array(
            'name' => 'ProductList',
            'item' => $CS,
        );
        $this->common->response($result);
    }

    /**
     * 获取产品分类列表
     * @param $appKey
     */
    public function getCategoryList() {

        $temp = $this->AppProductCategory->getAppProductCategoryByAppId($this->_app->id);
        if ($temp) {
            $categoryList = $temp;
        } else {
            $categoryList = array();
        }
        $xml = '';
        $productCate = array();
        foreach ($categoryList as $key => $val) {
            $val = $val['AppProductCategory'];
            $productCate[] = array(
                'name' => 'vw_product_categories',
                'attribute' => array(
                    'product_category_id' => $val['id'],
                    'name' => $val['name'],
                    'path' => $val['path'],
                    'thumburl_front' => $val['thumb'],
                ),
            );
        }
        $result = array(
            'name' => 'ProductCategoryList',
            'item' => $productCate,
        );
        $this->common->response($result);
    }

    /**
     * 获取产品的详细信息
     * @param type $this ->_app->id
     * @param type $pid
     * @param type $styleID
     * @return type
     */
    private function getProductInfo($appid, $pid, $styleID = '') {

        $appProduct = $this->AppProduct->getAppProductById($appid, $pid);
        if (!$appProduct) {
            $this->common->errorList(11012);
        }
        $product = $this->Product->getProductById($appProduct['AppProduct']['product_id']);
        if (!$product) {
            $this->common->errorList(11012);
        }
        //Star 默认产品数据
        $this->loadModel('ManufacturerBrand');
        $Manufacturer = $this->Manufacturer->getManufacturerById($appid, $product['Product']['manufacturer_id']);
        $ManufacturerBrand = $this->ManufacturerBrand->getManufacturerBrandById($appid, $product['Product']['manufacturer_id'], $product['Product']['manufacturer_brand_id']);
        $appProductStyle = empty($styleID) ? $this->AppProductStyle->getAppProductStyleListByPid($appid, $pid) : $this->AppProductStyle->getAppProductStyleListByIds($appid, $styleID);
        $productStyles = array();
        $ColorResult = '';
        if (!$appProductStyle) {
            $this->common->errorList(11013);
        }
        foreach ($appProductStyle as $key => $value) {
            $value = $value['AppProductStyle'];
            $productStyle = $this->ProductStyle->getProductStyleListByIds($value['product_style_id']);
            if (!$productStyle) {
                continue;
            }
            $productStyle = $productStyle[0]['ProductStyle'];
            $temp = json_decode($productStyle['colors'], true);
            //accounting  颜色的比重
            $temp = $this->common->aasort($temp, 'accounting', 'asc', true);
            $html_color = $temp[0]['name'];
            $ProductStyleSize = $this->ProductStyleSize->getProductStyleSizeByPsids($appid, $productStyle['id']);
            $sizes = array();
            $sizesids = array();
            $upcharges = array();
            foreach ($ProductStyleSize as $a => $b) {
                $b = $b['ProductStyleSize'];
                $sizes[] = $b['size'];
                $sizesids[] = $b['id'];
                $upcharges[] = $b['increase']; //各个尺码是否需要加减价
            }
            $sizes = implode(',', $sizes);
            $sizesids = implode(',', $sizesids);
            $upcharges = implode(',', $upcharges);

            $image_width = '500';
            $image_height = '500';

            $produtRegions = array();
            $images = $this->ProductStyleImage->getProductStyleImageByStyleId($appid, $value['product_style_id']);
            if ($images) {
                foreach ($images as $c => $d) {
                    $d = $d['ProductStyleImage'];
                    $regions = $this->ProductStyleImageRegion->getProductStyleImageRegionByIds($appid, $d['id']);

                    if ($d['side'] == 'front') {
                        $thumburl_front = $d['thumburl'];
                        $thumburl_front_cached = $d['thumburl'];
                    }
                    foreach ($regions as $e => $f) {
                        $f = $f['ProductStyleImageRegion'];
                        $produtRegions[] = array(
                            'name' => 'product_regions',
                            'attribute' => array(
                                'product_region_id' => $f['id'],
                                'side_name' => $d['name'],
                                'side' => $d['side'],
                                'is_default' => $f['is_default'],
                                'name' => $f['name'],
                                'region' => $f['region'],
                                'render_width_inches' => $f['render_width_inches'],
                                'side_order' => $d['sequence'],
                                'region_order' => $f['sequence'],
                                'imgurl' => $d['imgurl'],
                                'thumburl' => $d['thumburl'],
                            ),
                            'item' => array(
                                'name' => 'print_mask',
//                            'attribute' => array(
//                                'name' => '',
//                                'value' => '',
//                                'art_path' => '',
//                            ),
                            ),
                        );
                    }
                    $ColorResult[] = array(
                        'name' => 'product_styles',
                        'attribute' => array(
                            'product_style_id' => $value['product_style_id'],
                            'color' => $productStyle['color_name'],
                            'html_color' => $html_color,
                            'thumburl_front' => $thumburl_front,
                            'thumburl_front_cached' => $thumburl_front_cached,
                            "can_print" => "1",
                            'can_digital_print' => 1,
                            "can_screen_print" => 1,
                            'can_embroider' => 0,
                            'sizes' => $sizes,
                            'sizeids' => $sizesids,
                            'image_width_front' => $image_width,
                            'image_height_front' => $image_height,
                            'image_width_back' => $image_width,
                            'image_height_back' => $image_height
                        ),
                    );
                }
            }
            $productStyles[] = array(
                'name' => 'product_styles',
                'attribute' => array(
                    'product_style_id' => $value['id'],
                    'is_default' => $value['is_default'],
                    'color' => $productStyle['color_name'],
                    'html_color' => $html_color,
                    'customizable' => 1,
                    'can_print' => 1,
                    'can_digital_print' => 1,
                    'can_screen_print' => 1,
                    'can_embroider' => 0,
                    'unit_price' => $value['selling_price'],
                    'canvas_price' => '6.00',
                    'name_price' => '4.00',
                    'number_price' => '4.00',
                    'sizes' => $sizes,
                    'sizeids' => $sizesids,
                    'upcharges' => $upcharges,
                    'image_width_front' => $image_width,
                    'image_height_front' => $image_height,
                    'image_width_back' => $image_width,
                    'image_height_back' => $image_height,
                ),
                'item' => $produtRegions
            );
        }
        $mfr_image = json_decode(@$ManufacturerBrand['ManufacturerBrand']['brand_image']);
        $productResult = array(
            'name' => 'products',
            'attribute' => array(
                'product_id' => $pid,
                'manufacturer' => @$Manufacturer['Manufacturer']['Abbreviation'],
                'mfr_image_wide' => $mfr_image->wide,
                'mfr_image_square' => $mfr_image->square,
                'mfr_image_tiny' => $mfr_image->tiny,
                'manufacturer_sku' => $product['Product']['manufacturer_sku'],
                'sku' => $product['Product']['sku'],
                'name' => $appProduct['AppProduct']['product_name'],
                'customizable' => 1,
                'can_print' => 1,
                'can_digital_print' => 1,
                'can_screen_print' => 1,
                'can_embroider' => 0,
                'can_handle_sleeves' => 0,
                'enable_team_name_numbers' => 1,
                'has_back' => 1,
                'has_third_side' => 0,
                'has_fourth_side' => 0,
                'third_side_name' => "左袖",
                'fourth_side_name' => '右袖',
                'is_static' => 0,
                'require_design' => 0,
                'long_description' => str_replace('"', "'", $product['Product']['long_description'])
            ),
            'item' => $productStyles,
        );
        $result = array(
            'name' => 'ProductResult',
            'attribute' => null,
            'item' => array($productResult)
        );
        return $result;
    }

}

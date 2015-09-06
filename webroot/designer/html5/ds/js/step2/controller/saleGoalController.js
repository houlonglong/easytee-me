/**
 * Created by haolun on 15/6/18.
 */
Namespace("ui.controllers");
ui.controllers.SaleGoalController = function($scope){

    $scope.saleGoal = 50;//销售目标
    $scope.preTotalProfit = 0;//预计利润
    $scope.products = [];//产品列表
    $scope.activityName = '';
    $scope.description = '';
    $scope.deadline = '7';
    $scope.deliveryType = false;
    $scope.freePostage = false;
    $scope.addressId = '';
    $scope.addressInfo = '';

    function getProductDetails(product, callback){
        service.getProductDetails(product.product_id, null, null, function(c) {
            for(var i=0; i<c.product_styles.length; i++){
                var style = c.product_styles[i];
                style.selected = false;
            }
            product.product_styles = c.product_styles;
            product.product_selected_styles = [];
            callback(product);
        });
    }

    function updateView(){
        calcTotalProfitByTotalCount();//计算预计利润
        calcProfitOfProductsByTotalCount();//计算产品列表利润
        $scope.$$phase || $scope.$apply();
    }

    /**
     * 从产品列表中取得单件最高服装成本
     */
    function getMaxUnitPrice(){
        var unitPrices = [];
        for(var i=0; i<$scope.products.length; i++){
            if($scope.products[i].unit_price){
                unitPrices.push($scope.products[i].unit_price);
            }else{
                var product = $scope.products[i];
                for(var j=0; j<product.product_selected_styles.length; j++){
                    var selectedStyle = product.product_selected_styles[j];
                    unitPrices.push(selectedStyle.unit_price);
                }
            }
        }
        unitPrices = quickSort(unitPrices, 0, unitPrices.length-1);
        return parseFloat(unitPrices[unitPrices.length-1]);
    }

    function getMaxUnitPriceFromProduct(product){
        if(product.unit_price){
            return product.unit_price;
        }else{
            var unitPrices = [];
            for(var j=0; j<product.product_selected_styles.length; j++){
                var selectedStyle = product.product_selected_styles[j];
                unitPrices.push(selectedStyle.unit_price);
            }
            unitPrices = quickSort(unitPrices, 0, unitPrices.length-1);
            return parseFloat(unitPrices[unitPrices.length-1]);
        }
    }

    /**
     * 从产品列表中取得单件最低售价
     */
    function getMinPrice(minCost){
        var prices = [];
        for(var i=0; i<$scope.products.length; i++){
            if(!$scope.products[i].price){
                $scope.products[i].price = parseInt(minCost*1.5);//默认售出为1.5倍成本
            }
            prices.push($scope.products[i].price);
        }
        prices = quickSort(prices, 0, prices.length-1);
        return parseFloat(prices[0]);
    }

    /**
     * 根据总数计算最低总利润
     * 单件成本＝服装单价(state.selectedProductStyle.unit_price)＋加工成本（颜色数量、总销量）
     * 单件利润＝售价(input)－单件成本
     * 预计利润＝单件利润（最低）＊销售目标（默认50）
     */
    function calcTotalProfitByTotalCount(){
        var saleNum = parseInt($scope.saleGoal);
        var machiningCostAll = calcTotalMachiningCost(saleNum);
        var maxUnitPrice = getMaxUnitPrice();//最高服装成本
        var oneCost = maxUnitPrice + machiningCostAll;//单件最高成本
        var onePrice = getMinPrice(oneCost);//单件最低售价
        var oneProfit = onePrice - oneCost;//单件最低利润
        var totalProfit = parseFloat(oneProfit.toFixed(2)) * saleNum;//最低总利润
        $scope.preTotalProfit = totalProfit < 0.1 ? 0 : totalProfit.toFixed(2);//Math.ceil(totalProfit);
    }

    /**
     * 根据总数（造成的加工成本变化而）调整单件售价
     */
    function calcProfitOfProductsByTotalCount(){
        var machiningCostAll = calcTotalMachiningCost(parseInt($scope.saleGoal));
        var products = $scope.products;
        for(var i=0; i<products.length; i++){
            var product = products[i];
            var oneCost = parseFloat(getMaxUnitPriceFromProduct(product)) + machiningCostAll;//单件成本
            var oneProfit = product.price - oneCost;
            product.profit = parseFloat(oneProfit.toFixed(2));
        }
        $scope.product = products;
    }

    function calcPropertyProduct(product){
        var machiningCostAll = calcTotalMachiningCost(parseInt($scope.saleGoal));
        var oneCost = getMaxUnitPriceFromProduct(product) + machiningCostAll;//单件成本
        var onePrice = parseInt(oneCost * 1.5);
        var oneProfit = onePrice - oneCost;
        product.price = onePrice;
        product.profit = parseFloat(oneProfit.toFixed(2));
    }

    eventManager.on('saleGoal-selectedProduct', function(product){
        $scope.selectedProduct = product;
    });

    function searchProductInArray(product){
        var arr = $scope.products;
        for(var i=0; i<arr.length; i++){
            var obj = arr[i];
            if(obj.product_id == product.product_id){
                return obj;
            }
        }
        return false;
    }

    $scope.addProduct = function(){
        if(!searchProductInArray($scope.selectedProduct)){
            calcPropertyProduct($scope.selectedProduct);
            var style = {
                color: $scope.selectedProduct.color,
                html_color: $scope.selectedProduct.html_color,
                product_style_id: $scope.selectedProduct.product_style_id
            };
            getProductDetails($scope.selectedProduct, function(c){
                c.product_selected_styles.push(style);
                for(var i=0; i<c.product_styles.length; i++){
                    var _style = c.product_styles[i];
                    if(style.product_style_id == _style.product_style_id){
                        _style.selected = true;
                    }
                }
                $scope.products.push(c);
                $scope.$$phase || $scope.$apply();
            });
        }else{
            console.info('重复添加');
        }
    };

    $scope.productPriceInputCheck = function(product){
        var value = event.target.value;
        if(value.match(/\d{1,}\.{0,1}\d{0,2}/g) != null){
            value = value.match(/\d{1,}\.{0,1}\d{0,2}/g)[0];
            event.target.value = value;
            product.price = value;
            updateView();
        }else{
            value = '';
            event.target.value = value;
        }
    };

    $scope.saleGoalInputChange = function(){
        var value = event.target.value;
        value = value.match(/[0-9]/g) != null ? value.match(/[0-9]/g).join('') : '';
        if(value>1000){
            value = 1000;
        }
        event.target.value = value;
        $('#point_slider').honest_slider('value', value);
    };

    $scope.saleGoalInputBlur = function(){
        var value  = event.target.value;
        value = value.match(/[0-9]/g) != null ? value.match(/[0-9]/g).join('') : 10;
        if(value<10){
            value=10;
        }
        if(value>1000){
            value = 1000;
        }
        event.target.value = value;
        $('#point_slider').honest_slider('value', value);
    };

    $scope.toggleColor = function($event, product, style){
        $event.stopPropagation();
        var existed = false, index;
        for(var i=0; i<product.product_selected_styles.length; i++){
            var _style = product.product_selected_styles[i];
            if(_style.product_style_id == style.product_style_id){
                existed = true;
                index = i;
                break;
            }
        }
        if(existed){
            //保留一个颜色不可以取消
            if(product.product_selected_styles.length == 1){
                return;
            }
            style.selected = false;
            product.product_selected_styles.splice(index, 1);
        }else{
            style.selected = true;
            product.product_selected_styles.push(style);
        }
        $($event.target).parent().toggleClass('active');
        $scope.$$phase || $scope.$apply();
    };

    $scope.isErrorProTotalProfit = function(){
        return $scope.preTotalProfit == 0 ? true : false;
    };

    $scope.isErrorProfitOfProduct = function(){
        var errorNum;
        for(var i=0; i<$scope.products.length; i++){
            var product = $scope.products[i];
            if(product.price.length == 0){
                errorNum = i;
                break;
            }
        }
        return errorNum == undefined ? false : true;
    };

    eventManager.on('validateActivity', function(callback){
        for(var i=0; i< $scope.products.length; i++){
            var product = $scope.products[i];
            if(product.price.length == 0){
//                alert('售价不能为空');
                $('#product_price_input_'+product.product_id).focus();
                return;
            }
        }
        if($scope.preTotalProfit <= 0){
            $scope.proTotalProfitError = true;
            $scope.$apply();
//            alert('预计利润不能小于等于零。');
            return;
        }
        callback();
    });

    eventManager.on('saveActivity', function(callback){

        var _products = [];
        for(var i=0; i< $scope.products.length; i++){
            var product = $scope.products[i];
            var _product = {};
            _product.id = product.product_id;
            _product.price = product.price;
            _product.styles = [];
            var styles = product.product_selected_styles;
            for(var j=0; j<styles.length; j++){
                _product.styles.push({
                    id: styles[j].product_style_id
                });
            }
            _products.push(_product);
        }
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            type: 0,//0代表众筹，1代表采购
            activityId: ezdVars.ActivityID,
            designId: state.selectedDesignID,
            target: parseInt($scope.saleGoal),
            products: _products
        };
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/api?model=design/tool/beta&action=activity_save',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data){
                callback();
            },
            failure: function(){
                console.log('failure');
            }
        })
    });

    $scope.deleteProduct = function(product){
        var idx;
        for(var i=0; i<$scope.products.length; i++){
            var _product = $scope.products[i];
            if(_product.product_id == product.product_id){
                idx = i;
                break;
            }
        }
        if(idx != undefined){
            $scope.products.splice(idx, 1);
            updateView();
        }
    };

    //保存活动
    eventManager.on('doneActivity', function(callback){
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            designId: ezdVars.DesignID,
            activityId: ezdVars.ActivityID,
            name: $scope.activityName,//0代表众筹，1代表采购
            description: $scope.description,
            deadline: $scope.deadline,
            deliveryType: $scope.deliveryType ? 'unity' : 'custom',
            freePostage: $scope.freePostage,//包邮
            addressId: $('[name=selectedAddressGroup]', '#addressTable').val(),
            addressInfo: $scope.addressInfo
        };
        if(data.name == null || data.name.trim().length == 0){
            $('[ng-model=activityName]').parents('.form-group').addClass('has-error');
            $('[ng-model=activityName]').focus();
            return;
        }else{
            $('[ng-model=activityName]').parents('.form-group').removeClass('has-error');
        }
        if(data.description == null || data.description.trim().length == 0){
            $('[ng-model=description]').parents('.form-group').addClass('has-error');
            $('[ng-model=description]').focus();
            return;
        }else{
            $('[ng-model=description]').parents('.form-group').removeClass('has-error');
        }
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/api?model=design/tool/beta&action=activity_save_info',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data){
                if(data.status == 0){
                    callback();
                    //convert_to_png(function(content){
                    //    $.post("/api?model=design/tool/beta&action=save_act_thumb",{"act_id":ezdVars.ActivityID,content:content},function(data){
                    //        callback();
                    //    });
                    //})
                }else{
                    alert(data.message);
                }

            },
            failure: function(){
                console.log('failure');
            }
        })
    });

    eventManager.on('updateStep2View', function(callback){
        service.ajaxCallStarted('activityInfo', '获取活动数据');
        $('#activityDirect').attr('href', '/activity/'+ezdVars.ActivityID);
        $scope.products = [];
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/api?model=design/tool/beta&action=activity_activity_info',
            type: 'post',
            dataType: 'json',
            data: {
                dataType: 'json',
                appKey: ezdVars.AppToken,
                userToken: ezdVars.UserToken,
                activityId: ezdVars.ActivityID
            },
            success: function(data){
                $scope.saleGoal = data.target;
                $scope.activityName = data.name;
                $scope.description = data.description || '';
                $scope.deadline = (data.deadline == 0 ? "7": data.deadline);//TODO 默认值是0可能不对
                $scope.deliveryType = data.deliveryType == 'custom' ? false : true;
                $scope.freePostage = data.freePostage == '1' ? true : false;//包邮
                $scope.addressId = data.addressId;
                $scope.addressInfo = data.notes;

                var products = [];
                for(var i=0; i<data.products.length; i++){
                    var obj = data.products[i];
                    var product_selected_styles = [];
                    var thumburl_front;
                    for(var j=0; j<obj.product_selected_styles.length; j++){
                        var style = obj.product_selected_styles[j];
                        if(j==0){
                            thumburl_front = style.image;
                        }
                        product_selected_styles.push({
                            product_style_id: style.id,
                            color: style.color,
                            unit_price: style.unit_price,
                            html_color: style.html_color
                        });
                    }
                    var product_styles = [];
                    for(var j=0; j<obj.product_styles.length; j++){
                        var style = obj.product_styles[j];
                        for(var n=0; n<obj.product_selected_styles.length; n++){
                            var selected_style = obj.product_selected_styles[n];
                            if(style.id == selected_style.id){
                                style.selected = true;
                                break;
                            }
                        }
                        product_styles.push({
                            product_style_id: style.id,
                            color: style.color,
                            html_color: style.html_color,
                            unit_price: style.unit_price,
                            selected: style.selected ? true : false
                        });
                    }
                    products.push({
                        product_id: obj.id,
                        thumburl_front: thumburl_front,
                        name: obj.name,
                        product_selected_styles: product_selected_styles,
                        product_styles: product_styles,
                        price: obj.price,
                        manufacturer: obj.manufacturer_name,
                        unit_price: getMaxUnitPriceFromProduct(obj)
                    });
                }
                $scope.products = products;
                updateView();
                if(callback){
                    callback()
                };
                service.ajaxCallEnded('activityInfo');
            }
        });
    });

    $scope.changeDeliveryType = function(){
        $scope.deliveryType = !$scope.deliveryType;
    }

    //初始化
    setTimeout(function(){
        $('#point_slider').honest_slider({
            scope: $scope,
            scales: [
                [0, 10],
                [0.05, 50],
                [0.1, 100],
                [0.3, 300],
                [0.5, 500],
                [0.7, 700],
                [1, 1000]
            ],
            slider: function(value, setSaleGoal){
                setSaleGoal && ($scope.saleGoal = parseInt(value));//修改销售目标
                updateView();
            }
        });
    }, 1);

    /**
     * 计算印刷成本1
     * @return array
     */
    function get_print_cost() {
        var arr = [];
        var colorNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var saleNumbers = [10, 20, 30, 40, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        var Const = [];
        Const[10] = [];
        Const[10][1] = 15;
        Const[10][10] = 45;
        for(var i=0, c = colorNumbers.length; i<c; i++){
            var x = colorNumbers[i];
            if(x >1 && x < 10){
                Const[10][c-x+1] = Const[10][c-x+2] - (Const[10][10] - Const[10][1]) / c;
            }
        }
        Const[20] = [];
        Const[20][1] = 13.5;
        Const[20][2] = 19.5;
        Const[20][3] = 22;
        Const[20][4] = 25;
        Const[20][5] = 27.5;
        Const[20][6] = 30.0;
        Const[20][7] = 32.0;
        Const[20][8] = 34.0;
        Const[20][9] = 38.0;
        Const[20][10] = 41.5;
        Const[500] = [];
        Const[500][1] = 7.5;
        Const[500][2] = 11.0;
        Const[500][3] = 12;
        Const[500][4] = 14;
        Const[500][5] = 15.0;
        Const[500][6] = 16.40;
        Const[500][7] = 17.0;
        Const[500][8] = 18.0;
        Const[500][9] = 20.0;
        Const[500][10] = 23.0;
        var Const1 = [];
        Const1[1] = 5;
        Const1[2] = 6.40;
        Const1[3] = 7.10;
        Const1[4] = 7.80;
        Const1[5] = 8.50;
        Const1[6] = 9.20;
        Const1[7] = 9.90;
        Const1[8] = 10.60;
        Const1[9] = 11.30;
        Const1[10] = 12.0;
        var _y = 10;
        for(var i=0; i<saleNumbers.length; i++){
            var y = saleNumbers[i];
            for(var j=0; j<colorNumbers.length; j++){
                var x = colorNumbers[j];
                var value = '';
                if(Const[y] && Const[y][x]){
                    value = Const[y][x];
                }else{
                    if(y == 30){
                        value = arr[_y][x] - (Const[_y][x] - Const1[x]) / saleNumbers.length;
                    }else if(y > 30){
                        value = arr[_y][x] - (Const[10][x] - Const1[x]) / saleNumbers.length;
                    }
                }
                if(arr[y] == undefined){
                    arr[y] = [];
                }
                arr[y][x] = value;
            }
            _y = y;
        }
        return arr;
    }

    /**
     * 计算印刷成本2
     * @param color_num  颜色数量
     * @param sale_num   销售数量
     */
    function calcMachiningCost(colorNum, saleNum) {
        if(colorNum == 0){
            return 0;
        }
        var price = null;
        var costs = get_print_cost();
        var preSaleNum = 10;
        var preColors = [];
        for(var _saleNum in costs){
            var colors = costs[_saleNum];
            if(saleNum == _saleNum){
                price = colors[colorNum] != undefined ? colors[colorNum] : null;
                break;
            }else if(saleNum < _saleNum){
                preColors = costs[preSaleNum];
                price = Math.formatFloat(preColors[colorNum] + (colors[colorNum] - preColors[colorNum]) * (saleNum - preSaleNum) / (_saleNum - preSaleNum) , 2);
                break;
            }
            preSaleNum = _saleNum;
        }
        return price == null ? 0 : price;
    }

    /**
     * 计算印刷成本3
     * @param color_num  颜色数量
     * @param sale_num   销售数量
     */
    function calcTotalMachiningCost(saleNum) {
        return calcMachiningCost(getDesignColors(), saleNum);
    }
};
ui.controllers.DesignColorsController = function(b, d, c) {
    b.canPrint = true;
    b.price_preview = (parseFloat(state.selectedProductStyle.unit_price)+10).toFixed(2);
    b.maxScreenPrintColors = ezdVars.MaxScreenPrintColors;
    var g = function() {
        //b.colorsInUse = state.dsUtils.getColorsInUse(null, false, false);
        //b.numColors = state.dsUtils.getColorsInUse(null, false, true).length;
        updatePricePreview();
        b.$$phase || b.$apply();
        b.canPrint = state.dsUtils.canPrintDesign();

    };
    eventManager.on("designCanvasChanged", g);
    eventManager.on("designChanged", g);
    eventManager.on("designColorsChanged", g);
    eventManager.on("undoRedo", g);
    state.dsUtils.addRenderedHandlerOneTime(g);
    g();
//    function calcMachiningCost(colorCount, totalCount){
//        var money = 10-((10-2)/990*totalCount);
//        money += colorCount;
//        return colorCount == 0 ? 0 : money;
//    }
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
                        value = parseFloat((arr[_y][x] - (Const[_y][x] - Const1[x]) / saleNumbers.length).toFixed(2));
                    }else if(y > 30){
                        value = parseFloat((arr[_y][x] - (Const[10][x] - Const1[x]) / saleNumbers.length).toFixed(2));
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
                price = preColors[colorNum] + (colors[colorNum] - preColors[colorNum]) * (saleNum - preSaleNum) / (_saleNum - preSaleNum);
                break;
            }
            preSaleNum = _saleNum;
        }
        return price == null ? 0 : parseFloat(price.toFixed(2));
    }

    function updatePricePreview() {
//        var ColorData = state.dsUtils.getPricingColorData();
//        var machiningCostFront = calcMachiningCost(ColorData.usrColors.front.length, 50);//50件加工成本
//        var machiningCostBack = calcMachiningCost(ColorData.usrColors.back.length, 50);//50件加工成本
//        var machiningCostRight = calcMachiningCost(ColorData.usrColors.right.length, 50);//50件加工成本
//        var machiningCostLeft = calcMachiningCost(ColorData.usrColors.left.length, 50);//50件加工成本
//        var machiningCostAll = machiningCostFront + machiningCostBack + machiningCostRight + machiningCostLeft;
//        var oneCost = machiningCostAll + parseFloat(state.selectedProductStyle.unit_price);
        var oneCost = calcMachiningCost(getDesignColors(), 50) + parseFloat(state.selectedProductStyle.unit_price);
        if(getDesignColors() == 0){
            b.price_preview = (oneCost+10).toFixed(2);
        }else{
            b.price_preview = (oneCost).toFixed(2);
        }
    };

};
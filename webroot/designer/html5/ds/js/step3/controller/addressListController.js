/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.AddressListController = function($scope, $compile, $routeParams, $location, $rootScope){



    function load(callback){
        $scope.addressList = [];
        var defaultId;
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/api?model=user/setting&action=address_list',
            type: 'post',
            data: {
                dataType: 'json',
                appKey: ezdVars.AppToken,
                userToken: ezdVars.UserToken,
                default: true
            },
            success: function(data){
                data = data.return;
                if(data){
                    for(var i=0; i<data.length; i++){
                        var obj = data[i];
                        if(i==0){
                            defaultId = obj.id;
                        }
                        $scope.addressList.push({
                            id: obj.id,
                            receiver: obj.name,
                            address: obj.province + obj.city + obj.county + obj.address,
                            tel: obj.mobile
                        });
                    }
                    $scope.$apply();
                    if(callback){
                        callback(defaultId);
                    }
                }
            }
        });
    }

    eventManager.on('addressSelectedRow', function(id){
        selectedRow(id);
        $scope.$apply();
    });

    function selectedRow(id){
        $('#addressTable').find('tr').removeClass('active');
        $('input[value='+id+']').prop('checked', true).parents('tr').addClass('active');
    }

    eventManager.on('loadAddressList', function(id){
        if(id){
            load(function(){
                selectedRow(id);
                $('#addressListTable').scrollTop(0);
            });
        }else{
            load();
        }
    });

    $scope.selectAddress = function(){
        if(event.target.tagName == 'A'){
            return false;
        }
        var radio = $(event.target).parents('tr').find('input[type=radio]');
        //如果不是点击的input radio
        if(radio[0] != event.target){
            //如果radio是未选中状态
            if(radio.prop('checked') == false){
                radio.prop('checked', true);
                selectedRow(radio.attr('value'));
            }
        }else{
            selectedRow(radio.attr('value'));
        }
    }

    load(function(defaultId){
        if(defaultId){
            selectedRow(defaultId);
        }
    });
};
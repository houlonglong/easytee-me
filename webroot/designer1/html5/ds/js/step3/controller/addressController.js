/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.AddressController = function($scope, $compile, $routeParams, $location, $rootScope){

    $scope.onShow = function(g, attr){
        if(attr.addressId){
            var data = {
                dataType: 'json',
                appKey: ezdVars.AppToken,
                userToken: ezdVars.UserToken,
                addressId: attr.addressId
            };
            $.ajax({
                url: '//' + ezdVars.ApiDomain + '/Address/get/',
                type: 'post',
                data: data,
                success: function(data){
                    if(data){
                        console.log(data);
                    }
                }
            });
        }else{
            $scope.address = {
                name: '',
                tel: '',
                province: $scope.province,
                city: $scope.city,
                area: $scope.area,
                address: ''
            };
            $scope.$apply();
        }
    };

    $scope.saveAndUse = function(){
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            name: $scope.address.name,
            tel: $scope.address.tel,
            province: $scope.province,
            city: $scope.city,
            area: $scope.area,
            addr: $scope.address.address
        };
        var name = $('[ng-model="address.name"]');
        if (!name.val()) {
            name.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('姓名不能为空');
            return false;
        }else{
            name.parents('.form-group').removeClass('has-error').find('label.control-label').text('姓名');
        }
        var tel = $('[ng-model="address.tel"]');
        if (!tel.val()) {
            tel.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('手机不能为空');
            return false;
        }else{
            tel.parents('.form-group').removeClass('has-error').find('label.control-label').text('手机号码');
        }
        var filter  = /^((1[0-9]{1})+\d{9})$/;
        if (!filter.test(tel.val())) {
            tel.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('手机号码格式错误');
            return false;
        }else{
            tel.parents('.form-group').removeClass('has-error').find('label.control-label').text('手机号码');
        }
        var address = $('[ng-model="address.address"]');
        if (!address.val()) {
            address.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('详细地址不能为空');
            return false;
        }else{
            address.parents('.form-group').removeClass('has-error').find('label.control-label').text('详细地址');
        }
        var btn = $(event.target);
        btn.text('保存中...');
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/Address/save/',
            type: 'post',
            data: data,
            success: function(data){
                if(data){
                    btn.text('保存并使用该地址');
                    eventManager.trigger('loadAddressList', data.id);
                    $scope.close();
                }
            }
        });
    }

    $scope.save = function(){
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            id: $scope.address.id,
            name: $scope.address.name,
            tel: $scope.address.tel,
            province: $scope.province,
            city: $scope.city,
            area: $scope.area,
            addr: $scope.address.address
        };
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/Address/save/',
            type: 'post',
            data: data,
            success: function(data){
                debugger;
            }
        });
    };
};
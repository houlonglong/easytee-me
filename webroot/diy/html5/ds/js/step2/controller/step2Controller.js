/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.Step2Controller = function($scope, $compile, $routeParams, $location, $rootScope){
    eventManager.trigger('goStep', 2);
};
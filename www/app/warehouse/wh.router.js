angular.module('app.wh')
    .config(config);

function config($stateProvider){
    $stateProvider
        .state('wh', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/warehouse/layout/index.html'
        })
        .state('wh.p', {
            url: '/p',
            views: {
                'body': {
                    controller: 'WarehouseCtrl',
                    controllerAs: 'Warehouse',
                    templateUrl: 'app/warehouse/layout/panel.html'
                }
            }
        })
}

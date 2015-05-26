angular.module('app.wh')
    .config(config)
    .run(appRun);

function config($stateProvider){
    $stateProvider
        .state('wh', {
            url: '/panel',
            abstract: true,
            templateUrl: 'app/warehouse/layout/index.html'
        })
        .state('wh.p', {
            url: '/p',
            templateUrl: 'app/warehouse/layout/index.html',
            views: {
                'body': {
                    controller: 'WarehouseCtrl',
                    controllerAs: 'Warehouse',
                    templateUrl: 'app/warehouse/layout/panel.html'
                }
            }
        })
}

function appRun() {

}
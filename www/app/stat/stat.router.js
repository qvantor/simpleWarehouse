angular.module('app.stat')
    .config(config);

function config($stateProvider){
    $stateProvider
        .state('wh.stat', {
            url: '/s',
            views: {
                'body': {
                    controller: 'StatCtrl',
                    controllerAs: 'Stat',
                    templateUrl: 'app/stat/layout/stat.html'
                }
            }
        })
}
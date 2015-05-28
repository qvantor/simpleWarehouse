angular.module('app.arch')
    .config(config);

function config($stateProvider){
    $stateProvider
        .state('wh.arch', {
            url: '/a',
            views: {
                'body': {
                    controller: 'ArchiveCtrl',
                    controllerAs: 'Archive',
                    templateUrl: 'app/warehouse/layout/archive.html'
                }
            }
        })
}

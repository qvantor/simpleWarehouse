angular.module('app', [
    'app.core',
    'blocks.logger'
])
    .config(configure)
    .run(runApp);

function runApp($rootScope, $location) {
}

function configure($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('name', {
            url: '/',
            templateUrl: 'app/layout/index.html'
        })
   $urlRouterProvider.otherwise('/');
}

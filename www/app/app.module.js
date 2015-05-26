angular.module('app', [
    'app.core',
    'app.wh',
    'blocks.logger'
])
    .config(configure)
    .run(runApp);

function runApp($rootScope, $location) {
}

function configure($urlRouterProvider, $stateProvider) {
   $urlRouterProvider.otherwise('/');
}

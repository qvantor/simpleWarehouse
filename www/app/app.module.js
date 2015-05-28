angular.module('app', [
    'app.core',

    'app.wh',
    'app.arch',
    'app.stat',
    'app.auth',

    'blocks.logger',
    'blocks.req'
])
    .config(configure)
    .run(runApp);

function runApp($rootScope, $location) {}

function configure($urlRouterProvider, $stateProvider) {
   $urlRouterProvider.otherwise('/');
}

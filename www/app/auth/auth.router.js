angular.module('app.auth')
    .config(config);

function config($stateProvider){
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'loginCtrl',
            templateUrl: 'app/auth/layout/login.html'
        })
}

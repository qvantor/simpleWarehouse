angular.module('app.auth')
    .controller('loginCtrl',login);

function login ($scope, req, $state){
    $scope.login = function(){
        req.post('c=session&a=authorize', $scope.user, function(res){
            $state.go('wh.p');
        });
    }
}
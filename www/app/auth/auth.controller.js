angular.module('app.auth')
    .controller('loginCtrl',login);

function login ($scope, req){
    req.post('http://devastor.ru/api2/index.php?c=seller&a=showEstate', {login:'devastor',pass:'4a3b4d44'}, function(res){
        
    });
}
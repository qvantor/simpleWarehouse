angular.module('app.wh')
    .controller('WarehouseCtrl', Warehouse)
    .controller('HeaderCtrl', Header);

function Warehouse($scope){

}
function Header($scope, req, $state){
    $scope.out = function(){
        req.post('c=session&a=out', {}, function(res){
            $state.go('login');
        });
    }
}
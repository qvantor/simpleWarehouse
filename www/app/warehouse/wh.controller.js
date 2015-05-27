angular.module('app.wh')
    .controller('WarehouseCtrl', Warehouse)
    .controller('HeaderCtrl', Header)
    .controller('AddCtrl', Add);

function Warehouse($scope){

}
function Header($scope, req, $state, $modal){
    $scope.out = function(){
        req.post('c=session&a=out', {}, function(res){
            $state.go('login');
        });
    }
    $scope.NewOpen = function (id) {
        var modalInstance = $modal.open({
            animation: true,
            controller: 'AddCtrl',
            templateUrl: 'app/warehouse/layout/modal/addwh.html'
        });
    }
}
function Add($scope, logger){
    $scope.data = {
        type: 'Штук',
        count: 1,
        per: 50
    };
    $scope.recalculate = function(){
        $scope.wh = $scope.data;

        var wh = $scope.wh;
        wh.sum = Math.round(wh.price * wh.count);
        if (wh.price > 99) {
            wh.priceone = Math.ceil((wh.price + (wh.price * (wh.per / 100))) / 10) * 10;
        }else{
            wh.priceone = Math.ceil(wh.price + (wh.price * (wh.per / 100))) ;
        }
        wh.priceall = wh.priceone * wh.count;
        wh.profit = wh.priceall - wh.sum;

    }
    $scope.recalculate();
}
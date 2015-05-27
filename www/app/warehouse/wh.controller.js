angular.module('app.wh')
    .controller('WarehouseCtrl', Warehouse)
    .controller('HeaderCtrl', Header)
    .controller('AddCtrl', Add);

function Warehouse($scope, req){
    req.post('c=warehouse&a=getAll', {}, function(res){
        $scope.items = res;
    });
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
function Add($scope, req, $modalInstance, calc){
    $scope.data = {
        item: 'Штук',
        count: 1,
        per: 50
    };

    $scope.recalculate = function(){
        $scope.wh = $scope.data;
        $scope.wh = calc.calc($scope.wh);
    }

    $scope.recalculate();
    $scope.save = function(){
        req.post('c=warehouse&a=add', $scope.wh, function(res){
            $modalInstance.close();
        });
    }
}
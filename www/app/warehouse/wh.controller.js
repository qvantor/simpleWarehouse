angular.module('app.wh')
    .controller('WarehouseCtrl', Warehouse)
    .controller('HeaderCtrl', Header)
    .controller('AddCtrl', Add)
    .controller('EditCtrl', Edit);

function Warehouse($scope, req, calc, $modal){
    req.post('c=warehouse&a=getAll', {}, function(res){
        for(var i = 0; i< res.length; i++){
            res[i] = calc.calc(res[i]);
        }
        $scope.items = res;
    });
    $scope.edit = function(id){
        var modalInstance = $modal.open({
            animation: true,
            controller: 'EditCtrl',
            templateUrl: 'app/warehouse/layout/modal/addwh.html',
            resolve: {
                item: function () {
                    return $scope.items[id-1];
                }
            }
        });
    }

    $scope.sold = function(id){
        arr = {
            id: id,
            count: $scope.sold.count[id]
        }
        req.post('c=warehouse&a=sold', arr, function(res){});
    }
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
    $scope.action = 'Добавить';

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

function Edit($scope, calc, item, req, $modalInstance){
    $scope.action = 'Изменить';

    $scope.recalculate = function(){
        $scope.wh = item;
        $scope.wh = calc.calc($scope.wh);
    }

    $scope.recalculate();

    $scope.save = function(){
        req.post('c=warehouse&a=update', $scope.wh, function(res){
            $modalInstance.close();
        });
    }
}
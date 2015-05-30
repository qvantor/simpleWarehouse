angular.module('app.wh')
    .controller('WarehouseCtrl', Warehouse)
    .controller('HeaderCtrl', Header)
    .controller('AddCtrl', Add)
    .controller('EditCtrl', Edit);

function Warehouse($scope, req, calc, $modal){
    $scope.update = function() {
        req.post('c=warehouse&a=getAll', {}, function (res) {
            total = {count: 0, sum: 0, priceall: 0, profit: 0};
            for (var i = 0; i < res.length; i++) {
                res[i] = calc.calc(res[i]);
                total['count'] += res[i]['count'];
                total['sum'] += res[i]['sum'];
                total['priceall'] += res[i]['priceall'];
                total['profit'] += res[i]['profit'];
            }
            $scope.items = res;
            $scope.total = total;
        });
    }
    $scope.update();

    $scope.$on("updateWH",function () {$scope.update();});

    $scope.edit = function(id){
        var modalInstance = $modal.open({
            animation: true,
            controller: 'EditCtrl',
            templateUrl: 'app/warehouse/layout/modal/addwh.html',
            resolve: {
                item: function () {
                    return $scope.items[id];
                }
            }
        });
    }

    $scope.sold = function(id){
        arr = {
            id: id,
            count: $scope.sold.count[id]
        }
        req.post('c=warehouse&a=sold', arr, function(res){
            $scope.sold.count ={};
        });
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
function Add($scope, req, $modalInstance, calc, $rootScope){
    $scope.data = {
        item: 'Штук',
        count: 1,
        per: 50
    };
    $scope.action = 'Добавить';
    $scope.recalculate = function(per){
       $scope.wh = $scope.data;
       $scope.wh = calc.calc($scope.wh, per);
    }

    $scope.recalculate();
    $scope.save = function(){
        req.post('c=warehouse&a=add', $scope.wh, function(res){
            $rootScope.$broadcast("updateWH");
            $modalInstance.close();
        });
    }
}

function Edit($scope, calc, item, req, $modalInstance, $rootScope){
    $scope.action = 'Изменить';

    $scope.recalculate = function(){
        $scope.wh = item;
        $scope.wh = calc.calc($scope.wh);
    }

    $scope.recalculate();

    $scope.save = function(){
        req.post('c=warehouse&a=update', $scope.wh, function(res){
            $rootScope.$broadcast("updateWH");
            $modalInstance.close();
        });
    }
}
angular.module('app.arch')
    .controller('ArchiveCtrl',Archive);

function Archive($scope, calc, req){
    req.post('c=archive&a=getAll', {}, function(res){
        total = {count: 0, sum: 0, priceall: 0, profit: 0};
        for(var i = 0; i< res.length; i++){
            res[i] = calc.calc(res[i]);
            total['count'] += res[i]['count'];
            total['sum'] += res[i]['sum'];
            total['priceall'] += res[i]['priceall'];
            total['profit'] += res[i]['profit'];
        }
        $scope.archive = res;
        $scope.total = total;
    });
}
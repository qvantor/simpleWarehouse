angular.module('app.arch')
    .controller('ArchiveCtrl',Archive);

function Archive($scope, calc, req){
    req.post('c=archive&a=getAll', {}, function(res){
        for(var i = 0; i< res.length; i++){
            res[i] = calc.calc(res[i]);
        }
        $scope.archive = res;
    });
}
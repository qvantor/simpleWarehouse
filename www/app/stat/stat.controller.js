angular.module('app.stat')
    .controller('StatCtrl', Stat);

function Stat($scope, req, calc){
    req.post('c=stat&a=get', {}, function(res){
        a = {};
        curProfit = 0;

        for (var i = 0; i < res.archive.length; i++) {
            a[i] = calc.calc(res.archive[i]);
            curProfit += (a[i]['count']*(a[i]['price']+(a[i]['price']*(a[i]['per']/100))))-a[i]['count']*a[i]['price'];


        }


        w = {};
        curProfit = 0;

        for (var i = 0; i < res.warehouse.length; i++) {
            w[i] = calc.calc(res.warehouse[i]);
            curProfit += (w[i]['count']*(w[i]['price']+(w[i]['price']*(w[i]['per']/100))))-w[i]['count']*w[i]['price'];
        }
    });
}
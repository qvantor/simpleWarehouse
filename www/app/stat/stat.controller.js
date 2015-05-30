angular.module('app.stat')
    .controller('StatCtrl', Stat);

function Stat($scope, req, calc){
    req.post('c=stat&a=get', {}, function(res){
        profit = calc.profit(res);

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'area'
                },
                rangeSelector: {
                    enabled: true
                },
                navigator: {
                    enabled: true
                },
                "xAxis": {
                    type: 'datetime',
                    title: {
                        text: 'Дата'
                    }
                },
                "yAxis": {
                    title: {
                        text: 'Сумма'
                    }
                }
            },
            series: [
                {
                    id: 1,
                    name:'Рублей',
                    data: profit['chart'],
                    color: '#3498db'
                }
            ],
            title: {
                text: 'Прибыль'
            }
        }


        w = {};
        curProfit = 0;

        for (var i = 0; i < res.warehouse.length; i++) {
            w[i] = calc.calc(res.warehouse[i]);
            curProfit += (w[i]['count']*(w[i]['price']+(w[i]['price']*(w[i]['per']/100))))-w[i]['count']*w[i]['price'];
        }
    });
}
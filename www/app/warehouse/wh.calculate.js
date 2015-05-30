angular.module('app.wh')
    .factory('calc', calc);

function calc(){
    var service = {
        calc: calculate,
        profit : profit
    };
    return service;

    function calculate(data){
        var wh = data;
        wh.sum = Math.round(wh.price * wh.count);
        if (wh.price > 99) {
            wh.priceone = Math.ceil((wh.price + (wh.price * (wh.per / 100))) / 10) * 10;
        }else{
            wh.priceone = Math.ceil(wh.price + (wh.price * (wh.per / 100))) ;
        }
        wh.priceall = wh.priceone * wh.count;
        wh.profit = wh.priceall - wh.sum;
        return wh;
    }

    function profit(res){
        a = {};
        curProfit = 0;
        data = res.archive[0].date;
        j = 0;
        profit = [];
        dayprofit = 0;

        for (var i = 0; i < res.archive.length; i++) {
            a[i] = this.calc(res.archive[i]);
            curProfit += (a[i]['count']*(a[i]['price']+(a[i]['price']*(a[i]['per']/100))))-a[i]['count']*a[i]['price'];

            if(data == a[i]['date']){
                dayprofit += a[i]['profit'];
                if(res.archive.length-1 == i){
                    dayprofit += a[i]['profit'];
                    profit.push([data, dayprofit]);
                }
            }else{
                if(res.archive.length-1 == i){
                    dayprofit += a[i]['profit'];
                    profit.push([data, dayprofit]);
                }else{
                    profit.push([data, dayprofit]);
                }
                dayprofit = 0;
                dayprofit += a[i]['profit'];
                data = a[i]['date'];
            }
        }
        /*
         for(var i=0; i<profit.length; i++){
         ar = profit[i][0].split('-');
         profit[i][0] = Date.UTC(ar[0],ar[1],ar[2]);
         }
         */
        return {
            chart: profit,
            profit: curProfit
        };
    }
}
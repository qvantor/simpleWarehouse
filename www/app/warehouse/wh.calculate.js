angular.module('app.wh')
    .factory('calc', calc);

function calc(){
    var service = {
        calc: calculate
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
}
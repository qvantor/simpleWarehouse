angular
    .module('blocks.req')
    .factory('req', req);

req.$inject = ['$http', 'logger'];

function req($http, logger, $state) {
    var service = {
        post: post
    };

    return service;
    /////////////////////

    function post(url, post, callback) {
        var domain = 'http://devastor.ru/a/index.php?';

        $http.post(domain+url, post).
            success(function(data){
                logger.success(data.m, data);
                callback(data);
            }).
            error(function(data, status, headers, config) {
                logger.error(data.m, data);
                if (status == 401){
                    $state.go('login');
                }
            });
    }
}
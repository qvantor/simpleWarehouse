angular
    .module('blocks.req')
    .factory('req', req);

req.$inject = ['$http', 'logger'];

function req($http, logger) {
    var service = {
        post: post
    };

    return service;
    /////////////////////

    function post(url, post, callback) {
        $http.post(url, post).
            success(callback).
            error(function(data, status, headers, config) {
                logger.info(status,headers,config);
            });
    }
}
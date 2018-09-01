/*
This file exports Redis connection based on URL, Port and Database name it receives.
*/
const REDIS = require('redis');
const Q = require('q');

let createClientUrl = function(host, port, name){
    return host + ':' + port + '/' + name;
}

let createConnection = function(host='localhost', port=6379, databaseName=0, logger=null, callback=null){
    let deferred = Q.defer();
    logger = logger ? logger : function () { };
    let clientUrl = createClientUrl(
        host, 
        port, 
        databaseName
    );
    let redisUserClient = REDIS.createClient(
        clientUrl
    );
    redisUserClient.on('error', function (error) {
        logger('error', 'Redis connection error on ' + clientUrl, { error });
        if (callback) return callback(error, null);
        deferred.reject(error);
    });

    redisUserClient.on('connect', function () {
        logger('info', 'Redis connected on ' + clientUrl);
        if (callback) return callback(null, redisUserClient);
        deferred.resolve(redisUserClient);
    });
    return deferred.promise;
}

module.exports = {
    createConnection
};
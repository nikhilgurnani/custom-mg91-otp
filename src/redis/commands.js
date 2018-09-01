/*
This file contains basic Redis Commands written in Nodejs Functions.
*/
const redisConnection = require('./connection');  
const Q = require('q');

let set = function(key, value, expireTime, redisConf={host, port, databaseName}, callback=null){
    let deferred = Q.defer();
    redisConnection.createConnection(redisConf.host, redisConf.port, redisConf.databaseName).then((connection) => {
        if (expireTime){
            connection.setex(key, expireTime, value, (error, result) => {
                if (callback) return callback(error, result);
                if (error) deferred.reject(error);
                else if (result) deferred.resolve(result);
            });
        } else {
            connection.set(key, value, (error, result) => {
                if (callback) return callback(error, result);
                if (error) deferred.reject(error);
                else if (result) deferred.resolve(result);
            });
        }
    }).catch((exception) => {
        deferred.reject(exception);
    });
    return deferred.promise;
};

let get = function(key, redisConf={host, port, databaseName}, callback=null){
    let deferred = Q.defer();
    redisConnection.createConnection(redisConf.host, redisConf.port, redisConf.databaseName).then((connection) => {
        connection.get(key, (error, result) => {
            if (callback) return callback(error, result);
            if (error) deferred.reject(error);
            else if (result) deferred.resolve(result);
        });
    }).catch((exception) => {
        deferred.reject(exception);
    });
    return deferred.promise;
};

let del = function(key, redisConf={host, port, databaseName}, callback=null){
    let deferred = Q.defer();
    redisConnection.createConnection(redisConf.host, redisConf.port, redisConf.databaseName).then((connection) => {
        connection.del(key, (error, result) => {
            if (callback) return callback(error, result);
            if (error) deferred.reject(error);
            else if (result) deferred.resolve(result);
        });
    }).catch((exception) => {
        deferred.reject(exception);
    });
    return deferred.promise;
};

module.exports = {
    get,
    set,
    del
}

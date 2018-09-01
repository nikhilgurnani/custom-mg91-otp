/*
This file contains MSG91 APIs.
*/
'use static';
const AXIOS = require('axios');
const Q = require('q');

let _requester = function(headers, data){
    let url = process.env.MSG91_API_URL || 'http://api.msg91.com/api/v2/sendsms';
    return AXIOS({
        method: 'post',
        url,
        headers,
        data
    });
};

class MSG91 {
    /**
     * Creates a new MSG91 instance
     * @param {string} authKey Authentication key
     * @param {string, optional} senderId Sender ID of 6 digit
     * @param {number, optional} route 1 for promotional, 4 for transactional
     */
    constructor(authKey, senderId, route, countryCode) {
        if (!authKey) throw new Error('MSG91 auth key is required.');
        if (!senderId) throw new Error('MSG91 sender ID is required.');
        this.authKey = authKey;
        this.route = route || 4;
        this.senderId = senderId;
        this.country = countryCode || 91;
    }

    sendMessage = function(to, message){
        /**
         * Creates a new SendOtp instance
         * @param {number} to receiver's phone number
         * @param {string} message message to be sent to the number
         */
        let deferred = Q.defer();
        if (!phone) throw new Error('Phone is required to send OTP.');
        if (!message) throw new Error('Message is required to send OTP.');
        let deferred = Q.defer();
        let headers = {
            authKey: this.authKey,
        };
        let data = {
            route: this.route,
            country: this.country,
            sender: this.senderId,
            sms: [{
                message,
                to
            }]
        };
        return _requester(headers, data);
    }
};

module.exports = MSG91;
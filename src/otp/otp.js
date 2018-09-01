/*
This file contains OTP class that will create an OTP object.
*/
'use static';
const utilities = require('./../utils');

const msgTemplate = 'Your OTP is {otp}.';
const msgTemplateExpiry = 'Your OTP is {otp}. It will expire in {minutes} minutes.';

class OTP{
    /**
     * Creates a new SendOtp instance
     * @param {number} phone phone number for the OTP
     * @param {number, optional} otp OTP
     * @param {number, optional} otpLength length of otp
     * @param {string, optional} action unique identifier for OTP on this number
     */
    constructor(phone, otp=null, otpLength=4, expiryTime, action=null, template={message, options={}}){
        this.otp = otp || utilities.generateOTP(otpLength);
        this.action = action || utilities.generateUUID();
        this.phone = phone;
        this.message = template.message || msgTemplate;
        if (expiryTime){
            this.expiryTime = expiryTime;
            this.message = this.message || msgTemplateExpiry;
        }
        for (let key in template.options){
            // replace each key in this.message with key value in options
        }
    };

    generateRedisKey(){
        return this.phone + '_' + this.action;
    };

    toString(){
        return JSON.stringify(this);
    };

    static toObject(stringObject){
        return JSON.parse(stringObject);
    };

    send(){
        var promise1 = sendMessage()
        var promise2 = setInRedis()
    }
};

module.exports = OTP;
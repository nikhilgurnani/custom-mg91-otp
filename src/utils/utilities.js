/*
This file contains utility functions for generating OTP, uuid etc.
*/
const uuid4 = require('uuid4');

let generateOTP = function(length=process.env.OTP_LENGTH){
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
}

let generateUUID = function(){
    return uuid4();
}

module.exports = {
    generateOTP,
    generateUUID,
}
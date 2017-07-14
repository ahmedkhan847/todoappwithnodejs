var fs = require("fs");
var httpauth = require("./http-auth");
var X2JS = require('x2js');
module.exports = function (options) {


    var helpers = {};
    try {
        if (typeof (options) == "object") {
            helpers.httpauth = httpauth(options.models);
        }


    } catch (e) {
        console.log("Error at helper options requried but not defined")
    }
    try {
        if (typeof (helpers.models) == 'object') {
            helpers.models = options.models;
        }
    } catch (e) {
        console.log(e)
    }

    var x2js = new X2JS();
    
    helpers.prepareResult = function () {
        var result = {
            status: false,
            message: "",
            data: {},
            errors: {}
        };
        return result;
    };

    return helpers;
}
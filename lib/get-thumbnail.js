'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// get-thumbnail.js

var rp = require('request-promise');
var loadJsonFile = require('load-json-file');

exports.default = function (_opt) {

    return new Promise(function (resolve, reject) {
        // content-type checking
        if (_opt["content-type"] !== "application/json" && _opt["content-type"] !== "application/octet-stream") {

            var err = new Error("Unsupport content type, the content type can be either application/json or application/octet-stream, multipart/form-data is not support now");

            reject(err);
        }

        // params checking
        if (!_opt.width || !_opt.height) {
            var _err = new Error("Missing specification of width or height");

            reject(_err);
        }

        var uri = "https://westeurope.api.cognitive.microsoft.com/vision/v1.0" + "/generateThumbnail" + "?width=" + _opt.width + "&height=" + _opt.height;

        if (_opt["smart-cropping"]) {
            uri += "&smartCropping=" + _opt["smart-cropping"];
        }

        var options = {
            "uri": uri,
            "method": "POST",
            "type": "POST",
            "headers": {
                "Content-Type": "",
                "Ocp-Apim-Subscription-Key": ""
            },
            "body": ""
        };

        options.headers["Ocp-Apim-Subscription-Key"] = _opt["Ocp-Apim-Subscription-Key"];

        switch (_opt["content-type"]) {
            case "application/json":
                options.headers["Content-Type"] = 'application/json';
                options.body = '{"url":"' + _opt.url + '"}';
                break;
            case "application/octet-stream":
                options.headers["Content-Type"] = 'application/octet-stream';
                options.body = _opt.body;
                break;

            // multipart/form-data is not working dur the lack of document

            // case "multipart/form-data":
            //     options.headers["Content-Type"] = 'multipart/form-data';
            //     options.body = _opt.form;
            //     break;
        }

        rp(options).then(function (thumbnailBinary) {

            resolve(thumbnailBinary);
        }).catch(function (err) {

            reject(err);
        }).done();
    });
};

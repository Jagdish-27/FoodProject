"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var http_status_1 = require("../constans/http_status");
exports.default = (function (req, res, next) {
    var token = req.headers.access_token;
    if (!token)
        return res.status(http_status_1.HTTP_UNAUTHORIZED).send("Unauthorized: Missing token");
    try {
        var decodedUser = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user = decodedUser;
    }
    catch (error) {
        console.error("Authentication Error:", error);
        res.status(http_status_1.HTTP_UNAUTHORIZED).send("Unauthorized: Missing user");
    }
    return next();
});

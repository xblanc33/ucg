var jwt = require("jsonwebtoken");
var auth = require('../auth')

module.exports.init = function(ws, db, ObjectID) {
    'use strict';

    ws.post('/login', function(req, res) {
        var credentials = {
            username: req.body.username,
            password: req.body.password
        };
        auth.login(credentials, function(err){res.sendStatus(401)},function(ok){res.json(ok)});
    });/*.post('/signin', function(req, res) {
        var credentials = {
            username: req.body.username,
            password: req.body.password
        };
        auth.signin(credentials, function(err) {res.sendStatus(400)} , function(ok){res.json(ok)})
    });*/
}

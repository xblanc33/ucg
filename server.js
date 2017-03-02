var express = require('express');
var path = require('path');
var auth = require('./auth');
var bodyParser = require('body-parser');
var application_root = __dirname;
var db_url = 'mongodb://localhost:27017/ucg';

//require('./copyJSLib.js').copy();

var mong_client = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var app = express();

//files for HTML pages
app.use(express.static(path.join(application_root, './webApp')));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


mong_client.connect(db_url, function(err, db) {
    if (err) res.send(err);

    else {

        auth.init(db)

        var fs = require('fs');
        var RouteDir = 'routes';
        var files = fs.readdirSync(RouteDir);

        files.forEach(function(file) {
            var filePath = path.resolve('./', RouteDir, file);
            var route = require(filePath);
            route.init(app, db, ObjectID);
        });

    }
});

var transporter = require('./mailer.js').transporter;
app.post('/mails', function(req, res) {

    var sub = '[UCG Contact]['+req.body.email+'] '+req.body.subject;

    var txt = 'Bonjour,\nUne demande de contact a été envoyée par le site web\n\n'+req.body.message;

    transporter.sendMail({
        from: 'webmaster@ucgradignan.fr',
        to: 'xavier.blanc@labri.fr',
        subject: sub,
        text: txt
    }, function(err) {
        if(err) {
            console.log('email js error');
            console.log(err);
        }
        console.log('Message sent')
    });
    res.status(200).end();

});


app.listen(8080, function () {
  console.log('UGC listening on port 8070!');
});

var auth = require('../auth');

module.exports.init = function(ws, db, ObjectID) {
    ws.get('/entrainements', function(req, res) {
        db.collection("entrainements", function(err, entrainements_col) {
            if (err) res.send(err);
            else if (('from' in req.query) && ('to' in req.query)) { //This route is for Calendar
                var req_from = parseInt(req.query.from)
                var req_to = parseInt(req.query.to)
                var results = {}
                results.success = 1
                results.result = []
                    //console.log("from: "+from+" to: "+to)
                    //start end
                entrainements_col.find()
                    .toArray(function(err, entrainements) {
                        if (!err) {
                            for (var i = entrainements.length - 1; i >= 0; i--) {
                                var compet_date = new Date(entrainements[i].date)
                                var day = compet_date.getDate()
                                var month = compet_date.getMonth() + 1
                                entrainements[i].start = compet_date.getTime()
                                entrainements[i].end = compet_date.getTime()
                                entrainements[i].title = day + " / " + month + " , " + entrainements[i].titre + " , " + entrainements[i].lieux
                            };
                            results.result = entrainements
                            res.send(JSON.stringify(results))
                        } else res.send(err);
                    })
            } else if ('visible' in req.query) { //This route gets only event with visible
                //console.log("inscription")
                entrainements_col.find({
                    'visible': true
                }).toArray(function(err, entrainements) {
                    if (!err) {
                        res.send(JSON.stringify(entrainements))
                    } else res.send(err);
                })
            } else if ('inscription' in req.query) { //This route gets only event with open inscription
                //console.log("inscription")
                var today = new Date()
                entrainements_col.find({
                    'inscription': true
                }).toArray(function(err, entrainements) {
                    if (!err) {
                        var result = []
                        for (var i = entrainements.length - 1; i >= 0; i--) {
                            var date = new Date(entrainements[i].date_inscription)
                            var start_date = date.getTime() - 1000 * 60 * 60 * 24 * 31 //30 days
                            if ((today <= date) && (today >= start_date)) {
                                result.push(entrainements[i])
                            }
                        };
                        res.send(JSON.stringify(result))
                    } else res.send(err);
                })
            } else {
                entrainements_col.find().toArray(function(err, entrainements) {
                    if (!err) res.send(JSON.stringify(entrainements))
                    else res.send(err);
                })
            }
        })
    }).get('/entrainements/:id', function(req, res) {
        db.collection("entrainements", function(err, entrainements_col) {
            if (err) {
                res.send(err);
            } else {
                entrainements_col.find({
                    id: req.params.id
                }).toArray(function(err, evt) {
                    if (!err) res.send(JSON.stringify(evt))
                    else res.send(err);
                })
            }
        })
    }).post('/entrainements', function(req, res) {
        db.collection("entrainements", function(err, entrainements_col) {
            if (err) {
                res.send(err);
            }

            auth.isAuthenticated(req.body.token, function(err) {
                res.sendStatus(403);
            }, function(ok) {
                var mongoID = new ObjectID(req.body._id);
                entrainements_col.findOne({
                    "_id": mongoID
                }, function(err, fevt) {
                    if (err) res.send(err);
                    if (fevt) {
                        entrainements_col.findOneAndReplace({
                            "_id": mongoID
                        }, {
                            "titre": req.body.titre,
                            "date": req.body.date,
                            "lieux": req.body.lieux,
                            "visible": req.body.visible,
                            "class": req.body.class
                        }, function(err, evt) {
                            if (!err) res.send(evt)
                            else res.send(err);
                        })
                    } else {
                        entrainements_col.insert({
                            "titre": req.body.titre,
                            "date": req.body.date,
                            "lieux": req.body.lieux,
                            "visible": req.body.visible,
                            "class": req.body.class
                        }, function(err, evt) {
                            if (!err) res.send(req.body)
                            else res.send(err);
                        })
                    }
                })
            })
        })
    }).delete('/entrainements', function(req, res) {
        db.collection("entrainements", function(err, entrainements_col) {
            if (err) {
                res.send(err);
            }

            //Password
            auth.isAuthenticated(req.query.token, function(err) {
                res.sendStatus(403);
            }, function(ok) {
                entrainements_col.findAndRemove({
                    "_id": new ObjectID(req.query._id)
                }, [
                    ['_id', 1]
                ], function(err, evt) {
                    if (!err) {
                        res.send({})
                    } else res.send(err);
                })
            });


        })
    })
}

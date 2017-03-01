var auth = require('../auth');

module.exports.init = function(ws, db, ObjectID) {
    ws.get('/events', function(req, res) {
        db.collection("events", function(err, events_col) {
            if (err) res.send(err);
            else if (('from' in req.query) && ('to' in req.query)) { //This route is for Calendar
                var req_from = parseInt(req.query.from)
                var req_to = parseInt(req.query.to)
                var results = {}
                results.success = 1
                results.result = []
                    //console.log("from: "+from+" to: "+to)
                    //start end
                events_col.find()
                    .toArray(function(err, events) {
                        if (!err) {
                            for (var i = events.length - 1; i >= 0; i--) {
                                var event_date = new Date(events[i].date)
                                var day = event_date.getDate()
                                var month = event_date.getMonth() + 1
                                events[i].start = event_date.getTime()
                                events[i].end = event_date.getTime()
                                events[i].title = day + " / " + month + " , " + events[i].titre + " , " + events[i].lieux
                            };
                            results.result = events
                            res.send(JSON.stringify(results))
                        } else res.send(err);
                    })
            } else if ('visible' in req.query) { //This route gets only event with visible
                //console.log("inscription")
                events_col.find({
                    'visible': true
                }).toArray(function(err, events) {
                    if (!err) {
                        res.send(JSON.stringify(events))
                    } else res.send(err);
                })
            } else {
                events_col.find().toArray(function(err, events) {
                    if (!err) res.send(JSON.stringify(events))
                    else res.send(err);
                })
            }
        })
    }).get('/events/:id', function(req, res) {
        db.collection("events", function(err, events_col) {
            if (err) {
                res.send(err);
            } else {
                events_col.find({
                    id: req.params.id
                }).toArray(function(err, evt) {
                    if (!err) res.send(JSON.stringify(evt))
                    else res.send(err);
                })
            }
        })
    }).post('/events', function(req, res) {
        db.collection("events", function(err, events_col) {
            if (err) {
                res.send(err);
            }

            auth.isAuthenticated(req.body.token, function(err) {
                res.sendStatus(403);
            }, function(ok) {
                var mongoID = new ObjectID(req.body._id);
                events_col.findOne({
                    "_id": mongoID
                }, function(err, fevt) {
                    if (err) res.send(err);
                    if (fevt) {
                        events_col.findOneAndReplace({
                            "_id": mongoID
                        }, {
                            "titre": req.body.titre,
                            "date": req.body.date,
                            "lieux": req.body.lieux,
                            "description": req.body.description,
                            "visible": req.body.visible,
                            "url": req.body.url,
                            "class": req.body.class
                        }, function(err, evt) {
                            if (!err) res.send(evt)
                            else res.send(err);
                        })
                    } else {
                        events_col.insert({
                            "titre": req.body.titre,
                            "date": req.body.date,
                            "lieux": req.body.lieux,
                            "description": req.body.description,
                            "visible": req.body.visible,
                            "url": req.body.url,
                            "class": req.body.class
                        }, function(err, evt) {
                            if (!err) res.send(req.body)
                            else res.send(err);
                        })
                    }
                })
            })
        })
    }).delete('/events', function(req, res) {
        db.collection("events", function(err, events_col) {
            if (err) {
                res.send(err);
            }

            //Password
            auth.isAuthenticated(req.query.token, function(err) {
                res.sendStatus(403);
            }, function(ok) {
                events_col.findAndRemove({
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

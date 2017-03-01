module.exports.init = function(ws, db, ObjectID) {
    ws.get('/inscriptions', function(req, res) {
        db.collection("inscriptions", function(err, inscriptions_col) {
            if (err) {
                res.send(err);
            }

            if ('entrainement_id' in req.query) { //This route return inscription for an entrainement
                inscriptions_col.find({
                    entrainement_id: req.query.entrainement_id
                }).toArray(function(err, inscriptions) {
                    if (!err) res.send(JSON.stringify(inscriptions))
                    else res.send(err);
                })
            } else {
                inscriptions_col.find().toArray(function(err, inscriptions) {
                    if (!err) {
                        res.send(JSON.stringify(inscriptions))
                    } else res.send(err);
                })
            }
        })
    }).post('/inscriptions', function(req, res) {
        db.collection("inscriptions", function(err, inscriptions_col) {
            if (err) {
                res.send(err);
            }

            //TODO Login Password
            var req_entrainement_id = req.body.entrainement_id
            var req_nom = req.body.nom
            var req_prenom = req.body.prenom

            inscriptions_col.find({
                entrainement_id: req_entrainement_id,
                nom: req_nom,
                prenom: req_prenom,
            }).toArray(
                function(err, existing) {
                    if (!err) {
                        if (existing.length === 0) {
                            inscriptions_col.insert(req.body, function(err, evt) {
                                if (!err) res.send({
                                        result: 1
                                    }) //OK
                                else res.send(err); //KO
                            })
                        } else {
                            res.send({
                                result: 2
                            }); //already in base
                        }
                    } else {
                        res.send(err);
                    }
                }
            )
        })
    })
}

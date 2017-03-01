var jwt = require("jsonwebtoken");
var db;
var SECRET = 'blablabla'; //this has to be improved :)

module.exports.init = function(dataBase) {
    db = dataBase;
}

module.exports.login = function(credentials, ferr, fsuccess) {
    if (!credentials.username || !credentials.password) {
        ferr('il faut saisir un login/password !');
    }
    if (db) {
        db.collection('credentials', function(err1, credentials_col) {
            if (err1) {
                ferr('Erreur de connexion avec la BD' + err1);
            }
            else {
                credentials_col.findOne(credentials, function(err2, user) {
                    if (err2) {
                        ferr('Erreur de recherche pour le credential' + err2);
                    } else {
                        if (user) {
                            var token = jwt.sign(credentials, SECRET, {
                                expiresIn: "2h"
                            });
                            fsuccess(token);
                        } else ferr('Erreur de login/password');
                    }

                });
            }
        });
    } else {
        ferr('Pas de connexion avec la BD');
    }
}

module.exports.signin = function(credentials, ferr, fsuccess) {
    if (!credentials.username || !credentials.password) {
        ferr('il faut saisir un login/password !');
    }
    if (db) {
        db.collection('credentials', function(err, credentials_col) {
            credentials_col.findOne(credentials, function(err1, user) {
                if (err1) {
                    ferr('Erreur de connexion avec la base de données: ' + err);
                } else {
                    if (user) {
                        ferr('Ce login/password existe déjà');
                    } else {
                        credentials_col.insertOne(credentials, function(err2, nusers) {
                            if (err2) ferr('Erreur avec la base de données, insertion impossible!');
                            else fsuccess(credentials)
                        });
                    }
                }
            });
        });
    } else ferr('Pas de connexion avec la BD');
}

module.exports.isAuthenticated = function(token , ferr, fsuccess) {
    jwt.verify(token, SECRET, function(err, decoded) {
        if (err) return ferr('Token non valide');
        else fsuccess('Token valide');
    });
}

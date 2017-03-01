var fs = require('fs-extra');


module.exports.copy = function() {
    fs.copy('node_modules/jquery/dist/jquery.min.js', 'webApp/js/jquery.min.js', function(err) {
        if (err) return console.error(err);

        console.log("jquery.min.js copy success!")
    }); //copies file 

    fs.copy('node_modules/jquery/dist/jquery.min.map', 'webApp/js/jquery.min.map', function(err) {
        if (err) return console.error(err);

        console.log("jquery.min.map copy success!")
    }); //copies file 

    fs.copy('node_modules/lightbox2/dist/js/lightbox.min.js', 'webApp/js/lightbox.min.js', function(err) {
        if (err) return console.error(err);

        console.log("lightbox.min.js copy success!")
    }); //copies file 

    fs.copy('node_modules/lightbox2/dist/js/lightbox.js', 'webApp/js/lightbox.js', function(err) {
        if (err) return console.error(err);

        console.log("lightbox.js copy success!")
    }); //copies file 

    fs.copy('node_modules/lightbox2/dist/js/lightbox.min.map', 'webApp/js/lightbox.min.map', function(err) {
        if (err) return console.error(err);

        console.log("lightbox.min.map copy success!")
    }); //copies file 

    fs.copy('node_modules/underscore/underscore-min.js', 'webApp/js/underscore-min.js', function(err) {
        if (err) return console.error(err);

        console.log("underscore-min.js copy success!")
    }); //copies file 

    fs.copy('node_modules/underscore/underscore.js', 'webApp/js/underscore.js', function(err) {
        if (err) return console.error(err);

        console.log("underscore.js copy success!")
    }); //copies file 

    fs.copy('node_modules/underscore/underscore-min.map', 'webApp/js/underscore-min.map', function(err) {
        if (err) return console.error(err);

        console.log("underscore-min.map copy success!")
    }); //copies file 

    fs.copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'webApp/js/bootstrap.min.js', function(err) {
        if (err) return console.error(err);

        console.log("bootstrap.js copy success!")
    }); //copies file 

    fs.copy('node_modules/bootstrap/dist/css/bootstrap.min.css', 'webApp/css/bootstrap.min.css', function(err) {
        if (err) return console.error(err);

        console.log("bootstrap.min.css copy success!")
    }); //copies file 

    fs.copy('node_modules/bootstrap-calendar/js/calendar.min.js', 'webApp/js/calendar.min.js', function(err) {
        if (err) return console.error(err);

        console.log("calendar.min.js copy success!")
    }); //copies file 

    fs.copy('node_modules/bootstrap-calendar/css/calendar.min.css', 'webApp/css/calendar.min.css', function(err) {
        if (err) return console.error(err);

        console.log("calendar.min.css copy success!")
    }); //copies file 

    fs.copy('node_modules/angular/angular.min.js', 'webApp/js/angular.min.js', function(err) {
        if (err) return console.error(err);

        console.log("angular.js copy success!")
    }); //copies file 

    fs.copy('node_modules/angular-route/angular-route.min.js', 'webApp/js/angular-route.min.js', function(err) {
        if (err) return console.error(err);

        console.log("angular-route.min.js copy success!")
    }); //copies file 

    fs.copy('node_modules/angular-resource/angular-resource.min.js', 'webApp/js/angular-resource.min.js', function(err) {
        if (err) return console.error(err);

        console.log("angular-resource.min.js copy success!")
    }); //copies file 


};

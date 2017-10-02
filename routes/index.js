var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');


router.get('/', function(req, res) {
    var url = 'https://seeclickfix.com/api/v2/issues?place_url=can_vancouver&per_page=10&page=1'


    request(url, function(err, response, body) {
        if (err) {
            console.error(err);
        }
        var city = "vancouver";
        var id = 1;
        var list = JSON.parse(body).issues;
        var metadata = JSON.parse(body).metadata;
        var per_page = metadata.pagination.per_page;
        var pages = metadata.pagination.pages;
        var lat = _.pluck(list, 'lat');
        var lng = _.pluck(list, 'lng');
        var summary = _.pluck(list, 'summary');
        var address = _.pluck(list, 'address');
        var start = 0;
        var next_page = 2;
        console.log('This is how many pages ', pages);
        if (id <= pages) {
            start = per_page * (id - 1);

        }
        if (id < pages) {
            next_page = (Number(id) + 1);
        }

        var title = city;
        var issues = pages * per_page;
        res.render('index', {
            title: title,
            list: list,
            lat: lat,
            lng: lng,
            summary: summary,
            per_page: per_page,
            pages: pages,
            start: start,
            city: city,
            next_page: next_page,
            address: address,
            issues: issues
        });
    });
});

router.get('/:city', function(req, res) {
    var city = req.params.city;

    if (city == 'hampton') {
        res.redirect('/');
    } else {
        res.redirect('/' + city + '/1');
    }
});

router.get('/:city/:id', function(req, res) {
    var city = req.params.city;
    var id = req.params.id;
    if (city == 'hampton') {
        res.redirect('/');
    }
    var url = "https://seeclickfix.com/api/v2/issues?place_url=can_vancouver&&per_page=10&page=" + id;

    request(url, function(err, response, body) {
        if (err) {
            console.error(err);
        }
        var list = JSON.parse(body).issues;
        var metadata = JSON.parse(body).metadata;
        var per_page = metadata.pagination.per_page;
        var pages = metadata.pagination.pages;
        var lat = _.pluck(list, 'lat');
        var lng = _.pluck(list, 'lng');
        var summary = _.pluck(list, 'summary');
        var address = _.pluck(list, 'address');
        var start = 0;
        var next_page = 2;
        console.log('This is how many pages ', pages);
        if (id <= pages) {
            start = per_page * (id - 1);

        }
        if (id < pages) {
            next_page = (Number(id) + 1);
        }

        var issues = pages * per_page;



        res.render('index', {
            title: 'Vancouver',
            list: list,
            lat: lat,
            lng: lng,
            summary: summary,
            per_page: per_page,
            pages: pages,
            start: start,
            city: city,
            next_page: next_page,
            address: address,
            issues: issues
        });
    });
});


module.exports = router;
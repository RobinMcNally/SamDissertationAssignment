var extractor = require('unfluff');
var request = require('request');
var jsdom = require('jsdom');
var http = require('http');
var fs = require('fs');
var google = require('google');
var async = require('async');

google.resultsPerPage = 25;
var nextCounter = 0;
var sources = [];
var sourceData = [];

function requests(i) {
    if (i < sources.length) {
        request(sources[i], function (error, response, body) {
            if (!error && response.statusCode == 200) {
                data = extractor(body);
                sourceData[i] = (data.title, data.author, data.date, sources[i], data.text);
                console.log(sourceData);
            }
        })
        console.log(sources[i])
        requests(i+1);
    }
}

google("new net neutrality news", function(err, res) {
    if (err) console.error(err)
    async.series([
        function(callback) {
            for (var i = 0; i < res.links.length; ++i) {
                var link = res.links[i];
                sources[sources.length] = link.href;
            }
            console.log(sources);
            callback(null, "");
        },
        function(callback) {
            requests(0);
            callback(null, "");
        },
        function(callback) {
            console.log(sourceData);
        }
    ]);
});

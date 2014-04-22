var http = require('http');
var url = require('url');
var cp = require('child_process');
var util = require('util');
var fs = require('fs');
var path = require('path');
var stats = {};
var web;

function start() {
    web = cp.spawn(path.join('bin','web'),[]);
    web.stdout.on('data', function(data) {
        //data is a buffer of {id},{car count}\r\n
        //separated by -\r\n
        var str = data.toString();
        if (str === "-\r\n") {
            return;
        }
        var s = str.split(',');
        if (!stats[s[0]]) stats[s[0]] = {};
        stats[s[0]].count = parseInt(s[1],10);
        stats[s[0]].lastupdated = new Date().getTime();
    });
    web.on('exit', function(code) {
        console.log('restarting web');
        start();
    });
    web.stdin.end();
}

var server = http.createServer(function(req,res) {
    var uri = url.parse(req.url,true);
    if (uri.pathname === '/favicon.ico') {
        res.setHeader("Content-Type", "image/x-icon");        
        fs.createReadStream(path.join('static', 'favicon.ico')).pipe(res);
    } else if (uri.pathname === '/endpoint') {
        res.setHeader("Content-Type", "application/x-javascript");        
        res.end(uri.query.callback + '(' + util.inspect(stats) + ')');
    } else if (uri.pathname.substring(1).indexOf('static') > -1) {
        path.exists(uri.pathname.substring(1), function(ex) {
            if (ex) {
                fs.createReadStream(uri.pathname.substring(1)).pipe(res);
            } else {
                res.end();
            }
        });
    } else if (uri.pathname == '/') {
        res.setHeader('Content-Type', "text/html");
        fs.createReadStream('index.html').pipe(res);
    } else {
        res.end('NOT FOUND');
    }
});

server.listen(8080);
start();

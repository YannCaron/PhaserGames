var http = require('http');
var fs = require('fs');

const imgFolder = 'assets/img/PlanetCute';

function appendFileRecursive(content, path) {

    fs.readdirSync(path).forEach(function (file) {
        var f = path + '/' + file;
        var stats = fs.statSync(f);
        if (stats.isDirectory()) {
            appendFileRecursive(content, f);
        } else {
            var name = f.replace(/\//g, '-')
                .replace(/ /g, '-')
                .replace(/_/g, '-')
                .replace(/\.[^/.]+$/, '');
            content.push('gameImgs[\'' + name + '\'] = \'' + f + '\';');
        }

    });

}

function createGameImages(res) {
    var content = ['var gameImgs = {};'];
    appendFileRecursive(content, imgFolder);

    fs.writeFile('resources.js', content.join('\n'), function (err) {
        if (err) throw err;
        console.log('Resources created [' + content.length + ']\n');
    }); 

}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Starting generation.<br>')

    createGameImages(res);

    res.end('Generation terminated.<br>');

}).listen(8080); 
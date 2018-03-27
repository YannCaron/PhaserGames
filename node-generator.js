var http = require('http');
var fs = require('fs');

const imgFolder = 'assets/img';

var ressourceContent;

function appendFileRecursive(path) {

    fs.readdir(path, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            var f = path + '/' + file;
            
            fs.stat(f, function (err, stats) {
                if (stats.isDirectory()) {
                    appendFileRecursive(f);
                } else {
                    var name = f.replace(/\//g, '-').replace(/\.[^/.]+$/, '');
                    ressourceContent += 'gameImgs[\'' + name + '\'] = \'' + f + '\';\n';
                }
            });
        });
    })

}

function createGameImages(res) {
    ressourceContent = 'var gameImgs = {};';
    appendFileRecursive(imgFolder);

    fs.writeFile('ressources.js', ressourceContent, function (err) {
        if (err) throw err;
        console.log('Ressources created.');
    }); 

}

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Starting generation.<br>')

    createGameImages(res);

    res.end('Generation terminated.<br>');

}).listen(8080); 
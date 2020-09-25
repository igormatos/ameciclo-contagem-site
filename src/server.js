const express = require("express");
const path = require('path')
const port = 8080;

const app = express(),
    DIST_DIR = __dirname;

app.use(express.static(DIST_DIR))


var sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/css'),
  debug: true,
  indentedSyntax: true,
  outputStyle: 'compressed',
  prefix: '/sass'
}));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.get('/contagem', function (req, res) {
    res.sendFile(path.join(__dirname + 'public/contagem.html'));
});


const PORT = process.env.PORT || port

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})

// var connect = require('connect');
// var sass = require('node-sass');

// var srcPath = __dirname + '/styles';
// var destPath = __dirname + '/public/css';
//var sass = require('node-sass-middleware');

// var server = connect.createServer(
//     sass.middleware({
//         src: srcPath,
//         dest: destPath,
//         debug: true,
//         outputStyle: 'expanded',
//         prefix: '/styles'
//     }),
//     connect.static(__dirname + '/public/css')
// );

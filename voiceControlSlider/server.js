// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// http.createServer((request, response) => {
//     let filePath = '.' + request.url;

//     if (filePath == './') {
//         filePath = './index.html';
//     }

//     let extname = String(path.extname(filePath)).toLowerCase();

//     const mimeTypes = {
//         '.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         '.png': 'image/png'
//     };

//     let contentType = mimeTypes[extname];

//     fs.readFile(decodeURIComponent(filePath), (error, content) => {
//         if (error) {
//             response.statusCode = 404
//             response.end('not found')
//         } else {
//             response.writeHead(200, {
//                 'Content-Type': contentType
//             });
//             response.end(content, 'utf-8');
//         }
//     });
// }).listen(8125);

const express = require('express')
const app = express()

app.use((req, res) => res.sendFile(__dirname + decodeURIComponent(req.url)))

app.listen(8125)
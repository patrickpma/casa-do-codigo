const app = require('./src/config/custom-express');

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});

// const http = require('http');

// const server = http.createServer(function (req, res) {
//     if (req.url == '/')
//         res.end("Casa do Codigo");
//     else if ((req.url == '/livros'))
//         res.end("Listagem de Livros");
// });
// server.listen(3000);
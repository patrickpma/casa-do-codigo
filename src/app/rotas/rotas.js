const db = require('../../config/database');
const LivroDao = require('../infra/livros-dao');

module.exports = (app) => {
    app.get('/', function (req, res) {
        res.send("Casa do Código");
    });

    app.get('/livros', function (req, resp) {
        const livroDao = new LivroDao(db);

        //implementação usando Promisse 
        livroDao.lista().then(livros => resp.marko(require('../views/livros/lista/lista.marko'), {
            livros: livros
        })).catch(erro => console.log(erro));

        // livroDao.lista((erro, resultados) => {
        //     resp.marko(require('../views/livros/lista/lista.marko'), {
        //         livros: resultados
        //     });
        // });
    });

    app.get('/livros/form', function (req, resp) {
        resp.marko(require('../views/livros/form/form.marko'),{livro: {}});
    });

    app.get('/livros/form/:id', function (req, resp) {
        const { id } = req.params;
        const livroDao = new LivroDao(db);
        livroDao.buscaPorId(id).then(livro => resp.marko(require('../views/livros/form/form.marko'), { livro }))
            .catch(erro => console.log(erro))
    });

    app.get('/livros/:id', function (req, resp) {
        const { id } = req.params;
        const livroDao = new LivroDao(db);
        livroDao.buscaPorId(id).then(livro => { resp.send(livro) }).catch(erro => console.log(erro));
    });

    app.post('/livros', function (req, resp) {
        console.log(req.body);

        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body).then(resp.redirect('/livros')).catch(erro => console.log(erro));
    });

    app.put('/livros/', function (req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body).then(resp.redirect('/livros')).catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function (req, resp) {
        const { id } = req.params;
        const livroDao = new LivroDao(db);
        livroDao.remove(id).then(() => resp.status(200).end()).catch(erro => console.log(erro));
    });


}


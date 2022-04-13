const { check } = require('express-validator/check');

const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();

const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

module.exports = (app) => {
    
    app.get('/',baseControlador.home());

    app.get('/livros', livroControlador.lista());

    app.get('/livros/form', livroControlador.formularioCadastro());

     app.get('/livros/form/:id', livroControlador.formularioEdicao());

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage('O titulo precisa ter no minimo 5 caracteres.'),
        check('preco').isCurrency().withMessage('O preco precisa ter um valor monetario valido')
    ], livroControlador.cadastra());

    app.put('/livros/', livroControlador.edita());

    app.delete('/livros/:id', livroControlador.remove());


}


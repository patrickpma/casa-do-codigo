class LivroDao {


    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros! ' + erro);

                    return resolve(resultados);
                }
            )

        });
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO LIVROS (
                        titulo,
                        preco,
                        descricao
                    ) values (?, ?, ?)
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }

                    resolve();
                }
            )
        });
    }

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get('select * from livros where id = ?',[id], (erro, resultado) => {
                if (erro) return reject('Não foi possível listar os livros! ' + erro);
                return resolve(resultado);
            })

        });

    }

    atualiza(livro,id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE LIVROS SET
                        titulo = ?,
                        preco = ?,
                        descricao = ?
                    WHERE id = ?
                `,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível atualizar o livro!');
                    }

                    resolve();
                }
            )
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ?`,
                [
                    id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível deletar o livro!' + err);
                    }

                    resolve();
                }
            )
        });
    }
}

module.exports = LivroDao;
const fs = require('fs');
const path = require('path');
const livros = require('../data/livros.json');
const ordenarLivros = require('../utils/ordenarLivros');
const Fuse = require('fuse.js');

let listaLivros = [...livros];

const listarLivros = (req, res) => {
  const ordenados = ordenarLivros(listaLivros);
  res.json(ordenados);
};

const adicionarLivro = (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Título e autor são obrigatórios.' });
  }

  const novoLivro = { titulo, autor };
  listaLivros.push(novoLivro);

  const caminhoArquivo = path.join(__dirname, '../data/livros.json');

  fs.writeFile(caminhoArquivo, JSON.stringify(listaLivros, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Erro ao salvar livro no arquivo:', err);
      return res.status(500).json({ erro: 'Erro ao salvar livro.' });
    }

    res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!!!' });
  });
};

const buscarLivro = (req, res) => {
  const termo = req.query.titulo;
  if (!termo) {
    return res.status(400).json({ erro: 'Parâmetro "titulo" é obrigatório.' });
  }

  const fuse = new Fuse(listaLivros, {
    keys: ['titulo'],
    threshold: 0.4
  });

  const resultados = fuse.search(termo).map(result => result.item);

  if (resultados.length === 0) {
    return res.status(404).json({ mensagem: 'Nenhum livro encontrado.' });
  }

  res.json(resultados);
};

const deletarLivro = (req, res) => {
  console.log('deletarLivro chamado com título:', req.params.titulo);

  const titulo = req.params.titulo;

  const index = listaLivros.findIndex(livro =>
    livro.titulo.toLowerCase() === titulo.toLowerCase()
  );

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado.' });
  }

  listaLivros.splice(index, 1);

  const caminhoArquivo = path.join(__dirname, '../data/livros.json');
  fs.writeFile(caminhoArquivo, JSON.stringify(listaLivros, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Erro ao deletar livro do arquivo:', err);
      return res.status(500).json({ erro: 'Erro ao deletar livro.' });
    }

    res.json({ mensagem: 'Livro deletado com sucesso.' });
  });
};

module.exports = {
  listarLivros,
  adicionarLivro,
  buscarLivro,
  deletarLivro
};

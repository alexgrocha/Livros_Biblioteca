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
  listaLivros.push({ titulo, autor });
  res.status(201).json({ mensagem: 'Livro adicionado com sucesso.' });
};

const buscarLivro = (req, res) => {
  const termo = req.query.titulo;
  if (!termo) {
    return res.status(400).json({ erro: 'Parâmetro "titulo" é obrigatório.' });
  }

  const fuse = new Fuse(listaLivros, {
    keys: ['titulo'],
    threshold: 0.4 // quanto menor, mais preciso
  });

  const resultados = fuse.search(termo).map(result => result.item);

  if (resultados.length === 0) {
    return res.status(404).json({ mensagem: 'Nenhum livro encontrado.' });
  }

  res.json(resultados);
};

module.exports = { listarLivros, adicionarLivro, buscarLivro };

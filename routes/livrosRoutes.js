const express = require('express');
const router = express.Router();
const {
  listarLivros,
  adicionarLivro,
  buscarLivro,
  deletarLivro
} = require('../controllers/livrosController');

router.get('/livros', listarLivros);
router.post('/livros', adicionarLivro);
router.get('/livros/buscar', buscarLivro);
router.delete('/livros/:titulo', deletarLivro); 

module.exports = router;

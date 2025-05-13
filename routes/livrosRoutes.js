const express = require('express');
const router = express.Router();
const { listarLivros, adicionarLivro, buscarLivro } = require('../controllers/livrosController');

router.get('/livros', listarLivros);
router.post('/livros', adicionarLivro);
router.get('/livros/buscar', buscarLivro);

module.exports = router;

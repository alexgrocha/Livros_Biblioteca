function ordenarLivros(livros) {
  return livros.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
}

module.exports = ordenarLivros;

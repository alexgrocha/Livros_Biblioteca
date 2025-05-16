API - Biblioteca de Livros Perdidos

API criada para auxiliar na organização e pesquisa de livros da biblioteca. Ela permite:

- Listar livros ordenados por título
- Adicionar novos livros
- Buscar livros por título, incluindo busca por aproximação (ex: "Senho" retorna "O Senhor dos Anéis")

---

## Como executar localmente

### Pré-requisitos

- Node.js instalado
- VSCode
- Postman

---

### Instalar dependências

```bash
npm install
npm install cors
```

---

### Rodar a API

```bash
node index.js
```

---

## Endpoints da API

Base URL: `http://localhost:3000/api`

---

### Coleção Postman

Você pode testar todos os endpoints utilizando a coleção do Postman incluída neste projeto.

**Como usar:**

1. Abra o Postman.
2. Vá em **File > Import** ou clique no botão **Import** no menu superior.
3. Importe o arquivo `Desafio-Biblioteca.postman_collection.json`.
4. Execute os endpoints conforme desejar.

### `GET /livros`

Retorna todos os livros ordenados alfabeticamente por título.

**Exemplo de resposta:**

```json
[
  {
    "titulo": "A Culpa é das Estrelas",
    "autor": "John Green"
  },
  ...
]
```

---

### `POST /livros`

Adiciona um novo livro à lista.

**Body (JSON):**

```json
{
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien"
}
```

**Resposta:**

```json
{
  "mensagem": "Livro adicionado com sucesso."
}
```

---

### `GET /livros/buscar?titulo=senho`

Busca por parte do título dos livros (fuzzy search com Fuse.js).

**Exemplo de URL:**

```sh
GET /livros/buscar?titulo=senho
```

**Resposta:**

```json
[
  {
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien"
  }
]
```

---

## Sobre o funcionamento interno

### Algoritmo de ordenação

Os livros são ordenados com o método `localeCompare` nativo do JavaScript.

```js
livros.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
```

### Busca por aproximação

Usamos a biblioteca [`fuse.js`](https://fusejs.io/) para implementar fuzzy search. Isso permite que a API retorne títulos mesmo com erros de digitação ou buscas parciais.

---

## Bônus implementados

- [x] Busca por aproximação com Fuse.js
- [ ] Interface gráfica (opcional)

---

## Desenvolvido por

> Alex Rocha

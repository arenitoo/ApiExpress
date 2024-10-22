# API Express - Produtos e Categorias

Este projeto é uma API simples construída com Node.js, Express e Sequelize, que permite gerenciar **produtos** e **categorias**. A API permite criar, listar, atualizar e excluir categorias e produtos, oferecendo endpoints RESTful.

## Descrição

A API foi desenvolvida para demonstrar a criação de endpoints para um sistema básico de gerenciamento de categorias e produtos. Cada categoria pode conter vários produtos, e os produtos têm informações como nome, quantidade, preço e validade. O projeto usa **Sequelize** como ORM para interagir com o banco de dados relacional e **Express** para a construção dos endpoints. 

## Funcionalidades

- CRUD de Categorias
- CRUD de Produtos
- Relação entre Produtos e Categorias

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **Express.js**: Framework web minimalista para construção de APIs.
- **Sequelize**: ORM para mapeamento objeto-relacional.
- **PostgreSQL** (ou outro banco relacional): Banco de dados para persistência dos dados.
- **Yarn** ou **npm**: Gerenciador de pacotes para dependências.

---

## Requisitos

Para rodar o projeto localmente, você precisará de:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Yarn](https://yarnpkg.com/) (ou npm)
- Banco de dados PostgreSQL ou MySQL configurado
- [Postman](https://www.postman.com/) (opcional, para testar os endpoints)

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
### 1. Instale as dependências
```
yarn install
```
### 3. Configure as variáveis de ambiente
```
DB_USERNAME=seu-usuario
DB_PASSWORD=sua-senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome-do-banco

PORT=3000
```
### 4. Configure o banco de dados

### 5. Inicie o servidor
```
yarn start
```
### Este projeto foi desenvolvido utilizando o seguinte tutorial **(https://dev.to/luigimorel/building-an-api-using-expressjs-postgres-sequelize-cli-and-jest-for-unit-testing-part-1-2d89)** para a matéria de PW2 ministrada pelo professor Paulo Henrique. 

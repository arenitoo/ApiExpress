# API Express - Produtos e Categorias
Este projeto é uma API simples construída com Node.js, Express e Sequelize, que permite gerenciar produtos e categorias. A API permite criar, listar, atualizar e excluir categorias e produtos, oferecendo endpoints RESTful.

Descrição
A API foi desenvolvida para demonstrar a criação de endpoints para um sistema básico de gerenciamento de categorias e produtos. Cada categoria pode conter vários produtos, e os produtos têm informações como nome, quantidade, preço e validade. O projeto usa Sequelize como ORM para interagir com o banco de dados relacional e Express para a construção dos endpoints.

Funcionalidades
CRUD de Categorias
CRUD de Produtos
Relação entre Produtos e Categorias
Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript para o back-end.
Express.js: Framework web minimalista para construção de APIs.
Sequelize: ORM para mapeamento objeto-relacional.
PostgreSQL (ou outro banco relacional): Banco de dados para persistência dos dados.
Yarn ou npm: Gerenciador de pacotes para dependências.
Requisitos
Para rodar o projeto localmente, você precisará de:

Node.js (versão 14 ou superior)
Yarn (ou npm)
Banco de dados PostgreSQL ou MySQL configurado
Postman (opcional, para testar os endpoints)
Como rodar o projeto
1. Clone o repositório
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
2. Instale as dependências
bash
Copiar código
yarn install
ou, se preferir usar npm:

bash
Copiar código
npm install
3. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto e adicione suas credenciais do banco de dados e outras variáveis de ambiente necessárias:

bash
Copiar código
DB_USERNAME=seu-usuario
DB_PASSWORD=sua-senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome-do-banco

PORT=3000
4. Configure o banco de dados
Certifique-se de que o banco de dados PostgreSQL (ou o banco que você estiver utilizando) está rodando. Execute as migrações do Sequelize para criar as tabelas:

bash
Copiar código
npx sequelize-cli db:migrate
5. Inicie o servidor
bash
Copiar código
yarn start
ou, se preferir usar npm:

bash
Copiar código
npm start
A API estará disponível em http://localhost:3000.

Testando a API
Você pode usar o Postman ou Insomnia para testar os endpoints. Alguns exemplos de rotas disponíveis:

Categorias:

GET /v1/categories: Lista todas as categorias.
POST /v1/categories: Cria uma nova categoria.
GET /v1/categories/:id: Retorna uma categoria específica.
PUT /v1/categories/:id: Atualiza uma categoria.
DELETE /v1/categories/:id: Remove uma categoria.
Produtos:

GET /v1/products: Lista todos os produtos.
POST /v1/products: Cria um novo produto.
GET /v1/products/:id: Retorna um produto específico.
PUT /v1/products/:id: Atualiza um produto.
DELETE /v1/products/:id: Remove um produto.

Como contribuir
Faça um fork do projeto.
Crie uma nova branch: git checkout -b minha-nova-feature.
Faça suas alterações e confirme: git commit -m 'Minha nova feature'.
Envie para o repositório remoto: git push origin minha-nova-feature.
Crie um Pull Request.

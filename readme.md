[![codecov](https://codecov.io/gh/fdiogoc/creative-code-node-ts-typeorm/branch/main/graph/badge.svg?token=4537I8P7KR)](https://codecov.io/gh/fdiogoc/creative-code-node-ts-typeorm)

# Nodejs + Typescript (CRUD + Auth session)

API:

- POST /auth/register
- POST /auth/login
  -POST /auth/logout

- GET /users
- GET /users/:id
- POST /users

Somentete autenticado:

- GET /address
- GET /address/:id
- GET /address/byCEP/:id
- POST /address

DEV

- docker compose up
- npm run watch
- npn run dev

Models:
• ~~Usuário o Nome o Telefone o Email – Com validação o Idade o Peso o Etinia (ENUM)~~

• ~~Endereços o Endereço o Numero o Complemento o CEP o Cidade o Estado~~

Serviços:
~~• Crud User~~ Falta update/delete

~~• Crud Endereços~~Falta update/delete

~~• Sessão~~
Requisitos:
• JWT
~~• Postgree~~
~~• Testes~~

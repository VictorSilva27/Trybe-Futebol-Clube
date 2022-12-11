# Projeto Trybe Futebol Clube (TFC)

<!-- Escrita Sobre o Projeto -->
<details>
  <summary><strong>Sobre o Projeto ⚡</strong></summary>
  
  * Utilizando Squelize com TypeScript, consegui realizar rotas de uma forma mais eficaz e tranquila, realizei o maximo de cobertura de testes `E2E` que consegui fazer, utilizando o `Chai`, `Mocha` e `Sinon`.

</details>

<details>
<summary><strong>Configuração Docker 🐳</strong></summary><br />

  #### Atualizando/Instalando Docker
  ⚠ O seu docker-compose precisa estar na versão 1.29 ou superior.  ⚠
[Veja aqui a documentação para atualizar o docker-compose.](https://docs.docker.com/compose/install/)
</details>


<details>
  <summary><strong>Como iniciar o projeto na sua máquina 💻</strong></summary>
  Primeiro clone o Projeto no seu repositório local.
  
  * `git clone git@github.com:VictorSilva27/Projeto-TFC.git`
  
  Agora entra no repositório local.
  
  * `cd Projeto-TFC` (Entrar no repositório clonado)
  
  > Caso você tenha Visual Studio Code, `code .`
  
  Instale todas as dependências da raiz do projeto.
  
  * `npm install`.
  
  Instale as dependências de tudo dentro da pasta app.
  
  * `npm run install:apps`.
  
  > Ou `npm run postinstall`.
  
  Suba os Dockerfiles das pastas Backend e FrontEnd com o comando:
  
  * `npm run compose:up`.

  Em seguida, rode o comando para ver os logs:
  
   * `npm run logs backend`.
  > Caso queira ver o logs de todos os serviços `npm run logs`.
  > Ou se queira ver os outros serviços individuais, basta trocar o `backend` por `frontend` ou `db`.
  
  * Quando aparecer uma mensagem escrita `Running on port 3001`, podemos ver nossas rotas. [Nessa seção](#rotas) temos as rotas.
  > A porta `3001` pode alterer de acordo com sua porta.
  
</details>

<details id='rotas'>
  <summary><strong>Rotas da API</strong></summary>
   Depois de ter feito o processo acima, podemos verificar nossas rotas. 
   
   > Recomendo utilizar a extensão do [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) no seu Vs Code.
   
   Segue esse rota para utilçizar tanto no seu navegador, como no Thunder Client também.
   
   * `http://localhost:3001/[Rota]`
   
  <details>
  <summary><strong> Rota Login </strong></summary>
  
  ### Login

- A rota utilizada deve ser (`/login`) com o tipo `post`;

- A rota deve receber os campos `email` e `password` e esses campos devem ser validados no banco de dados:
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.

- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "email": "user@user.com",
    "password": "secret_user"
  }
  ```
  
- Retorno dessa API deve ser algo parecido com:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
  }
  ```
  
 ### Login Validação
 Antes de enviar a rota, devemos configurar o Header da requisição

</details>
   
</details>

## 🔰Nota do projeto🔰
![Nota do Projeto TFC](TFC.png)

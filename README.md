# Projeto Trybe Futebol Clube (TFC)

<!-- Escrita Sobre o Projeto -->
<details>
  <summary><strong>Sobre o Projeto ⚡</strong></summary>
  
  * Utilizando Squelize com TypeScript, consegui realizar rotas de uma forma mais eficaz e tranquila, realizei o maximo de cobertura de testes `E2E` que consegui fazer, utilizando o `Chai`, `Mocha` e `Sinon`.

</details>

<details>
<summary><strong>Configuração Docker 🐳</strong></summary>

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
   
   Segue esse rota para utilizar tanto no seu navegador, como no Thunder Client também.
   
   * `http://localhost:3001/[Rota]`
   
<!-- Rotas -->
  <!-- Login -->
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

![Passo a Passo da rota](imgs/ValidateL.png)

  * 1º Vá ate a opção `Headers`.

  * 2º Crie um header chamado `Authorization`.

  * 3º Insira um token válido.
    > Pegue o token da resposta da rota `/login`.

  * 4º Coloque a rota `/login/validate` e envia.

  * 5º Veja o body da response.

</details>

  <!-- Teams -->
  <details>
  <summary><strong> Rota Teams </strong></summary>
  
  ### Teams
  - A rota utilizada deve ser (`/teams`) com o tipo `get`;

  - Resultado da requisição:
    ```json
    [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      ...
    ]
    ```
  
  ### Teams Id
  - A rota utilizada deve ser (`/teams/3`) com o tipo `get`;
    > No lugar do `3`, pode colocar até do 1 ao 16;

  - Resultado da requisição:
    ```json
    {
      "id": 3,
      "teamName": "Botafogo"
    }
    ```
  </details>
   
  <!-- Matches -->
  <details>
  <summary><strong> Rota Matches </strong></summary>
  
  ### Matches

- A rota utilizada deve ser (`/Matches`) com o tipo `get`;

- Resultado da requisição:
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    ...
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    }
  ]
  ```
  
 ### Matches InProgress
  Nessa Rota recebe, uma `query string` chamada inProgress, ela recebe `true` ou `false`.
  > True recebe as partidas em andamento, e False recebe as partidas finalizadas 

  - A rota utilizada deve ser (`/matches?inProgress=true`) com o tipo `get`;
    > No lugar do `true`, pode colocar `false`;

  - Resultado da requisição:
    ```json
    [
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeam": 6,
        "homeTeamGoals": 1,
        "awayTeam": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "Ferroviária"
        },
        "teamAway": {
          "teamName": "Avaí/Kindermann"
        }
      }
    ]
    ```

  ### Cadastrar Partida
  Nessa Rota recebe, uma body para cadastrar uma partida entre dois times diferentes. 

  - A rota utilizada deve ser (`/matches`) com o tipo `post`;

  - Corpo da requisição:
    ```json
    {
      "homeTeam": 16, // O valor deve ser o id do time
      "awayTeam": 8, // O valor deve ser o id do time
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    }
    ```
  > Lembre-se de estar sempre com o token validado

  - Resultado da requisição:
    ```json
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    }
    ```

  ### Finalizar Partida
  Podemos finalizar uma partida que esteja em andamento atráves do Id da partida.

  - A rota utilizada deve ser (`/matches/:id/finish`) com o tipo `patch`;
  > No `:id`, podemos substituir por 1 até o 41, caso você não tenha cadastrado mais nenhuma partida 

  - Resultado da requisição:
    ```json
    {
      "message": "Finished",
    }
    ```

  ### Atualizar Partida
  Podemos atualizar o resultado de uma partida que esteja em andamento atráves do Id da partida.

  - A rota utilizada deve ser (`/matches/:id`) com o tipo `patch`;
  > No `:id`, podemos substituir por 1 até o 41, caso você não tenha cadastrado mais nenhuma partida 

  - Corpo da requisição:
    ```json
    {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }
    ```

  - Resultado da requisição:
    ```json
    {
      "message": "Updated",
    }
    ```
  </details>

 <!-- Leaderboards -->
  <details>
  <summary><strong> Rota Leaderboards </strong></summary>
  Essas Rotas retornam a tabela dos times, Home retorna de todas as partidas que o time jogou em casa, Away retorna de todos que ele jogou fora de casa, e a Leaderboard retorna a tabela normal, com os jogos fora e dentro de casa
  
  ### Leaderboard Home
  - A rota utilizada deve ser (`/leaderboard/home`) com o tipo `get`;

  - Resultado da requisição:
    ```json
    [
      {
        "name": "Santos",
        "totalPoints": 9,
        "totalGames": 3,
        "totalVictories": 3,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 9,
        "goalsOwn": 3,
        "goalsBalance": 6,
        "efficiency": "100.00"
      },
      {
        "name": "Palmeiras",
        "totalPoints": 7,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 10,
        "goalsOwn": 5,
        "goalsBalance": 5,
        "efficiency": "77.78"
      },
      {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 6,
        "goalsOwn": 1,
        "goalsBalance": 5,
        "efficiency": "100.00"
      },
      {
        "name": "Grêmio",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 4,
        "goalsOwn": 1,
        "goalsBalance": 3,
        "efficiency": "100.00"
      },
      {
        "name": "Real Brasília",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 2,
        "goalsOwn": 0,
        "goalsBalance": 2,
        "efficiency": "100.00"
      },
      {
        "name": "São Paulo",
        "totalPoints": 4,
        "totalGames": 2,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 4,
        "goalsOwn": 1,
        "goalsBalance": 3,
        "efficiency": "66.67"
      },
      {
        "name": "Internacional",
        "totalPoints": 4,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 4,
        "goalsOwn": 6,
        "goalsBalance": -2,
        "efficiency": "44.44"
      },
      {
        "name": "Botafogo",
        "totalPoints": 4,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 2,
        "goalsOwn": 4,
        "goalsBalance": -2,
        "efficiency": "44.44"
      },
      {
        "name": "Ferroviária",
        "totalPoints": 3,
        "totalGames": 2,
        "totalVictories": 1,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 3,
        "goalsOwn": 2,
        "goalsBalance": 1,
        "efficiency": "50.00"
      },
      {
        "name": "Napoli-SC",
        "totalPoints": 2,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 2,
        "goalsOwn": 2,
        "goalsBalance": 0,
        "efficiency": "33.33"
      },
      {
        "name": "Cruzeiro",
        "totalPoints": 1,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 2,
        "goalsOwn": 3,
        "goalsBalance": -1,
        "efficiency": "16.67"
      },
      {
        "name": "Flamengo",
        "totalPoints": 1,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 1,
        "goalsOwn": 2,
        "goalsBalance": -1,
        "efficiency": "16.67"
      },
      {
        "name": "Minas Brasília",
        "totalPoints": 1,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 2,
        "goalsFavor": 3,
        "goalsOwn": 6,
        "goalsBalance": -3,
        "efficiency": "11.11"
      },
      {
        "name": "Avaí/Kindermann",
        "totalPoints": 1,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 2,
        "goalsFavor": 3,
        "goalsOwn": 7,
        "goalsBalance": -4,
        "efficiency": "11.11"
      },
      {
        "name": "São José-SP",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 2,
        "goalsOwn": 5,
        "goalsBalance": -3,
        "efficiency": "0.00"
      },
      {
        "name": "Bahia",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 0,
        "goalsOwn": 4,
        "goalsBalance": -4,
        "efficiency": "0.00"
      }
    ]
    ```
  
  ### Leaderboard Away
  - A rota utilizada deve ser (`/leaderboard/Away`) com o tipo `get`;

  - Resultado da requisição:
    ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 7,
        "goalsOwn": 0,
        "goalsBalance": 7,
        "efficiency": "100.00"
      },
      {
        "name": "Corinthians",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 6,
        "goalsOwn": 2,
        "goalsBalance": 4,
        "efficiency": "66.67"
      },
      {
        "name": "Internacional",
        "totalPoints": 6,
        "totalGames": 3,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 4,
        "goalsOwn": 2,
        "goalsBalance": 2,
        "efficiency": "66.67"
      },
      {
        "name": "São José-SP",
        "totalPoints": 6,
        "totalGames": 2,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 0,
        "goalsFavor": 3,
        "goalsOwn": 1,
        "goalsBalance": 2,
        "efficiency": "100.00"
      },
      {
        "name": "São Paulo",
        "totalPoints": 4,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 5,
        "goalsOwn": 5,
        "goalsBalance": 0,
        "efficiency": "44.44"
      },
      {
        "name": "Ferroviária",
        "totalPoints": 4,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 4,
        "goalsOwn": 5,
        "goalsBalance": -1,
        "efficiency": "44.44"
      },
      {
        "name": "Real Brasília",
        "totalPoints": 4,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 3,
        "goalsOwn": 4,
        "goalsBalance": -1,
        "efficiency": "44.44"
      },
      {
        "name": "Grêmio",
        "totalPoints": 4,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 5,
        "goalsOwn": 7,
        "goalsBalance": -2,
        "efficiency": "44.44"
      },
      {
        "name": "Flamengo",
        "totalPoints": 4,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 1,
        "goalsOwn": 3,
        "goalsBalance": -2,
        "efficiency": "44.44"
      },
      {
        "name": "Avaí/Kindermann",
        "totalPoints": 3,
        "totalGames": 2,
        "totalVictories": 1,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 1,
        "goalsOwn": 1,
        "goalsBalance": 0,
        "efficiency": "50.00"
      },
      {
        "name": "Cruzeiro",
        "totalPoints": 3,
        "totalGames": 3,
        "totalVictories": 1,
        "totalDraws": 0,
        "totalLosses": 2,
        "goalsFavor": 6,
        "goalsOwn": 7,
        "goalsBalance": -1,
        "efficiency": "33.33"
      },
      {
        "name": "Santos",
        "totalPoints": 2,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 3,
        "goalsOwn": 3,
        "goalsBalance": 0,
        "efficiency": "33.33"
      },
      {
        "name": "Bahia",
        "totalPoints": 2,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 2,
        "goalsOwn": 2,
        "goalsBalance": 0,
        "efficiency": "33.33"
      },
      {
        "name": "Minas Brasília",
        "totalPoints": 1,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 1,
        "goalsOwn": 3,
        "goalsBalance": -2,
        "efficiency": "16.67"
      },
      {
        "name": "Botafogo",
        "totalPoints": 0,
        "totalGames": 2,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 2,
        "goalsFavor": 1,
        "goalsOwn": 4,
        "goalsBalance": -3,
        "efficiency": "0.00"
      },
      {
        "name": "Napoli-SC",
        "totalPoints": 0,
        "totalGames": 3,
        "totalVictories": 0,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 1,
        "goalsOwn": 10,
        "goalsBalance": -9,
        "efficiency": "0.00"
      }
    ]
    ```

  ### Leaderboard Away
  - A rota utilizada deve ser (`/leaderboard/Away`) com o tipo `get`;

  - Resultado da requisição:
  ```json
    [
      {
        "name": "Palmeiras",
        "totalPoints": 13,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 1,
        "totalLosses": 0,
        "goalsFavor": 17,
        "goalsOwn": 5,
        "goalsBalance": 12,
        "efficiency": "86.67"
      },
      {
        "name": "Corinthians",
        "totalPoints": 12,
        "totalGames": 5,
        "totalVictories": 4,
        "totalDraws": 0,
        "totalLosses": 1,
        "goalsFavor": 12,
        "goalsOwn": 3,
        "goalsBalance": 9,
        "efficiency": "80.00"
      },
      {
        "name": "Santos",
        "totalPoints": 11,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 2,
        "totalLosses": 0,
        "goalsFavor": 12,
        "goalsOwn": 6,
        "goalsBalance": 6,
        "efficiency": "73.33"
      },
      {
        "name": "Grêmio",
        "totalPoints": 10,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 9,
        "goalsOwn": 8,
        "goalsBalance": 1,
        "efficiency": "66.67"
      },
      {
        "name": "Internacional",
        "totalPoints": 10,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 7,
        "goalsOwn": 6,
        "goalsBalance": 1,
        "efficiency": "66.67"
      },
      {
        "name": "Real Brasília",
        "totalPoints": 10,
        "totalGames": 5,
        "totalVictories": 3,
        "totalDraws": 1,
        "totalLosses": 1,
        "goalsFavor": 5,
        "goalsOwn": 4,
        "goalsBalance": 1,
        "efficiency": "66.67"
      },
      {
        "name": "São Paulo",
        "totalPoints": 8,
        "totalGames": 5,
        "totalVictories": 2,
        "totalDraws": 2,
        "totalLosses": 1,
        "goalsFavor": 9,
        "goalsOwn": 6,
        "goalsBalance": 3,
        "efficiency": "53.33"
      },
      {
        "name": "Ferroviária",
        "totalPoints": 7,
        "totalGames": 5,
        "totalVictories": 2,
        "totalDraws": 1,
        "totalLosses": 2,
        "goalsFavor": 7,
        "goalsOwn": 7,
        "goalsBalance": 0,
        "efficiency": "46.67"
      },
      {
        "name": "São José-SP",
        "totalPoints": 6,
        "totalGames": 5,
        "totalVictories": 2,
        "totalDraws": 0,
        "totalLosses": 3,
        "goalsFavor": 5,
        "goalsOwn": 6,
        "goalsBalance": -1,
        "efficiency": "40.00"
      },
      {
        "name": "Flamengo",
        "totalPoints": 5,
        "totalGames": 5,
        "totalVictories": 1,
        "totalDraws": 2,
        "totalLosses": 2,
        "goalsFavor": 2,
        "goalsOwn": 5,
        "goalsBalance": -3,
        "efficiency": "33.33"
      },
      {
        "name": "Cruzeiro",
        "totalPoints": 4,
        "totalGames": 5,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 3,
        "goalsFavor": 8,
        "goalsOwn": 10,
        "goalsBalance": -2,
        "efficiency": "26.67"
      },
      {
        "name": "Avaí/Kindermann",
        "totalPoints": 4,
        "totalGames": 5,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 3,
        "goalsFavor": 4,
        "goalsOwn": 8,
        "goalsBalance": -4,
        "efficiency": "26.67"
      },
      {
        "name": "Botafogo",
        "totalPoints": 4,
        "totalGames": 5,
        "totalVictories": 1,
        "totalDraws": 1,
        "totalLosses": 3,
        "goalsFavor": 3,
        "goalsOwn": 8,
        "goalsBalance": -5,
        "efficiency": "26.67"
      },
      {
        "name": "Bahia",
        "totalPoints": 2,
        "totalGames": 5,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 3,
        "goalsFavor": 2,
        "goalsOwn": 6,
        "goalsBalance": -4,
        "efficiency": "13.33"
      },
      {
        "name": "Minas Brasília",
        "totalPoints": 2,
        "totalGames": 5,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 3,
        "goalsFavor": 4,
        "goalsOwn": 9,
        "goalsBalance": -5,
        "efficiency": "13.33"
      },
      {
        "name": "Napoli-SC",
        "totalPoints": 2,
        "totalGames": 5,
        "totalVictories": 0,
        "totalDraws": 2,
        "totalLosses": 3,
        "goalsFavor": 3,
        "goalsOwn": 12,
        "goalsBalance": -9,
        "efficiency": "13.33"
      }
    ]
  ```
  </details>

</br>
</details>

<details>
<summary><strong>Iniciando o Front-End</strong></summary>

  * Basta ir na pasta `app/frontend` e colocar o comando: `npm run start`
  
  ![Projeto TFC](imgs/FrontEnd.png)
  
</details>

## Testes e Nota 

<details>
<summary><strong>Testes E2E</strong></summary><br />

  #### Teste Coverage
  Testando minhas Rotas com meus Services, Controllers e Models.
  * Os aquivos desse teste está na pasta `app/backend/src/tests`
  ![Nota do Projeto TFC](imgs/TestCoverageTFC.png)
</details>

<details>
<summary><strong>Nota do Projeto</strong></summary><br />

## 🔰Nota do projeto🔰
![Nota do Projeto TFC](imgs/TFC.png)

</details>

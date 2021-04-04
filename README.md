# :satellite: Sistema de Autenticação com Discord usando Express!

<img src="./images/banner.png" width="100%">

<p>
<a href="https://twitter.com/tiagoinsany"><img src="https://shields.io/twitter/follow/TiaGoiNsaNy?label=Follow" alt="tiagoinsany" /></a>
<a href="https://www.periquitosvaldo.ga"><img src="https://img.shields.io/badge/website-periquitosvaldo-green.svg"></a>
</a>
<a href="https://www.patreon.com/TiaGoiNsaNy"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg" alt="Patreon" /></a> 
<a href="https://www.paypal.com/donate/?cmd=_donations&business=K4DA7PQ8N2NDY&item_name=Ajudar+a+melhorar+a+hospedagem+da+Mizuhara+Bot&currency_code=BRL"><img src="https://img.shields.io/badge/donate-periquitosvaldo-fff.svg"></a>
<img alt="GitHub" src="https://img.shields.io/github/license/iNsaNyDevelopers/oauth2-discord-express?style=plastic">
</p>

## `1º` **|** Introdução:
:smile: Começando mais um projeto da **iNsaNy Developers**, e nada melhor doque dar um exemplo de como é feito o sistema de autenticação do website do [Periquitosvaldo](http://www.periquitosvaldo.ga) para vocês, primeira mente irei falar do que vai se tratar esse projeto, irei abordar os conceitos simples de armazenamento de sessão do usuários **(Cookies)**, e mostrarei como fazer a busca desses dados e enviar para o cliente que irá fazer a requisição no servidor.

:thinking: Para criarmos o nosso servidor iremos usar uma dependência chamada [Express](https://expressjs.com/pt-br/) e usaremos o [Express-Session](https://www.npmjs.com/package/express-session) para armazenamento de dados na sessão, além de outras dependências como [Node-Fetch](https://www.npmjs.com/package/node-fetch) para requisições com a **API** do **Discord**, o [Form-Data](https://www.npmjs.com/package/form-data) para criação de dados para serem enviados no corpo de nossa requisição com a **API** e o [Dotenv](https://www.npmjs.com/package/dotenv) para a leitura de variáveis locais do projeto.

:inbox_tray: Quando o usuário iniciar a autenticação do **Discord** com o servidor, ele será redirecionado a rota principal que irá mostrar uma resposta em **JSON** dos dados do usuário, assim você pode criar servidores com paginas de renderização, como o [EJS](https://ejs.co/) e mostrando dentro do website os dados do usuário.

## `2º` **|** Estruturação:

### :gear: - Arquivo `.env`

```
CLIENT_SECRET=key_secreta_da_sua_aplicação
PORT=8081
```

### :floppy_disk: **|** Arquivo `config.json`
```json
{
    "oauth2": {
        "redirect_uri": "http://localhost:8081/login/callback",
        "client_id": "ID da sua Aplicação",
        "scopes": ["identify"]
    }
}
```

### :open_file_folder: - Todas as Dependências Usadas:

- `dotenv@8.2.0`
- `express@4.17.1`
- `express-session@1.17.1`
- `form-data@4.0.0`
- `node-fetch@2.6.1`

### :electric_plug: - Script de Inicialização:

```shell
? npm run dev
```

## `3º` **|** Links:

:link: Todos os links abaixos estão liberados, espero que veja todos.
> - [:bird: Twitter TiaGoiNsaNy](https://twitter.com/TiaGoiNsaNy)
> - [:moneybag: Meu Patreon](https://patreon.com/TiaGoiNsaNy)
> - [:moneybag: Doações](https://www.paypal.com/donate/?cmd=_donations&business=K4DA7PQ8N2NDY&item_name=Ajudar+a+melhorar+a+hospedagem+da+Mizuhara+Bot&currency_code=BRL)

## `4º` **|** Contribuidores:

:star: Abaixo está o contribuidor do projeto, deem uns aplausos para ele!

| [<img src="https://avatars.githubusercontent.com/u/62999761?s=460&u=1a2c2557c68aeef26e6eb8fab98ff1ca32a7d259&v=4" width=115><br><sub>@TiaGoiNsaNy</sub>](https://github.com/TiaGoiNsaNy) |
| :---: |  

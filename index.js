require("dotenv").config(); // Abilita a leitura das variaveis locais no projeto

const express = require("express"); // Exporta a dependência do express para a criação do servidor
const fetch = require("node-fetch"); // Exporta a dependência do node-fetch para solcitações para a API
const FormData = require("form-data"); // Gerador de formulário para Body para solicitações na API

const app = express(); // Inicia a função de aplicativo padrão do express
const port = process.env.PORT || 8081; // Faz a busca da porta do servidor no arquivo ENV
const config = require("./config.json"); // Exporta o arquivo de configurações

app.use(require("express-session")({
	// Key Secret do seu Projeto, pode colocar qualquer valor
    secret: "secret",
    cookie: {
    	// Abaixo está a configuração de Cookies do seu servidor, no caso foi definido em milésimos
    	// que convertido em um tempo normal, dá 1 dia de duração para cada sessão. 
        maxAge: 86400000,
    },
    // Força a sessão a ser salva de volta no armazenamento de sessão, mesmo se a sessão nunca foi modificada durante a solicitação. 
    resave: true,
    // Força uma sessão "não inicializada" a ser salva na loja. Uma sessão não é inicializada quando é nova, mas não modificada.
    saveUninitialized: false
})); // O seu aplicação vai aplicar o modulo de sessões no seu servidor com as configurações acima

app.get("/", async (request, response) => {
    if (!request.session.bearer_token) {
        // Caso não tenha nenhum Cookie, o servidor redireciona o usuário para a rota de login
        response.redirect("/login");
    } else {
        response.status(200).json({
            user: request.session.user_info
        }); // Envia a resposta com todas as informações do usuário armazenados em um Cookie de Sessão
    }; // Faz a verificação dos Cookies de Sessão
}); // Rota principal do servidor, onde ele vai mostrar as informações do usuário na sessão em formato JSON

app.get("/login", (request, response) => {
    // O servidor irá gerar um URL de autenticação do bot para o usuário e irá redirecionar ele para esse link.
    response.redirect(`https://discord.com/api/oauth2/authorize` + 
        `?client_id=${config.oauth2.client_id}` +
        `&redirect_uri=${encodeURIComponent(config.oauth2.redirect_uri)}` +
        `&response_type=code&scope=${encodeURIComponent(config.oauth2.scopes.join(" "))}`);
}); // Rota de Login de seu servidor.

app.get("/login/callback", async (request, response) => {
    // Pega o código de acesso da URL(Conhecido como Query)
    const accessCode = request.query.code;

    // Caso não seja enviado esse código, ele redireciona para a rota principal
    if (!accessCode) return response.redirect("/");


    // Gera um formulário para ser enviado no corpo da requisição na API do Discord
    const data = new FormData();
    data.append("client_id", config.oauth2.client_id);
    data.append("client_secret", process.env.CLIENT_SECRET);
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", config.oauth2.redirect_uri);
    data.append("scope", "identify");
    data.append("code", accessCode);

    // Faz a requisição do Token de Acesso na API do discord com todos os dados de acesso da aplicação
    const json = await (await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        body: data
    })).json(); // Exporta os dados em formato JSON.

    // Faz a requisição das informações do usuário usando o Token de acesso
    const userJson = await (await fetch("https://discord.com/api/users/@me", {
        headers: {
            authorization: `${json.token_type} ${json.access_token}`,
        },
    })).json(); // Exporta os dados em formato JSON.

    request.session.user_info = userJson; // Armazena os dados do usuário dentro de um Cookie de Sessão
    request.session.bearer_token = json.access_token; // Armazena o Token de acesso do usuário dento de um Cookie de Sessão

    response.redirect("/"); // Redireciona o usuário para a rota principal
}); // Rota de autenticação do discord com o servidor

app.get("/logout", (request, response) => {
    if (!request.session.bearer_token) {
        // Caso não tenha nenhum Cookie, o servidor redireciona o usuário para a rota principal
        response.redirect("/");
    } else {
        // Remove os Cookies e redireciona o usuário para a rota principal
        request.session.destroy();
        response.redirect("/");
    }; // Verifica se o usuário tem um Cookie de Sessão
}); // Rota de Logout, onde ele vai remover todos os Cookies de sessão do usuário

app.listen(port, () => {
    // Envia um Callback no servidor notificando que ele está online!
    console.log("[SERVER] - Servidor Logado com Sucesso! iNsaNy Developers na Vóz!");
}); // Inicia o servidor na com a porta
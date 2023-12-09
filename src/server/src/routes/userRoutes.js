const { Router } = require("express");
const authorization = require("../middlewares/authorization");

// Importar handlers
const { 
    getAuthenticationTokenHandler,
    postUserHandler
} = require("../handlers/usersHandlers");

// Subrutas "/login" según tipo de petición
const loginRoutes = Router();
loginRoutes.get("/", getAuthenticationTokenHandler);
loginRoutes.post("/", authorization, postUserHandler);

module.exports = loginRoutes;
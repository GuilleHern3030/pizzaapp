const { Router } = require("express");
const authorization = require("../middlewares/authorization");

// Importar handlers
const {
  getArticlesHandler,
  getArticleHandler,
  postArticleHandler,
  deleteArticleHandler,
  putArticleHandler,
} = require("../handlers/articleHandlers");

// Subrutas "/messages" según tipo de petición
const articleRoutes = Router();
articleRoutes.get("/", getArticlesHandler); // obtener todos
articleRoutes.get("/:id", getArticleHandler); // obtener por id
articleRoutes.post("/", authorization, postArticleHandler); // crear nuevo
articleRoutes.delete("/:id", authorization, deleteArticleHandler); // borrar
articleRoutes.put("/:id", authorization, putArticleHandler); // editar por id

module.exports = articleRoutes;
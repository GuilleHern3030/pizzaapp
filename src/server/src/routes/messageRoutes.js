const { Router } = require("express");
const authorization = require("../middlewares/authorization");

// Importar handlers
const {
  getMessagesHandler,
  getMessageHandler,
  postMessageHandler,
  deleteMessageHandler,
  putMessageHandler,
} = require("../handlers/messageHandlers");

// Subrutas "/messages" según tipo de petición
const messageRoutes = Router();
messageRoutes.get("/", getMessagesHandler); // obtener todos
messageRoutes.get("/:id", getMessageHandler); // obtener por id
messageRoutes.post("/", postMessageHandler); // crear nuevo
messageRoutes.delete("/:id", authorization, deleteMessageHandler); // borrar
messageRoutes.put("/:id", authorization, putMessageHandler); // editar por id

module.exports = messageRoutes;


const { Router } = require("express");
const router = Router();

// Importar nuestras subrutas
const messagesRoutes = require("./messageRoutes");
const articlesRoutes = require("./articleRoutes");
const userRoutes = require("./userRoutes");

// Declaración de nuestras rutas + subrutas
router.use("/messages", messagesRoutes);
router.use("/articles", articlesRoutes);
router.use("/users", userRoutes);

module.exports = router;
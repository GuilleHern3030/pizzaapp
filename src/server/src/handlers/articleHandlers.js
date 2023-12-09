// Importar controllers (funciones que actúan sobre la base de datos)
const { create } = require("../controllers/articles/createController");
const { remove } = require("../controllers/articles/removeController");
const { selectAll } = require("../controllers/articles/selectAllController");
const { selectById } = require("../controllers/articles/selectByIdController");
const { selectByName } = require("../controllers/articles/selectByNameController");
const { edit } = require("../controllers/articles/editController");

// Crear handlers (funciones ejecutadas al ingresar en una ruta)
// Obtener según id
const getArticleHandler = async (req, res) => { 
  try {
    const { id } = req.params;
    if (id) {
      const getId = await selectById(id);
      if (getId) res.status(200).json(getId); // ok
      else res.status(404).json({}); // not found
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Obtener todos
const getArticlesHandler = async (req, res) => { 
  try {
    const { name } = req.query;
    if (name) { // Si hay un name en la query, sólo se obtienen esos
      const messages = await selectByName(name);
      res.status(200).json(messages); // ok
    } else {
      const messages = await selectAll();
      res.status(200).json(messages); // ok
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Agregar un nuevo mensaje
const postArticleHandler = async (req, res) => {
  //const { name, email, message } = req.body;
  try {
    const created = await create(req.body);
    res.status(201).json(created); // created
  } catch (error) {
    res.status(400).json({ detail: error, error: error.message }); // bad request
  }
};

// Borrar según id
const deleteArticleHandler = async (req, res) => { 
  try {
    const { id } = req.params;
    if (id) {
      const removed = await remove(id);
      if (removed) res.status(200).json(removed); // ok
      else res.status(204).json({id:false}); // no content
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Editar según id
const putArticleHandler = async (req, res) => { 
  try {
  const { id } = req.params;
    if (id) {
      const rowsEdited = await edit(id, req.body);
      if (rowsEdited) res.status(200).json(rowsEdited); // ok
      else res.status(204).json({id:false}); // no content
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Exportar handlers
module.exports = {
  getArticleHandler,
  getArticlesHandler,
  postArticleHandler,
  putArticleHandler,
  deleteArticleHandler,
};
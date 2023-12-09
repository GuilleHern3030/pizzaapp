// Importar controllers (funciones que actúan sobre la base de datos)
const { createMessage } = require("../controllers/messages/postMessageController");
const { deleteMessage } = require("../controllers/messages/deleteMessageController");
const { getAllMessages } = require("../controllers/messages/getMessagesController");
const { getMessageById } = require("../controllers/messages/getMessageController");
const { getMessagesByName } = require("../controllers/messages/selectMessagesByNameController");
const { editMessage } = require("../controllers/messages/putMessageController");

// Crear handlers (funciones ejecutadas al ingresar en una ruta)
// Obtener según id
const getMessageHandler = async (req, res) => { 
  try {
    const { id } = req.params;
    if (id) {
      const getId = await getMessageById(id);
      if (getId) res.status(200).json(getId); // ok
      else res.status(404).json({}); // not found
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Obtener todos
const getMessagesHandler = async (req, res) => { 
  try {
    const { name } = req.query;
    if (name) { // Si hay un name en la query, sólo se obtienen esos
      const messages = await getMessagesByName(name);
      res.status(200).json(messages); // ok
    } else {
      const messages = await getAllMessages();
      res.status(200).json(messages); // ok
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Agregar un nuevo mensaje
const postMessageHandler = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const created = await createMessage(
      name,
      email,
      message
    );
    res.status(201).json(created); // created
  } catch (error) {
    res.status(400).json({ detail: error, error: error.message }); // bad request
  }
};

// Borrar según id
const deleteMessageHandler = async (req, res) => { 
  try {
    const { id } = req.params;
    if (id) {
      const removed = await deleteMessage(id);
      if (removed) res.status(200).json(removed); // ok
      else res.status(204).json({id:false}); // no content
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Editar según id
const putMessageHandler = async (req, res) => { 
  try {
  const { id } = req.params;
    if (id) {
      const rowsEdited = await editMessage(id, req.body);
      if (rowsEdited) res.status(200).json(rowsEdited); // ok
      else res.status(204).json({id:false}); // no content
    }
  } catch (error) {
    res.status(500).json({ detail: error, error: error.message }); // internal server error
  }
};

// Exportar handlers
module.exports = {
  getMessageHandler,
  getMessagesHandler,
  postMessageHandler,
  putMessageHandler,
  deleteMessageHandler,
};


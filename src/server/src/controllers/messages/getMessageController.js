const { Message } = require("../../db");

const getMessageById = async (id) => {
  const message = await Message.findOne({
    where: { id: id },
  });
  if (message) { // encontrado
    return message.toJSON();
  }
};

module.exports = { getMessageById };


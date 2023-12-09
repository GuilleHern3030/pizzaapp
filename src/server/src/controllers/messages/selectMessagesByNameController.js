const { Message } = require("../../db");

const getMessagesByName = async (name) => {
  const response = await Message.findAll({
    where: { name: name },
  })
  return response
}

module.exports = { getMessagesByName };


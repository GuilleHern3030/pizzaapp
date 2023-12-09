const { Message } = require("../../db");

const getAllMessages = async () => {
  const response = await Message.findAll()
  return response
}

module.exports = { getAllMessages };


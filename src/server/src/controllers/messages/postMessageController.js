const { Message } = require("../../db");

const createMessage = async (
  name,
  email,
  message
) => {

  const newMessage = await Message.create({
    // id se autoincrementa
    name,
    email,
    message
  });
  return newMessage;
  
}

module.exports = { createMessage };


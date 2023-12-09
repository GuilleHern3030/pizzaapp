const { Message } = require("../../db");

const deleteMessage = async (id) => {
  const messageId = await Message.destroy({
    where: { id: id },
  });
  return { id: messageId };
}

module.exports = { deleteMessage };


const { Message } = require("../../db");

const editMessage = async (id, put) => {
  const messagesEdited = await Message.update(put,
    {
      where: { id: id },
    });
  return messagesEdited; // array with ids edited
}

module.exports = { editMessage };


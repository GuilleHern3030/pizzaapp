const { Article } = require("../../db");

const edit = async (id, put) => {
  const rowEdited = await Article.update(put,
    {
      where: { id: id },
    });
  return rowEdited; // array with ids edited
}

module.exports = { edit };


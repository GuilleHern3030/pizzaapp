const { Article } = require("../../db");

const selectById = async (id) => {
  const row = await Article.findOne({
    where: { id: id },
  });
  if (row) { // encontrado
    return row.toJSON();
  }
};

module.exports = { selectById };


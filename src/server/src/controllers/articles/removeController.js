const { Article } = require("../../db");

const remove = async (id) => {
  const rowId = await Article.destroy({
    where: { id: id },
  });
  return { id: rowId };
}

module.exports = { remove };


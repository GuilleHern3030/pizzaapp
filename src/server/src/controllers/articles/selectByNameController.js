const { Article } = require("../../db");

const selectByName = async (name) => {
  const rows = await Article.findAll({
    where: { name: name },
  })
  return rows;
}

module.exports = { selectByName };


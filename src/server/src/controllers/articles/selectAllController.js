const { Article } = require("../../db");

const selectAll = async () => {
  const rows = await Article.findAll({ order: [['id', 'ASC']] })
  return rows
}

module.exports = { selectAll };


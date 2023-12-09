const { Article } = require("../../db");

const create = async (post) => {
  const newRow = await Article.create(post);
  return newRow;
}

module.exports = { create };


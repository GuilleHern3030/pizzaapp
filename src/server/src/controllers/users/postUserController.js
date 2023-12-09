const { User } = require("../../db");

const postUser = async (name, token) => {
  const newRow = await User.create({
    name,
    token,
    authtoken: null,
    authdate: null
  });
  return newRow;
}

module.exports = { postUser };


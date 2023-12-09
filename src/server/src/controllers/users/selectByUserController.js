const { User } = require("../../db");

const selectByUser = async (user) => {
  const response = await User.findOne({
    where: { name: user },
  })
  return response
}

module.exports = { selectByUser };
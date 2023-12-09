const { User } = require("../../db");

const selectByAuthToken = async (authToken) => {
  const response = await User.findOne({
    where: { authtoken: authToken },
  })
  return response;
}

module.exports = { selectByAuthToken };
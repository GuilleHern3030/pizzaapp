const { User } = require("../../db");

const putAuthToken = async (id, authToken, authDate) => {
  User.findOne({ where: { id: id } })
  .then(user => {
    if (user) {
        user.authtoken = authToken;
        user.authdate = authDate;
        return user.save()
    } return Promise.reject(new Error("User not found"))
  })
  .then(userActualized => { console.log("User authenticated:", userActualized.toJSON()) })
  .catch(err => { console.error("User authentication error:", err) })
}

module.exports = { putAuthToken };
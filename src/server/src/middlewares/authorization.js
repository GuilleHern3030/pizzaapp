const { checkTokenHandler } = require("../handlers/usersHandlers")

const authorization = async(req, res, next) => {
    //return next()
    try {
        const token = req.header('token') || req.body.token;
        if (token) {
            const authorized = await checkTokenHandler(token);
            if (authorized) return next();
            else return res.status(401).json({ error: "No authenticated" }); // unauthorized
        } else return res.status(400).json({ error: "Not token provided" })
    } catch (error) { return res.status(500).json({ detail: error, error: error.message }); }
};

module.exports = authorization
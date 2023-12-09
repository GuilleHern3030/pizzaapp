// Importar controllers (funciones que actúan sobre la base de datos)
const { selectByUser } = require("../controllers/users/selectByUserController");
const { selectByAuthToken } = require("../controllers/users/selectByTokenController");
const { putAuthToken } = require("../controllers/users/putTokenController");
const { postUser } = require("../controllers/users/postUserController");
const { tokenize, detokenize } = require("../middlewares/tokenizer")

// Crear handlers (funciones ejecutadas al ingresar en una ruta)
const getAuthenticationTokenHandler = async (req, res) => { 
    try {
        const userName = req.header('user');
        const userPsw = detokenize(req.header('password'), userName);
        if (userName && userPsw) {
            const userData = await selectByUser(userName);
            if (userData) {
                if (userPsw === detokenize(userData.token, userPsw)) {
                    const authToken = generateAuthToken(10)
                    await putAuthToken(userData.id, authToken, new Date().toISOString())
                    res.status(200).json({ token: authToken });
                } else res.status(401).json({ error: "Incorrect user name or password" }) // unauthorized
            } else res.status(404).json({ error: "User not exists" }); // not found
        } else res.status(400).json({ error: "Invalid user name or password" }); // bad request
    } catch (error) { 
        console.error(error)
        res.status(500).json({ detail: error, error: error.message }) 
    } // internal server error 
};

const postUserHandler = async (req, res) => {
    const { user, password } = req.body;
    try {
      const created = await postUser(user, tokenize(password));
      res.status(201).json(created); // created
    } catch (error) {
      res.status(400).json({ detail: error, error: error.message }); // bad request
    }
};

const checkTokenHandler = async (token) => { 
    if (typeof token == "string" && token.length > 0) try {
        const data = await selectByAuthToken(token);
        if (data) {
            if (token === data.authtoken) {
                const hours = dateDifference(new Date(data.authdate))
                if (hours < 3) {
                    return true;
                }
            }
        }
    } catch (error) { }
    return false;
};

// Methods
const generateAuthToken = (length=10) => {
    const keyword = 'abcdefghijklmnopqrstuvwxyz';
    let token = '';
    for (let i = 0; i < length; i++)
        token += keyword.charAt(Math.floor(Math.random() * keyword.length));
    return token;
}
const dateDifference = date => {
    const ms = Math.abs(new Date() - date);
    const hs = ms / (1000 * 60 * 60);
    return hs;
}

// Exportar handlers
module.exports = {
    getAuthenticationTokenHandler,
    checkTokenHandler,
    postUserHandler
};
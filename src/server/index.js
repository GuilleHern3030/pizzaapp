const server = require("./src/server");
const path = require('path')

// Start server
server.listen(server.get('port'), () => {
    console.log(`Server on port ${server.get('port')}`);
});

/*
conn
  .sync({ force: false })
  .then(async () => {
    await getTeamsController();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
  */
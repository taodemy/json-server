require("dotenv").config();
const cors = require("cors");

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();

const PORT = process.env.JSON_SERVER_PORT;
const uatUrlRegex = new RegExp(".*taodemy.vercel.app/$");

server.use(
  cors({
    origin: ["http://localhost:3000", uatUrlRegex],
    // if the uatUrl regex does not work, change origin to * to accept any origin.
  })
);
server.use(middleware);
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running at ${PORT}`);
});

module.exports = server;

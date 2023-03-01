require("dotenv").config();
const cors = require("cors");
const path = require("path");

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middleware = jsonServer.defaults();

const PORT = process.env.JSON_SERVER_PORT;
const uatUrlRegex = new RegExp(".*taodemy.vercel.app/$");

server.use(
  cors({
    origin: ["http://localhost:3000", uatUrlRegex],
  })
);
server.use(middleware);
server.use(
  jsonServer.rewriter({
    "/api/v1/*": "/$1",
  })
);

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running at ${PORT}`);
});

module.exports = server;

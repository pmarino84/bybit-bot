require("dotenv").config();
const { RestClientV5 } = require("bybit-api");
const Server           = require("./src/server.js");

const SERVER_PORT      = process.env.PORT;

// (async () => {
//   const { result: accountInfo } = await client.getAccountInfo();
//   console.log("Account info: ", accountInfo);
  
//   // process.on("SIGTERM", () => {
//   //   console.log("kill the process!");
//   // });
// })();

const client = new RestClientV5({
  key    : process.env.BYBIT_API_KEY,
  secret : process.env.BYBIT_API_SECRET,
  testnet: process.env.BYBIT_USE_TESTNET !== "false",
});

const server = new Server(client);
server.listen(SERVER_PORT);

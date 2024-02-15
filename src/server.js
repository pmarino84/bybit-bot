const http   = require("http");
const BotApi = require("./api/index.js");

// TODO: tipizzare come si deve
/**
 * Retrieve "OK" if the server still running
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse}  res 
 */
function handleGetHealtCheck({ client, req, res }) {
  res.statusCode = 200;
  res.end("OK");
}

// TODO: tipizzare come si deve
/**
 * Webhook to handle the Tradingview alerts
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse}  res 
 */
async function handleWebhook({ client, req, res }) {
  // EXAMPLE (ovviamente non funziona e manco risponde al chiamante)
  const { result: wallet } = await client.getWalletBalance({
    accountType: "CONTRACT",
    coin       : "USDT",
  });
  console.log("Wallet: ", wallet.list);

  // TODO: terminare
  // creare handler apposito per ogni strategia, così che venga richiamato quello corretto qui
  client.submitOrder({
    category : "linear",
    symbol   : "BTCUSDT", // da req.body
    orderType: "Market",
    qty      : "?",       // da req.body
    stopLoss : "?",       // da req.body
    side     : "Buy",     // da req.body.isLong | isShort
  });
}

const routes = {
  ['get']: {
    ['/healthcheck']: handleGetHealtCheck,
  },
  ['post']: {
    ['/webhook']: handleWebhook,
  },
}

// TODO: tipizzare come si deve
/**
 * Send invalid route error
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse}  res 
 */
function handleInvalidRoute({ req, res }) {
  req.statusCode = 400;
  res.end("Invalid route");
}

class Server {
  constructor(bybitClient) {
    this.bybitClient = bybitClient;
    this.api         = new BotApi(this.bybitClient);
    this.httpServer  = null;
  }

  listen(port) {
    this.httpServer = http.createServer((req, res) => {
      const map   = routes[req.method];
      const route = map ? (map[req.url] || handleInvalidRoute) : handleInvalidRoute;
      route({ client: this.bybitClient, req, res });
    });

    this.httpServer.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}`));

    return this.httpServer;
  }
}

module.exports = Server;
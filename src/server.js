const http   = require("http");
const BotApi = require("./api/index.js");

/**
 * Retrieve "OK" if the server still running
 * @param {http.IncomingMessage} req Request
 * @param {http.ServerResponse}  res Server response
 */
function handleGetHealtCheck(req, res) {
  res.statusCode = 200;
  res.end("OK");
}

/**
 * Handle the Tradingview alert for the strategy "BB + RSI | Trailing SL"
 * @param {object} payload Request payload
 * @param {BotApi} api     Api to interact with ByBIT
 */
async function bbPlusRsiStrategy(payload, api) {
  if (payload.isExit) {
    return api.closeLastPosition(payload);
  }

  return api.openTrade(payload);
}

const strategies = {
  "BB + RSI": bbPlusRsiStrategy,
};

/**
 * Webhook to handle the Tradingview alerts
 * @param {http.IncomingMessage} req Request
 * @param {http.ServerResponse}  res Server response
 * @param {BotApi}               api Api to interact with ByBIT
 */
async function handleWebhook(req, res, api) {
  // TODO: payload validation
  const payload = JSON.parse(req.body);

  strategy = strategies[payload.strategyName];
  if (!strategy) {
    res.statusCode = 500;
    res.end("Strategy not implemented!");
    return;
  }

  const result = await strategy(req, api);

  if (result instanceof Error) {
    res.statusCode = 500;
    res.end(JSON.stringify(result));
    return;
  }

  // TODO: rispondere in maniera opportuna
  res.statusCode = 200;
  res.end("OK");
}

const routes = {
  ['get']: {
    ['/healthcheck']: handleGetHealtCheck,
  },
  ['post']: {
    ['/webhook']: handleWebhook,
  },
}

/**
 * Send invalid route error
 * @param {http.IncomingMessage} req Request
 * @param {http.ServerResponse}  res Server response
 */
function handleInvalidRoute(req, res) {
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
      route(req, res, api);
    });

    this.httpServer.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}`));

    return this.httpServer;
  }
}

module.exports = Server;
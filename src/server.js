const fs     = require("fs");
const http   = require("http");
const path   = require("path");
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
    ['/webhook']    : handleWebhook,
  },
}

const STATIC_PATH = path.join(process.cwd(), "public");

const MIME_TYPES = {
  default: "application/octet-stream",
  html   : "text/html; charset=UTF-8",
  js     : "application/javascript",
  css    : "text/css",
  png    : "image/png",
  jpg    : "image/jpg",
  gif    : "image/gif",
  ico    : "image/x-icon",
  svg    : "image/svg+xml",
};

/**
 * Send invalid route error
 * @param {http.IncomingMessage} req Request
 * @param {http.ServerResponse}  res Server response
 */
async function handleStaticFiles(req, res) {
  const paths      = [STATIC_PATH, req.url];
  if (req.url.endsWith("/")) paths.push("index.html");

  const filePath   = path.join(...paths);
  const fileExist  = await fs.promises.access(filePath).then(() => true, () => false);
  const streamPath = fileExist ? filePath : path.join(STATIC_PATH, "/404.html");
  const extension  = path.extname(streamPath).substring(1).toLowerCase();
  const stream     = fs.createReadStream(streamPath);

  const statusCode = fileExist ? 200 : 404;
  const mimeType   = MIME_TYPES[extension] || MIME_TYPES.default;
  const headers    = { "Content-Type": mimeType };
  res.writeHead(statusCode, headers);
  stream.pipe(res);
}

/**
 * Send invalid route error
 * @param {http.IncomingMessage} req Request
 * @param {http.ServerResponse}  res Server response
 */
function handleInvalidRoute(req, res) {
  res.statusCode = 400;
  res.end("Invalid route");
}

/**
 * Return the route handler by request url
 * @param {http.IncomingMessage} req Request
 */
function findRouter(req) {
  const map  = routes[req.method];
  let router = map ? map[req.url] : null;
  if (router) return router;

  if (req.method.toLowerCase() == "get") {
    return handleStaticFiles;
  }

  return handleInvalidRoute;
}

class Server {
  constructor(bybitClient) {
    this.bybitClient = bybitClient;
    this.api         = new BotApi(this.bybitClient);
    this.httpServer  = null;
  }

  listen(port) {
    this.httpServer = http.createServer((req, res) => {
      router = findRouter(req);
      router(req, res, api);
    });

    this.httpServer.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}`));

    return this.httpServer;
  }
}

module.exports = Server;

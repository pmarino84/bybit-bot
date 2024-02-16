const calcQuantity     = require("./calcQuantity");
const getCoinBalance   = require("./getCoinBalance");
const getSymbolInfo    = require("./getSymbolInfo");
const getTicker        = require("./getTicker");

/**
 * Submit an order to open the trade with the given payload data
 * @param {import("bybit-api").RestClientV5} client  ByBIT client
 * @param {object}                           payload Request payload
 * @returns 
 */
async function openTrade(client, payload) {
  const balance    = await getCoinBalance(client, payload.balanceCoin);
  if (balance instanceof Error) return balance;

  const symbolInfo = await getSymbolInfo(client, "linear", payload.symbol);
  if (symbolInfo instanceof Error) return symbolInfo;

  const ticker     = await getTicker(client, "linear", payload.symbol);
  if (ticker instanceof Error) return ticker;

  const quantity   = calcQuantity(balance, symbolInfo, ticker);

  const orderData  = {
    category : "linear",
    orderType: "Market",
    side     : payload.side,
    symbol   : payload.symbol,
    // price    : payload.entryPrice, // se entro a mercato non serve
    stopLoss : payload.stopLossPrice,
    qty      : quantity,
  };
  
  const response = await client.submitOrder(orderData);

  if (response.retCode != 0) return new Error("OpenTradeError");

  const data     = response.result;

  const order    = { ...data, ...orderData };

  return order;
}
module.exports = openTrade;

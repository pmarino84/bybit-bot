const CloseLastPositionError = require("../errors/CloseLastPositionError");
const findLastPosition       = require("./findLastPosition");

/**
 * 
 * @param {import("bybit-api").RestClientV5} client ByBIT client
 * @param {string}                           symbol Pair symbol
 * @returns 
 */
async function closeLastPosition(client, symbol) {
  const position  = await findLastPosition(client, "linear", symbol);
  if (position instanceof Error) return position;

  const orderData = {
    symbol        : position.symbol,
    qty           : String(position.size),
    positionIdx   : position.positionIdx,
    side          : position.side == "Buy" ? "Sell" : "Buy",
    category      : "linear",
    orderType     : "Market",
    reduceOnly    : true,
    closeOnTrigger: false,
  };

  const response  = await client.submitOrder(orderData);
  if(response.retCode != 0) return new CloseLastPositionError(symbol, orderData, response);

  const data      = response.result;

  const order     = { ...data, ...orderData };

  return order;
}
module.exports = closeLastPosition;

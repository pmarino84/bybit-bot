const GetTickerError      = require("../errors/GetTickerError");
const parseFieldsAsNumber = require("../utils/parseFieldsAsNumber");

const FIELD_TO_PARSE_AS_NUMBER = [
  "lastPrice",
  "indexPrice",
  "markPrice",
  "prevPrice24h",
  "price24hPcnt",
  "highPrice24h",
  "lowPrice24h",
  "prevPrice1h",
  "openInterest",
  "openInterestValue",
  "turnover24h",
  "volume24h",
  "fundingRate",
  "nextFundingTime",
  "predictedDeliveryPrice",
  "basisRate",
  "deliveryFeeRate",
  "ask1Size",
  "bid1Price",
  "ask1Price",
  "bid1Size",
];

/**
 * Returns the ticker info
 * @param {import("bybit-api").RestClientV5}            client   ByBIT Client
 * @param {import("bybit-api").CategoryV5}              category Category of the account
 * @param {string}                                      symbol   Pair symbol
 * @returns {import("bybit-api").TickerLinearInverseV5} the ticker info
 */
async function getTicker(client, category, symbol) {
  const response = await client.getTickers({ category, symbol });

  if (response.retCode !== 0) return new GetTickerError(symbol, response);

  const ticker = response.result.list[0];

  return parseFieldsAsNumber(ticker, FIELD_TO_PARSE_AS_NUMBER);
}
module.exports = getTicker;

/**
 * @typedef {import("bybit-api").SpotInstrumentInfoV5 | import("bybit-api").LinearInverseInstrumentInfoV5 | import("bybit-api").OptionInstrumentInfoV5} InstrumentInfo
 */

const GetSymbolInfoError = require("../errors/GetSymbolInfoError");

/**
 * Returns the symbol instruments info
 * @param {import("bybit-api").RestClientV5} client   ByBIT Client
 * @param {import("bybit-api").CategoryV5}   category Category of the account
 * @param {string}                           symbol   Pair symbol
 * @returns {InstrumentInfo}                 the symbol info
 */
async function getSymbolInfo(client, category, symbol) {
  const response = await client.getInstrumentsInfo({ category, symbol });

  if (response.retCode !== 0) return new GetSymbolInfoError(symbol, response);

  const info = response.result.list[0];

  return info;
}
module.exports = getSymbolInfo;

/**
 * Returns the ticker info
 * @param {import("bybit-api").RestClientV5}            client   ByBIT Client
 * @param {import("bybit-api").CategoryV5}              category Category of the account
 * @param {string}                                      symbol   Pair symbol
 * @returns {import("bybit-api").TickerLinearInverseV5} the ticker info
 */
async function getTicker(client, category, symbol) {
  const response = await client.getTickers({ category, symbol });

  if (response.retCode !== 0) return new Error("GetTickerError");

  const ticker = response.result.list[0];

  return ticker;
}
module.exports = getTicker;

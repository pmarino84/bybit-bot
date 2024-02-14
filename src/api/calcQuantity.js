/**
 * @typedef {import("bybit-api").SpotInstrumentInfoV5 | import("bybit-api").LinearInverseInstrumentInfoV5 | import("bybit-api").OptionInstrumentInfoV5} InstrumentInfo
 */

/**
 * Returns quantity for the trade
 * @param {import("bybit-api").AccountCoinBalanceV5.balance} balance    Coin balance
 * @param {InstrumentInfo}                                   symbolInfo Pair symbol info
 * @param {import("bybit-api").TickerLinearInverseV5}        ticker     Pair symbol ticker data
 */
function calcQuantity(balance, symbolInfo, ticker) {
  const quantity      = balance.walletBalance / ticker.markPrice // ticker.ask1Price | ticker.bid1Price
  const lotSizeFilter = symbolInfo.lotSizeFilter;

  if (quantity < lotSizeFilter.minOrderQty) return lotSizeFilter.minOrderQty; // forse è meglio restituire un errore
  if (quantity < lotSizeFilter.maxOrderQty) return lotSizeFilter.maxOrderQty;

  return quantity; // lotSizeFilter.qtyStep lo gestisco ???
}
module.exports = calcQuantity;

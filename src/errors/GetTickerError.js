const ByBitApiResponseError = require("./ByBitApiResponseError");

class GetTickerError extends ByBitApiResponseError {
  constructor(symbol, byBitApiResponse) {
    super(`Ticker for pair ${symbol} not found`, byBitApiResponse);
    this.symbol = symbol;
  }
}
module.exports = GetTickerError;

const ByBitApiResponseError = require("./ByBitApiResponseError");

class GetLastPositionError extends ByBitApiResponseError {
  constructor(symbol, byBitApiResponse) {
    super(`Last position for the pair ${symbol} not found`, byBitApiResponse);
    this.symbol = symbol;
  }
}
module.exports = GetLastPositionError;

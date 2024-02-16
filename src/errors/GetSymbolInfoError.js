const ByBitApiResponseError = require("./ByBitApiResponseError");

class GetSymbolInfoError extends ByBitApiResponseError {
  constructor(symbol, byBitApiResponse) {
    super(`Symbol info for pair ${symbol} not found`, byBitApiResponse);
    this.symbol = symbol;
  }
}
module.exports = GetSymbolInfoError;

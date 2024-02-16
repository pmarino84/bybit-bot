const ByBitApiResponseError = require("./ByBitApiResponseError");

class CloseLastPositionError extends ByBitApiResponseError {
  constructor(symbol, orderData, byBitApiResponse) {
    super(`Failed to close last position of the pair ${symbol}`, byBitApiResponse);
    this.symbol    = symbol;
    this.orderData = orderData;
  }
}
module.exports = CloseLastPositionError;

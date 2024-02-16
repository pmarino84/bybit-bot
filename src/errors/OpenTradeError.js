const ByBitApiResponseError = require("./ByBitApiResponseError");

class OpenTradeError extends ByBitApiResponseError {
  constructor(payload, orderData, byBitApiResponse) {
    super(`Failed to open trade`, byBitApiResponse);
    this.payload   = payload;
    this.orderData = orderData;
  }
}
module.exports = OpenTradeError;

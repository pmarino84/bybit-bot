const ByBitApiResponseError = require("./ByBitApiResponseError");

class GetCoinBalanceError extends ByBitApiResponseError {
  constructor(coin, byBitApiResponse) {
    super(`Balance of ${coin} not found`, byBitApiResponse);
    this.coin = coin;
  }
}
module.exports = GetCoinBalanceError;

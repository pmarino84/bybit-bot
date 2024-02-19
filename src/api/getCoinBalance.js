const GetCoinBalanceError = require("../errors/GetCoinBalanceError");
const parseFieldsAsNumber = require("../utils/parseFieldsAsNumber");

const FIELD_TO_PARSE_AS_NUMBER = ["walletBalance", "transferBalance"];

/**
 * Returns the coin balance of the connected account
 * @param   {import("bybit-api").RestClientV5}   client ByBIT Client
 * @param   {string}                             coin   Coin symbol
 * @returns {import("../../global").CoinBalance}        the coin balance
 */
async function getCoinBalance(client, coin) {
  const response = await client.getCoinBalance({ accountType: "CONTRACT", coin });

  if (response.retCode !== 0) return new GetCoinBalanceError(coin, response);

  const balance = response.result.balance;

  return parseFieldsAsNumber(balance, FIELD_TO_PARSE_AS_NUMBER);
}
module.exports = getCoinBalance;

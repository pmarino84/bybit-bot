/**
 * Returns the coin balance of the connected account
 * @param {import("bybit-api").RestClientV5}                   client ByBIT Client
 * @param {string}                                             coin   Coin symbol
 * @returns {import("bybit-api").AccountCoinBalanceV5.balance} the coin balance
 */
async function getCoinBalance(client, coin) {
  const response = await client.getCoinBalance({ accountType: "CONTRACT", coin });

  if (response.retCode !== 0) return new Error("GetCoinBalanceError");

  const balance = response.result.balance;

  return balance;
}
module.exports = getCoinBalance;

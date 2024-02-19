const GetLastPositionError = require("../errors/GetLastPositionError");
const parseFieldsAsNumber  = require("../utils/parseFieldsAsNumber");

const FIELD_TO_PARSE_AS_NUMBER = ["size", "avgPrice", "positionValue", "markPrice", "liqPrice", "bustPrice", "takeProfit", "stopLoss", "unrealisedPnl", "cumRealisedPnl"];

/**
 * Returns the last opened position
 * @param   {import("bybit-api").RestClientV5}       client   ByBIT Client
 * @param   {import("bybit-api").CategoryV5}         category Category of the account
 * @param   {string}                                 symbol   Pair symbol
 * @returns {import("../../global").Position | null}          the last position opened
 */
async function findLastPosition(client, category, symbol) {
  const response = await client.getPositionInfo({ category, symbol });

  if (response.retCode !== 0) return new GetLastPositionError(symbol, response);

  const positions = response.result.list;

  if (positions.length == 0) return null;
  if (positions.length == 1) return positions[0];

  const lastPosition = positions.sort((a, b) => a.createdTime - b.createdTime)[0]; // TODO: attento sono stringhe

  return parseFieldsAsNumber(lastPosition, FIELD_TO_PARSE_AS_NUMBER);
}
module.exports = findLastPosition;

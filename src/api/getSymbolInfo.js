/**
 * @typedef {import("bybit-api").SpotInstrumentInfoV5 | import("bybit-api").LinearInverseInstrumentInfoV5 | import("bybit-api").OptionInstrumentInfoV5} InstrumentInfoV5
 */

const GetSymbolInfoError  = require("../errors/GetSymbolInfoError");
const parseFieldsAsNumber = require("../utils/parseFieldsAsNumber");

/**
 * Return true if the given info it's a LinearInverseInstrumentInfoV5
 * @param   {InstrumentInfoV5} info Instrument info to check
 * @returns {boolean}               true if the given info it's a LinearInverseInstrumentInfoV5
 */
const isLinearInversInstrumentInfo = (info) => "leverageFilter" in info;

/**
 * Return true if the given info it's a SpotInstrumentInfoV5
 * @param   {InstrumentInfoV5} info Instrument info to check
 * @returns {boolean}               true if the given info it's a SpotInstrumentInfoV5
 */
const isSpotInstrumentInfo = (info) => "innovation" in info;

/**
 * Return true if the given info it's a OptionInstrumentInfoV5
 * @param   {InstrumentInfoV5} info Instrument info to check
 * @returns {boolean}               true if the given info it's a OptionInstrumentInfoV5
 */
const isOptionsInstrumentInfo = (info) => !isLinearInversInstrumentInfo(info) && !isSpotInstrumentInfo(info);

function parseLinearInstrumentInfo(info) {
  const leverageFilter = parseFieldsAsNumber(info.leverageFilter, ["minLeverage", "maxLeverage", "leverageStep"]);
  const priceFilter    = parseFieldsAsNumber(info.priceFilter,    ["minPrice", "maxPrice", "tickSize"]);
  const lotSizeFilter  = parseFieldsAsNumber(info.lotSizeFilter,  ["maxOrderQty", "minOrderQty", "qtyStep", "postOnlyMaxOrderQty"]);
  return { ...info, leverageFilter, priceFilter, lotSizeFilter };
}

function parseSpotInstrumentInfo(info) {
  const lotSizeFilter  = parseFieldsAsNumber(info.lotSizeFilter,  ["maxOrderQty", "minOrderQty", "basePrecision", "quotePrecision", "minOrderAmt", "maxOrderAmt"]);
  return { ...info, lotSizeFilter };
}

function parseOptionsInstrumentInfo(info) {
  const priceFilter    = parseFieldsAsNumber(info.priceFilter,    ["minPrice", "maxPrice", "tickSize"]);
  const lotSizeFilter  = parseFieldsAsNumber(info.lotSizeFilter,  ["maxOrderQty", "minOrderQty", "qtyStep"]);
  return { ...info, leverageFilter, priceFilter, lotSizeFilter };
}

function parseInstrumentInfo(info) {
  if (isLinearInversInstrumentInfo(info)) {
    return parseLinearInstrumentInfo(info);
  }

  if (isSpotInstrumentInfo(info)) {
    return parseSpotInstrumentInfo(info);
  }

  return parseOptionsInstrumentInfo(info);
}

/**
 * Returns the symbol instruments info
 * @param   {import("bybit-api").RestClientV5} client   ByBIT Client
 * @param   {import("bybit-api").CategoryV5}   category Category of the account
 * @param   {string}                           symbol   Pair symbol
 * @returns {InstrumentInfoV5}                          the symbol info
 */
async function getSymbolInfo(client, category, symbol) {
  const response = await client.getInstrumentsInfo({ category, symbol });

  if (response.retCode !== 0) return new GetSymbolInfoError(symbol, response);

  const info = response.result.list[0];

  return parseInstrumentInfo(info);
}
module.exports = getSymbolInfo;

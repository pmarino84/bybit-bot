const calcQuantity      = require("./calcQuantity");
const closeLastPosition = require("./closeLastPosition");
const findLastPosition  = require("./findLastPosition");
const getCoinBalance    = require("./getCoinBalance");
const getSymbolInfo     = require("./getSymbolInfo");
const getTicker         = require("./getTicker");
const openTrade         = require("./openTrade");

class BotApi {
  /**
   * Constructor of BotApi
   * @param {import("bybit-api").RestClientV5} client ByBIT client
   */
  constructor(client) {
    this.client = client;
  }

  async openTrade(payload)                  { return openTrade(this.client, payload);                 }

  async closeLastPosition(payload)          { return closeLastPosition(this.client, payload.symbol);  }

  calcQuantity(balance, symbolInfo, ticker) { return calcQuantity(balance, symbolInfo, ticker);       }

  async findLastPosition(category, symbol)  { return findLastPosition(this.client, category, symbol); }

  async getCoinBalance(coin)                { return getCoinBalance(this.client, coin);               }

  async getSymbolInfo(category, symbol)     { return getSymbolInfo(this.client, category, symbol);    }

  async getTicker(category, symbol)         { return getTicker(this.client, category, symbol);        }
}

module.exports = BotApi;

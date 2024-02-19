import { PositionIdx, TradeModeV5, TPSLModeV5, InstrumentStatusV5, ContractTypeV5, OptionTypeV5 } from "bybit-api";

export type Position = {
  positionIdx   : PositionIdx;
  riskId        : number;
  riskLimitValue: string;
  symbol        : string;
  side          : 'Buy' | 'Sell' | 'None';
  size          : number; // string;
  avgPrice      : number; // string;
  positionValue : number; // string;
  tradeMode     : TradeModeV5;
  autoAddMargin?: number;
  positionStatus: 'Normal' | 'Liq' | 'Adl';
  leverage     ?: string;
  markPrice     : number; // string;
  liqPrice      : number; // string;
  bustPrice    ?: number; // string;
  positionIM   ?: string;
  positionMM   ?: string;
  tpslMode     ?: TPSLModeV5;
  takeProfit   ?: number; // string;
  stopLoss     ?: number; // string;
  trailingStop ?: string;
  unrealisedPnl : number; // string;
  cumRealisedPnl: number; // string;
  createdTime   : string;
  updatedTime   : string;
};

export type CoinBalance = {
  coin           : string;
  walletBalance  : number; // string;
  transferBalance: number; // string;
  bonus          : string;
};

export type SpotInstrumentInfo = {
  symbol       : string;
  baseCoin     : string;
  quoteCoin    : string;
  innovation   : '0' | '1';
  status       : InstrumentStatusV5;
  lotSizeFilter: {
    basePrecision : number; // string;
    quotePrecision: number; // string;
    minOrderQty   : number; // string;
    maxOrderQty   : number; // string;
    minOrderAmt   : number; // string;
    maxOrderAmt   : number; // string;
  };
  priceFilter: {
    tickSize: string;
  };
};

export type LinearInverseInstrumentInfo = {
  symbol          : string;
  contractType    : ContractTypeV5;
  status          : InstrumentStatusV5;
  baseCoin        : string;
  quoteCoin       : string;
  launchTime      : string;
  deliveryTime   ?: string;
  deliveryFeeRate?: string;
  priceScale      : string;
  leverageFilter  : {
    minLeverage : number; // string;
    maxLeverage : number; // string;
    leverageStep: number; // string;
  };
  priceFilter: {
    minPrice: number; // string;
    maxPrice: number; // string;
    tickSize: number; // string;
  };
  lotSizeFilter: {
    maxOrderQty         : number; // string;
    minOrderQty         : number; // string;
    qtyStep             : number; // string;
    postOnlyMaxOrderQty?: number; // string;
  };
  unifiedMarginTrade: boolean;
  fundingInterval   : number;
  settleCoin        : string;
};

export type OptionInstrumentInfo = {
  symbol         : string;
  optionsType    : OptionTypeV5;
  status         : InstrumentStatusV5;
  baseCoin       : string;
  quoteCoin      : string;
  settleCoin     : boolean;
  launchTime     : string;
  deliveryTime   : string;
  deliveryFeeRate: string;
  priceFilter: {
    minPrice: number; // string;
    maxPrice: number; // string;
    tickSize: number; // string;
  };
  lotSizeFilter: {
    maxOrderQty: number; // string;
    minOrderQty: number; // string;
    qtyStep    : number; // string;
  };
};

export type InstrumentInfo = SpotInstrumentInfo | LinearInverseInstrumentInfo | OptionInstrumentInfo;

export type TickerLinearInverse = {
  symbol                : string;
  lastPrice             : number; // string;
  indexPrice            : number; // string;
  markPrice             : number; // string;
  prevPrice24h          : number; // string;
  price24hPcnt          : number; // string;
  highPrice24h          : number; // string;
  lowPrice24h           : number; // string;
  prevPrice1h           : number; // string;
  openInterest          : number; // string;
  openInterestValue     : number; // string;
  turnover24h           : number; // string;
  volume24h             : number; // string;
  fundingRate           : number; // string;
  nextFundingTime       : number; // string;
  predictedDeliveryPrice: number; // string;
  basisRate             : number; // string;
  deliveryFeeRate       : number; // string;
  deliveryTime          : string;
  ask1Size              : number; // string;
  bid1Price             : number; // string;
  ask1Price             : number; // string;
  bid1Size              : number; // string;
};

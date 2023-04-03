export type CoinStatsDto = {
  id: string;
  symbol: string;
  name: string;
  market_price: {
    [key: string]: {
      low: number;
      high: number;
      average: number;
    };
  };
  market_cap: {
    [key: string]: {
      low: number;
      high: number;
      average: number;
    };
  };
};

export type CoinDayStats = {
  id: string;
  symbol: string;
  name: string;
  localization: {
    [key: string]: string;
  };
  image: {
    thumb: string;
    small: string;
  };
  market_data: {
    current_price: {
      [key: string]: number;
    };
    market_cap: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
  };
};

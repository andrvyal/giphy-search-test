export interface BaseConfig {
  apiKey: string;
  apiUrl: string;
  debounceInterval: number;
  pageSize: number;
  paginationSize: number;
  searchApi: string;
  trendingApi: string;
}

export interface EnvironmentConfig extends BaseConfig {
  production: boolean;
}

export interface BaseConfig {
  apiKey: string;
  apiUrl: string;
  pageSize: number;
  paginationSize: number;
  searchApi: string;
}

export interface EnvironmentConfig extends BaseConfig {
  production: boolean;
}

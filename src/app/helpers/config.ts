export interface BaseConfig {
  apiKey: string;
  apiUrl: string;
  pageSize: number;
  searchApi: string;
}

export interface EnvironmentConfig extends BaseConfig {
  production: boolean;
}

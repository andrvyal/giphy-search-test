import { EnvironmentConfig } from '../app/helpers/config';
import { baseConfig } from './base';

export const environment: EnvironmentConfig = {
  ...baseConfig,
  production: true,
};

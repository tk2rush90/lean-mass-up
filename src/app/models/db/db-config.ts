import {DbStoreConfig} from './db-store-config';

export interface DbConfig {
  name: string;
  version: number;
  storeConfigs: DbStoreConfig[];
}

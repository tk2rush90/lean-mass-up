import {DbColumnConfig} from './db-column-config';

export interface DbStoreConfig {
  name: string;
  options: IDBObjectStoreParameters;
  columns: DbColumnConfig[];
}

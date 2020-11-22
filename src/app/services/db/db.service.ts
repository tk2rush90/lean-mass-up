import { Injectable } from '@angular/core';
import {INDEXED_DB_CONFIG} from '../../config/db.config';
import {fromPromise} from 'rxjs/internal-compatibility';
import {Observable} from 'rxjs';
import {DbStoreKeyMap} from '../../models/db/db-store-key-map';
import {DbError} from '../../models/db/db-error';
import {DbStoreConfig} from '../../models/db/db-store-config';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  // opened database
  private _db: IDBDatabase;
  // indexed db configuration
  private _config = INDEXED_DB_CONFIG;
  // db open request
  private _request: IDBOpenDBRequest;
  // db store key map
  private _keyMap: DbStoreKeyMap = {};

  constructor() {
    this._createStoreKeyMap();
  }

  /**
   * create store key map to get key name when starting transaction
   */
  private _createStoreKeyMap(): void {
    this._keyMap = {};

    this._config.storeConfigs.forEach(config => {
      this._keyMap[config.name] = config.options.keyPath as string;
    });
  }

  /**
   * connect to indexed db
   */
  connect(): Observable<void> {
    const promise = new Promise<void>((resolve, reject) => {
      this._request = indexedDB.open(this._config.name, this._config.version);

      // handle upgrade event
      this._request.addEventListener('upgradeneeded', () => {
        this._db = this._request.result;
        this._upgradeDB();
      });

      // handle success event
      this._request.addEventListener('success', () => {
        this._db = this._request.result;
        resolve();
      });

      // handle error event
      this._request.addEventListener('error', () => {
        reject();
      });
    });

    return fromPromise<void>(promise);
  }

  /**
   * upgrade db
   */
  private _upgradeDB(): void {
    this._config.storeConfigs.forEach(config => this._createStore(config));
  }

  /**
   * create store
   * @param config configuration
   */
  private _createStore(config: DbStoreConfig): void {
    // create store object
    const store = this._db.createObjectStore(config.name, config.options);

    // create indices for store
    config.columns.forEach(column => {
      store.createIndex(column.name, column.keyPath, {
        unique: column.unique,
      });
    });
  }

  /**
   * get data by key
   * @param store store name
   * @param key key value
   */
  getByKey<T>(store: string, key: string): Observable<T> {
    const promise = new Promise<T>((resolve, reject) => {
      try {
        const request = this.getStore(store).get(key);

        request.addEventListener('success', () => {
          resolve(request.result);
        });

        request.addEventListener('error', () => {
          reject(new DbError('에러가 발생했습니다'));
        });
      } catch (e) {
        reject(e);
      }
    });

    return fromPromise<T>(promise);
  }

  /**
   * get data by index
   * @param store store
   * @param index index
   * @param values values
   */
  getByIndex<T>(store: string, index: string, values: string | string[]): Observable<T> {
    const promise = new Promise<T>((resolve, reject) => {
      try {
        const request = this.getStore(store).index(index).get(values);

        request.addEventListener('success', () => {
          resolve(request.result);
        });

        request.addEventListener('error', () => {
          reject(new DbError('에러가 발생했습니다'));
        });
      } catch (e) {
        reject(e);
      }
    });

    return fromPromise<T>(promise);
  }

  /**
   * get all data by key
   * @param store store
   * @param index index
   * @param values index values
   */
  getAllByIndex<T>(store: string, index: string, values: string | string[]): Observable<T[]> {
    const promise = new Promise<T[]>((resolve, reject) => {
      try {
        const request = this.getStore(store).index(index).getAll(values);

        request.addEventListener('success', () => {
          resolve(request.result);
        });

        request.addEventListener('error', () => {
          reject(new DbError('에러가 발생했습니다'));
        });
      } catch (e) {
        reject(e);
      }
    });

    return fromPromise<T[]>(promise);
  }

  /**
   * add the data to store
   * @param store store name
   * @param data data to append
   */
  add<T>(store: string, data: T): Observable<void> {
    const promise = new Promise<void>((resolve, reject) => {
      try {
        const request = this.getStore(store).add(data);

        request.addEventListener('success', () => {
          resolve();
        });

        request.addEventListener('error', () => {
          reject(new DbError('에러가 발생했습니다'));
        });
      } catch (e) {
        reject(e);
      }
    });

    return fromPromise<void>(promise);
  }

  /**
   * update the data from store
   * @param store store name
   * @param data data to update
   */
  update<T>(store: string, data: T): Observable<void> {
    const promise = new Promise<void>((resolve, reject) => {
      try{
        const request = this.getStore(store).put(data);

        request.addEventListener('success', () => {
          resolve();
        });

        request.addEventListener('error', () => {
          reject(new DbError('에러가 발생했습니다'));
        });
      } catch (e) {
        reject(e);
      }
    });

    return fromPromise<void>(promise);
  }

  /**
   * delete data from db
   * @param store store name
   * @param id data id to delete
   */
  delete<T>(store: string, id: string): Observable<void> {
    const promise = new Promise<void>((resolve, reject) => {
      try {
        const request = this.getStore(store).delete(id);

        request.addEventListener('success', () => {
          resolve();
        });

        request.addEventListener('error', () => {
          reject(new DbError('에러가 발생했습니다'));
        });
      } catch (e) {
        reject(e);
      }
    });

    return fromPromise<void>(promise);
  }

  /**
   * get store to start transaction
   * @param name store name
   */
  getStore(name: string): IDBObjectStore {
    return this._db
      .transaction(name, 'readwrite')
      .objectStore(name);
  }
}

import { Injectable } from '@angular/core';
import {getFromLocalStorage, setToLocalStorage} from '../../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // user id key
  private readonly _userId = 'lmu-user-id';

  constructor() { }

  /**
   * set user id to local storage
   * @param id id
   */
  set userId(id: string) {
    setToLocalStorage(this._userId, id);
  }

  /**
   * get user id from local storage
   */
  get userId(): string {
    return getFromLocalStorage(this._userId);
  }
}

import { Injectable } from '@angular/core';
import {DbService} from '../db/db.service';
import {Observable} from 'rxjs';
import {IUserData, UserData} from '../../models/data/user-data';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // store name
  private readonly _store = 'User';

  constructor(
    private dbService: DbService,
  ) { }

  /**
   * add user data to db
   * @param user user data
   */
  addUser(user: UserData): Observable<void> {
    return this.dbService.add(this._store, user);
  }

  /**
   * get user data by id
   * @param id user id
   */
  getUser(id: string): Observable<UserData> {
    return this.dbService.getByKey<IUserData>(this._store, id)
      .pipe(map(res => {
        return res ? new UserData(res) : null;
      }));
  }

  /**
   * update user data
   * @param user user data
   */
  updateUser(user: UserData): Observable<void> {
    return this.dbService.update(this._store, user);
  }
}

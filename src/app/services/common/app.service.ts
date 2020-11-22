import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserData} from '../../models/data/user-data';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // user subject
  private _user$: BehaviorSubject<UserData> = new BehaviorSubject<UserData>(null);

  constructor() { }

  get user$(): Observable<UserData> {
    return this._user$.asObservable();
  }

  set user(user: UserData) {
    this._user$.next(user);
  }
}

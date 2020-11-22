import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AppService} from '../services/common/app.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appService: AppService,
  ) {
  }

  /**
   * the page will be activated when user data is successfully loaded
   */
  canActivate(): Observable<boolean> {
    return this.appService.user$
      .pipe(map(res => {
        if (!res) {
          this.router.navigate(['/landing']);
        }

        return !!res;
      }));
  }
}

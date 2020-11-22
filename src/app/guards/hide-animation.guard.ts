import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {HideAnimatingComponent} from '../components/base/hide-animating/hide-animating.component';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HideAnimationGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: HideAnimatingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    component.startLeavingAnimation();
    return component.leavingAnimationEnd.pipe(map(() => {
      return true;
    }));
  }
}

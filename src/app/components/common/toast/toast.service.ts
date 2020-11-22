import { Injectable } from '@angular/core';
import {ToastOutletComponent} from './toast-outlet/toast-outlet.component';
import {Toast, ToastType} from './models/toast';
import {randomKey} from '../../../utils/random.util';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // registered toast outlets
  // `k` is outlet unique key
  private _outlets: {[k: string]: ToastOutletComponent} = {};
  // created toast objects
  // `k` is opened toast key
  private _toasts: {[k: string]: Toast[]} = {};
  // subscriptions for created toast objects
  // `k` is opened toast key
  private _subscriptions: {[k: string]: Subscription[]} = {};

  constructor() { }

  /**
   * register toast outlet
   * @param outlet toast outlet
   */
  registerOutlet(outlet: ToastOutletComponent): void {
    this._outlets[outlet.key] = outlet;
  }

  /**
   * open toast for all registered outlets
   * @param type toast type
   * @param message message
   */
  open(type: ToastType, message: string): void {
    // close all before open new one
    this._closeAllOpenedToasts();

    const toastKey = randomKey();

    this._toasts[toastKey] = Object.keys(this._outlets).map(key => {
      return new Toast(this._outlets[key], toastKey, type, message);
    });

    this._subscribeToastCloses(toastKey);
  }

  /**
   * close all opened toasts
   */
  private _closeAllOpenedToasts(): void {
    Object.keys(this._toasts).forEach(key => {
      (this._toasts[key] || []).forEach(toast => toast.destroyToast());
    });
  }

  /**
   * subscribe close emitter for all created toast with the key
   * @param toastKey toast key
   */
  private _subscribeToastCloses(toastKey: string): void {
    this._subscriptions[toastKey] = this._toasts[toastKey]
      .map(toast => toast.toastClose.subscribe(() => {
        this._destroyToasts(toastKey);
      }));
  }

  /**
   * destroy all toasts by toast key
   * @param toastKey toast key
   */
  private _destroyToasts(toastKey: string): void {
    this._toasts[toastKey].forEach(toast => toast.destroyToast());
    this._subscriptions[toastKey].forEach(subscription => subscription.unsubscribe());
    this._toasts[toastKey] = null;
    this._subscriptions[toastKey] = null;
  }
}

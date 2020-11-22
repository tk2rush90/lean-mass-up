import {ToastOutletComponent} from '../toast-outlet/toast-outlet.component';
import {ComponentRef, EventEmitter} from '@angular/core';
import {ToastWrapperComponent} from '../toast-wrapper/toast-wrapper.component';
import {ToastItemComponent} from '../toast-item/toast-item.component';
import {Subscription} from 'rxjs';

export type ToastType = 'success' | 'error';

export class Toast {
  // emit when toast close emitted from the component
  toastClose: EventEmitter<void> = new EventEmitter<void>();
  // unique key created when opened
  // every toast item which is created in same time has same key
  private _key: string;
  // toast outlet
  private _outlet: ToastOutletComponent;
  // toast wrapper
  private _wrapper: ComponentRef<ToastWrapperComponent>;
  // toast item
  private _toast: ComponentRef<ToastItemComponent>;
  // toast close subscription
  private _closeSubscription: Subscription;
  // toast destroy subscription
  private _destroySubscription: Subscription;
  // toast type
  private readonly _type: ToastType;
  // toast message
  private readonly _message: string;

  constructor(outlet: ToastOutletComponent, key: string, type: ToastType, message: string) {
    this._outlet = outlet;
    this._key = key;
    this._type = type;
    this._message = message;
    this.render();
  }

  /**
   * render the toast message
   */
  render(): void {
    this._createWrapper();
    this._createToast();
    this._subscribeToastClosed();
    this._subscribeToastDestroyed();
  }

  /**
   * create toast message wrapper
   */
  private _createWrapper(): void {
    this._wrapper = this._outlet.createWrapper();
    this._wrapper.changeDetectorRef.detectChanges();
  }

  /**
   * create toast item in wrapper
   */
  private _createToast(): void {
    this._toast = this._wrapper.instance.createMessageItem();
    this._toast.instance.type = this._type;
    this._toast.instance.message = this._message;
    this._toast.changeDetectorRef.detectChanges();
  }

  /**
   * subscribe toast closed event
   */
  private _subscribeToastClosed(): void {
    this._closeSubscription = this._toast.instance.toastClose
      .subscribe(() => this.toastClose.emit());
  }

  /**
   * destroy wrapper after toast destroyed
   */
  private _subscribeToastDestroyed(): void {
    this._destroySubscription = this._toast.instance.destroyed
      .subscribe(() => {
        this._wrapper.destroy();
        this._closeSubscription.unsubscribe();
      });
  }

  /**
   * destroy toast
   */
  destroyToast(): void {
    this._toast.destroy();
  }
}

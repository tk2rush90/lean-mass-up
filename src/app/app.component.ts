import { Component } from '@angular/core';
import {DbService} from './services/db/db.service';
import {SubscriptionService} from './services/subscription/subscription.service';
import {ToastService} from './components/common/toast/toast.service';
import {UserDataService} from './services/data/user-data.service';
import {AppService} from './services/common/app.service';
import {StorageService} from './services/common/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    SubscriptionService,
  ],
})
export class AppComponent {
  // set `true` when database is ready
  ready = false;

  constructor(
    private dbService: DbService,
    private appService: AppService,
    private toastService: ToastService,
    private storageService: StorageService,
    private userDataService: UserDataService,
    private subscriptionService: SubscriptionService,
  ) {
    this._connectToDb();
  }

  /**
   * connect to indexed db
   */
  private _connectToDb(): void {
    const sub = this.dbService.connect()
      .subscribe({
        next: () => {
          if (this.storageService.userId) {
            this._getUserData();
          } else {
            this.ready = true;
          }
        },
        error: () => this.toastService.open('error', '잠시 후 다시 시도해주세요'),
      });

    this.subscriptionService.store('_connectToDb', sub);
  }

  /**
   * get user data from db and save to app service
   */
  private _getUserData(): void {
    const sub = this.userDataService
      .getUser(this.storageService.userId)
      .subscribe({
        next: res => {
          this.appService.user = res;
          this.ready = true;
        },
        error: err => {
          this.toastService.open('error', err.message);
        },
      });

    this.subscriptionService.store('_getUserData', sub);
  }
}

import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {randomKey} from '../../../../utils/random.util';
import {ToastWrapperComponent} from '../toast-wrapper/toast-wrapper.component';
import {ToastService} from '../toast.service';

@Component({
  selector: 'app-toast-outlet',
  templateUrl: './toast-outlet.component.html',
  styleUrls: ['./toast-outlet.component.scss']
})
export class ToastOutletComponent implements OnInit {
  // view container ref
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  // random key for toast outlet
  key = randomKey();

  constructor(
    private toastService: ToastService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this._registerOutlet();
  }

  /**
   * register current outlet to service
   */
  private _registerOutlet(): void {
    this.toastService.registerOutlet(this);
  }

  /**
   * create wrapper component for toast
   */
  createWrapper(): ComponentRef<ToastWrapperComponent> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ToastWrapperComponent);

    return this.container.createComponent(factory);
  }
}

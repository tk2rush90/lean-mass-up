import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ToastItemComponent} from '../toast-item/toast-item.component';

@Component({
  selector: 'app-toast-wrapper',
  templateUrl: './toast-wrapper.component.html',
  styleUrls: ['./toast-wrapper.component.scss']
})
export class ToastWrapperComponent implements OnInit {
  // view container ref
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
  }

  /**
   * create toast message item
   */
  createMessageItem(): ComponentRef<ToastItemComponent> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ToastItemComponent);

    return this.container.createComponent(factory);
  }
}

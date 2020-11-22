import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {WaveBackgroundPageComponent} from '../../components/base/wave-background-page/wave-background-page.component';
import {Router} from '@angular/router';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {ManageFormComponent} from '../../components/manage/manage-form/manage-form.component';
import {MANAGE_WAVE_COLOR} from '../../constants/common';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: [
    '../form-page-base/form-page-base.component.scss',
    './manage.component.scss',
  ]
})
export class ManageComponent extends WaveBackgroundPageComponent<ManageFormComponent> implements OnInit, AfterViewInit {
  // manage form ref
  @ViewChild(ManageFormComponent, {read: ElementRef}) manageFormRef: ElementRef<HTMLElement>;
  // wave color
  waveColor = MANAGE_WAVE_COLOR;

  constructor(
    protected router: Router,
    protected renderer: Renderer2,
    protected subscriptionService: SubscriptionService,
  ) {
    super(router, renderer, subscriptionService);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._formRef = this.manageFormRef;
    super.ngAfterViewInit();
  }
}

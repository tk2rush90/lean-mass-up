import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {WaveBackgroundPageComponent} from '../../components/base/wave-background-page/wave-background-page.component';
import {Router} from '@angular/router';
import {SubscriptionService} from '../../services/subscription/subscription.service';
import {RecordFormComponent} from '../../components/record/record-form/record-form.component';
import {RECORD_WAVE_COLOR} from '../../constants/common';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: [
    '../form-page-base/form-page-base.component.scss',
    './record.component.scss',
  ]
})
export class RecordComponent extends WaveBackgroundPageComponent<RecordFormComponent> implements OnInit, AfterViewInit {
  // record form element ref
  @ViewChild(RecordFormComponent, {read: ElementRef}) recordFormRef: ElementRef<HTMLElement>;
  // wave color
  waveColor = RECORD_WAVE_COLOR;

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
    this._formRef = this.recordFormRef;
    super.ngAfterViewInit();
  }
}

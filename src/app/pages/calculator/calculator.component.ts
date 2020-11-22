import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CALCULATOR_WAVE_COLOR} from '../../constants/common';
import {CalculatorFormComponent} from '../../components/calculator/calculator-form/calculator-form.component';
import {WaveBackgroundPageComponent} from '../../components/base/wave-background-page/wave-background-page.component';
import {Router} from '@angular/router';
import {SubscriptionService} from '../../services/subscription/subscription.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: [
    '../form-page-base/form-page-base.component.scss',
    './calculator.component.scss',
  ],
  providers: [
    SubscriptionService,
  ],
})
export class CalculatorComponent extends WaveBackgroundPageComponent<CalculatorFormComponent> implements OnInit, AfterViewInit {
  // calculator form component as elementRef
  @ViewChild(CalculatorFormComponent, {read: ElementRef}) calculatorFormRef: ElementRef<HTMLElement>;
  // wave color
  waveColor = CALCULATOR_WAVE_COLOR;

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
    this._formRef = this.calculatorFormRef;
    super.ngAfterViewInit();
  }
}

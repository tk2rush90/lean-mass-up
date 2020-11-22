import {ChangeDetectorRef, Component, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../../../base/form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-protein-ratio',
  templateUrl: './protein-ratio.component.html',
  styleUrls: ['./protein-ratio.component.scss']
})
export class ProteinRatioComponent extends FormControlBaseDirective<number> implements OnInit {
  // value
  value: number;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit(): void {
  }

  /**
   * write value to component
   * @param value value
   */
  writeValue(value: number): void {
    this.value = value;
  }
}

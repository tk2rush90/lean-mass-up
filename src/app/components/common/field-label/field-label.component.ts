import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type FieldLabelAlign = 'center' | 'left';

@Component({
  selector: 'app-field-label',
  templateUrl: './field-label.component.html',
  styleUrls: ['./field-label.component.scss']
})
export class FieldLabelComponent implements OnInit {
  @Input() ko: string;
  @Input() en: string;
  // set field label alignment
  @Input() @HostBinding('attr.lmu-alignment') alignment: FieldLabelAlign;

  constructor() { }

  ngOnInit(): void {
  }

}

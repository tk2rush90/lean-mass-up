import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';

export type LabeledButtonColor = 'blue' | 'grey' | 'red';

@Component({
  selector: 'app-labeled-button',
  templateUrl: './labeled-button.component.html',
  styleUrls: ['./labeled-button.component.scss']
})
export class LabeledButtonComponent implements OnInit {
  // Korean label
  @Input() ko: string;
  // English label
  @Input() en: string;
  // bind color property
  @Input() @HostBinding('attr.lmu-color') color: LabeledButtonColor = 'blue';
  // emit when `button` element clicked
  // the parent component must bind `click` event to this emitter
  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}

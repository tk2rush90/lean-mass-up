import {Directive, HostBinding, Input} from '@angular/core';

export type InlineButtonColor = 'black' | 'white' | 'grey-blue' | 'grey-red';

@Directive({
  selector: '[appInlineButton]'
})
export class InlineButtonDirective {
  // color for inline button
  @Input() @HostBinding('attr.lmu-color') color: InlineButtonColor;
  // set inline button default class
  @HostBinding('class.lmu-inline-button') inlineButtonClass = true;

  constructor() { }

}

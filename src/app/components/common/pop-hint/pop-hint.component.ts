import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pop-hint',
  templateUrl: './pop-hint.component.html',
  styleUrls: ['./pop-hint.component.scss'],
})
export class PopHintComponent implements OnInit {
  // hint in korean
  @Input() ko: string;
  // hint in english
  @Input() en: string;

  constructor() { }

  ngOnInit(): void {
  }

}

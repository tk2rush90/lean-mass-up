import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-required-calories',
  templateUrl: './required-calories.component.html',
  styleUrls: ['./required-calories.component.scss']
})
export class RequiredCaloriesComponent implements OnInit {
  // required calories
  @Input() calories = 0;

  constructor() { }

  ngOnInit(): void {
  }

}

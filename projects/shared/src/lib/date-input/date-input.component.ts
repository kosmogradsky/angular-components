import { Component, EventEmitter, Input, Output } from '@angular/core';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

const minYear = 1990;
const maxYear = 2099;

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})

export class DateInputComponent {
  @Input() date: string;
  @Output() dateChange = new EventEmitter<string>();
  textMask = {
    mask: [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/],
    pipe: createAutoCorrectedDatePipe('dd/mm/yyyy', {minYear: minYear, maxYear: maxYear}),
    placeholderChar: '-',
    showMask: true,
    keepCharPositions: true
  };
}

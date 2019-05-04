import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart-dropdown',
  templateUrl: './chart-dropdown.component.html',
  styleUrls: ['./chart-dropdown.component.scss']
})
export class ChartDropdownComponent {
  @ViewChild('elementRef', { read: ElementRef }) elementRef: ElementRef;
  @Input() chartTitle: string;
  @Input() reportSubjectName = '';
  @Input() isLoading: boolean;
  isOpen = true;

  constructor() { }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  get subjectName() {
    if (!this.reportSubjectName) {
      return '';
    }
    return this.reportSubjectName.length > 42 ? `${this.reportSubjectName.slice(0, 40)}... ` : this.reportSubjectName;
  }
}

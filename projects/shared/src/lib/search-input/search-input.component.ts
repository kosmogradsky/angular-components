import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})

export class SearchInputComponent {
  @Input() placeholder = '';
  @Input() thin = false;
  @Input() loadingProgress: number;
  @Input() isLoading: boolean;
  @Input() hasClearButton: boolean;
  @Input() value: string;
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() enter = new EventEmitter();
  @Output() search = new EventEmitter();
  @ViewChild('input') inputRef: ElementRef;

  enterValue(event: KeyboardEvent) {
    event.stopPropagation();

    this.enter.emit();
    this.search.emit(this.value);
  }

  runSearch() {
    this.search.emit(this.value);
    return false;
  }
}


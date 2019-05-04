import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ribbon-loader',
  templateUrl: './ribbon-loader.component.html',
  styleUrls: ['./ribbon-loader.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RibbonLoaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() progress = 0;

  @HostBinding('style.opacity')
  get opacity() {
    return this.isLoading ? 1 : 0;
  }

  constructor() { }

  ngOnInit() {
  }

}

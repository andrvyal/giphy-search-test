import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from '../../../environments/environment';
import { GiphyGif } from '../../helpers/giphy';

@Component({
  selector: 'gst-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() gifs: Array<GiphyGif> | undefined;
  @Input() pagination: boolean = true;
  @Input() total: number = 0;

  @Input() page: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  pageSize: number = environment.pageSize;
  paginationSize: number = environment.paginationSize;

  constructor() {}

  ngOnInit(): void {}

  setPage(page: number): void {
    this.page = page;
    this.pageChange.emit(this.page);
  }
}

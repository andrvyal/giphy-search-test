import { Component, Input, OnInit } from '@angular/core';

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

  page: number = 1;
  pageSize: number = 9;
  paginationSize: number = environment.paginationSize;
  total: number = 80;

  constructor() {}

  ngOnInit(): void {}
}

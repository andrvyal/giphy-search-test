import { Component, OnInit } from '@angular/core';
import { GiphyGif } from 'src/app/helpers/giphy';

import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'gst-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  gifs: Array<GiphyGif> | undefined;
  query: string = '';

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    this.search();
  }

  async search(): Promise<void> {
    this.gifs = await this.giphyService.search(this.query);
  }
}

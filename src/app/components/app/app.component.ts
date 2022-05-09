import { Component, OnInit } from '@angular/core';

import { GiphyGif } from '../../helpers/giphy';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'gst-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  gifs: Array<GiphyGif> | undefined;

  constructor(private giphyService: GiphyService) {}

  async ngOnInit(): Promise<void> {
    this.gifs = await this.giphyService.search('iron man');
  }
}

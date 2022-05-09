import { Component } from '@angular/core';

import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'gst-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private giphyService: GiphyService) {
    this.giphyService.search('iron man');
  }
}

import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GiphyGif } from '../../helpers/giphy';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'gst-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  gifs: Array<GiphyGif> | undefined;
  query: string = '';
  private inputSubject: Subject<string> = new Subject();

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    // initial search
    this.giphyService.search(this.query).subscribe((gifs: Array<GiphyGif>) => {
      this.gifs = gifs;
    });

    // handle query input
    this.inputSubject
      .pipe(
        debounceTime(environment.debounceInterval),
        switchMap((query: string) => {
          return this.giphyService.search(query);
        }),
      )
      .subscribe((gifs: Array<GiphyGif>) => {
        this.gifs = gifs;
      });
  }

  handleInput(): void {
    this.inputSubject.next(this.query);
  }
}

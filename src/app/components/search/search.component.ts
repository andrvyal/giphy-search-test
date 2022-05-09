import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GiphyGif, GiphySearchResults } from '../../helpers/giphy';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'gst-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  gifs: Array<GiphyGif> | undefined;
  loading: boolean = false;
  private inputSubject: Subject<string> = new Subject();
  page: number = 1;
  query: string = '';
  total: number = 0;

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    // initial search
    this.search();

    // handle query input
    this.inputSubject
      .pipe(
        debounceTime(environment.debounceInterval),
        switchMap((query: string) => {
          return this.giphyService.search(query);
        }),
      )
      .subscribe((results: GiphySearchResults<GiphyGif>) => {
        this.handleSearchResults(results);
      });
  }

  handleInput(): void {
    this.loading = true;
    this.page = 1;

    this.inputSubject.next(this.query);
  }

  handlePageChange(): void {
    this.search();
  }

  private handleSearchResults(results: GiphySearchResults<GiphyGif>): void {
    this.gifs = results.data;
    this.total = results.pagination.total_count;

    this.loading = false;
  }

  private search(): void {
    this.loading = true;
    this.giphyService.search(this.query, this.page).subscribe((results: GiphySearchResults<GiphyGif>) => {
      this.handleSearchResults(results);
    });
  }
}

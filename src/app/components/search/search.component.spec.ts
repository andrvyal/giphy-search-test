import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GiphyGif, GiphyImage, GiphySearchResults } from 'src/app/helpers/giphy';
import { GiphyService } from 'src/app/services/giphy.service';
import { environment } from 'src/environments/environment';

import { SearchComponent } from './search.component';

@Component({
  selector: 'gst-search-results',
  template: '',
})
class MockSearchResultsComponent {
  @Input() gifs: Array<GiphyGif> = [];
  @Input() pagination: boolean = true;
  @Input() total: number = 1;
  @Input() page: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let giphyServiceStub: Partial<GiphyService> = {
    search: (query: string, page: number = 1): Observable<GiphySearchResults<GiphyGif>> => {
      const imgProps: GiphyImage = {
        height: 1,
        mp4: 'mp4',
        mp4_size: 1,
        size: 1,
        url: 'url',
        webp: 'webp',
        webp_size: 1,
        width: 1,
      };

      const results: GiphySearchResults<GiphyGif> = {
        data:
          page === 1
            ? [
                {
                  embed_url: 'embed_url',
                  id: 'id',
                  images: {
                    fixed_height: imgProps,
                    fixed_width: imgProps,
                    original: imgProps,
                  },
                  url: '',
                },
              ]
            : [],
        pagination: {
          total_count: 1,
          count: 1,
          offset: page === 1 ? 0 : 1,
        },
        meta: {
          status: 200,
          msg: 'Success',
          response_id: '',
        },
      };

      return of(results);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, MockSearchResultsComponent],
      imports: [FormsModule],
      providers: [{ provide: GiphyService, useValue: giphyServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle user input', fakeAsync(() => {
    component.query = 't';
    component.handleInput();
    component.query = 'te';
    component.handleInput();
    component.query = 'tes';
    component.handleInput();
    component.query = 'test';
    component.handleInput();

    tick(environment.debounceInterval + 100);
    expect(component.gifs?.length).toEqual(1);
  }));

  it('should handle page change', () => {
    component.page = 2;
    component.handlePageChange();

    expect(component.gifs?.length).toEqual(0);
  });
});

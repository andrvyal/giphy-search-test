import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { GiphyGif, GiphySearchResults } from 'src/app/helpers/giphy';
import { GiphyService } from 'src/app/services/giphy.service';

import { SearchComponent } from './search.component';

@Component({
  selector: 'gst-search-results',
  template: '',
})
class MockSearchResultsComponent {}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  let userServiceStub: Partial<GiphyService> = {
    search: (query: string, page: number = 1): Observable<GiphySearchResults<GiphyGif>> => {
      return of({
        data: [],
        pagination: {
          total_count: 0,
          count: 0,
          offset: 0,
        },
        meta: {
          status: 200,
          msg: 'Success',
          response_id: '',
        },
      });
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, MockSearchResultsComponent],
      imports: [FormsModule],
      providers: [{ provide: GiphyService, useValue: userServiceStub }],
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
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GiphyService } from './giphy.service';

describe('GiphyService', () => {
  let service: GiphyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GiphyService],
    });
    service = TestBed.inject(GiphyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

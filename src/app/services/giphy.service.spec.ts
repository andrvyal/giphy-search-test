import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { GiphyService } from './giphy.service';
import { QueryMap } from '../helpers/api';
import { environment } from 'src/environments/environment';
import { GiphyGif, GiphyImage, GiphySearchResults } from '../helpers/giphy';

describe('GiphyService', () => {
  let service: GiphyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GiphyService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(GiphyService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build url query', () => {
    const queryMap: QueryMap = {
      testKey: 'test value',
    };

    const urlQuery: string = service['buildQuery'](queryMap);
    const target: string = `api_key=${encodeURIComponent(environment.apiKey)}&testKey=${encodeURIComponent(
      queryMap['testKey'],
    )}`;

    expect(urlQuery).toEqual(target);
  });

  it('should retrieve trending', () => {
    const queryMap: QueryMap = {
      limit: environment.pageSize,
      offset: 0,
    };

    const urlQuery: string = service['buildQuery'](queryMap);
    service.search('').subscribe();

    const request: TestRequest = httpTestingController.expectOne(
      `${environment.apiUrl}${environment.trendingApi}?${urlQuery}`,
    );

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
      data: [
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
      ],
      pagination: {
        total_count: 1,
        count: 1,
        offset: 0,
      },
      meta: {
        status: 200,
        msg: 'Success',
        response_id: '',
      },
    };

    expect(request.request.method).toEqual('GET');
    request.flush(results);
  });

  it('should retrieve search results', () => {
    const query: string = 'test';
    const queryMap: QueryMap = {
      limit: environment.pageSize,
      offset: 0,
      q: query,
    };

    const urlQuery: string = service['buildQuery'](queryMap);
    service.search(query).subscribe();

    const request: TestRequest = httpTestingController.expectOne(
      `${environment.apiUrl}${environment.searchApi}?${urlQuery}`,
    );

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
      data: [
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
      ],
      pagination: {
        total_count: 1,
        count: 1,
        offset: 0,
      },
      meta: {
        status: 200,
        msg: 'Success',
        response_id: '',
      },
    };

    expect(request.request.method).toEqual('GET');
    request.flush(results);
  });
});

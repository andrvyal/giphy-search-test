import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { QueryMap } from '../helpers/api';
import { GiphyGif, GiphySearchResults } from '../helpers/giphy';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(private http: HttpClient) {}

  private buildQuery(params: QueryMap): string {
    const apiParams: QueryMap = {
      api_key: environment.apiKey,
      ...params,
    };

    const pairs: Array<string> = Object.entries(apiParams).map(([name, value]: [string, string | number]): string => {
      const pair: string = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      return pair;
    });

    return pairs.join('&');
  }

  search(query: string, page: number = 0): Observable<Array<GiphyGif>> {
    const params: QueryMap = {
      q: query,
      limit: environment.pageSize,
      offset: environment.pageSize * page,
    };

    if (query) {
      params['q'] = query;
    }

    const urlQuery: string = this.buildQuery(params);

    return this.http
      .get<GiphySearchResults<GiphyGif>>(
        `${environment.apiUrl}${query ? environment.searchApi : environment.trendingApi}?${urlQuery}`,
      )
      .pipe(
        map((results: GiphySearchResults<GiphyGif>): Array<GiphyGif> => {
          return results.data;
        }),
      );
  }
}

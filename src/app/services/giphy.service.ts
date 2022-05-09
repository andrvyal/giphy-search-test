import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { QueryMap } from '../helpers/api';
import { GiphyGif, GiphySearchResults } from '../helpers/giphy';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(private apiService: ApiService) {}

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

  async search(query: string, page: number = 0): Promise<Array<GiphyGif>> {
    const params: QueryMap = {
      q: query,
      limit: environment.pageSize,
      offset: environment.pageSize * page,
    };

    if (query) {
      params['q'] = query;
    }

    const urlQuery: string = this.buildQuery(params);

    const results: GiphySearchResults<GiphyGif> = await this.apiService.get<GiphySearchResults<GiphyGif>>(
      `${environment.apiUrl}${query ? environment.searchApi : environment.trendingApi}?${urlQuery}`,
    );

    return results.data;
  }
}

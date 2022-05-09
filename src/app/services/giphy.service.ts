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

  async search(q: string, page: number = 0): Promise<Array<GiphyGif>> {
    const urlQuery: string = this.buildQuery({
      q,
      limit: environment.pageSize,
      offset: environment.pageSize * page,
    });

    const results: GiphySearchResults<GiphyGif> = await this.apiService.get<GiphySearchResults<GiphyGif>>(
      `${environment.apiUrl}${environment.searchApi}?${urlQuery}`,
    );

    return results.data;
  }
}

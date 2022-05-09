import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { QueryMap } from '../helpers/api';
import { Gif, SearchResults } from '../helpers/giphy';
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

  async search(q: string, page: number = 0): Promise<Array<Gif>> {
    const urlQuery: string = this.buildQuery({
      q,
      limit: environment.pageSize,
      offset: environment.pageSize * page,
    });

    const results: SearchResults<Gif> = await this.apiService.get<SearchResults<Gif>>(
      `${environment.apiUrl}${environment.searchApi}?${urlQuery}`,
    );

    return results.data;
  }
}

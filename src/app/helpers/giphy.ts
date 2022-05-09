export interface Gif {
  embed_url: string;
  id: string;
  url: string;
}

export interface SearchResults<T> {
  data: Array<T>;
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

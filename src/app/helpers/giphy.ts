export interface GiphyGif {
  embed_url: string;
  id: string;
  images: {
    fixed_height: GiphyImage;
    fixed_width: GiphyImage;
    original: GiphyImage;
  };
  url: string;
}

export interface GiphySearchResults<T> {
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

export interface GiphyImage {
  height: number;
  width: number;
  size: number;
  url: string;
  mp4_size: number;
  mp4: string;
  webp_size: number;
  webp: string;
}

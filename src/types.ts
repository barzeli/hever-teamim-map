export interface PlaceResponse {
  img: string;
  name: string;
  desc: string;
  area: string;
  city: string;
  address: string;
  phone: string;
  category: string;
  type: string;
  hours: string;
  kosher: string;
  handicap: string;
  website: string;
  delivery: string;
  internal_link: string;
  is_new: string;
  search_words: string;
  latitude: string;
  longitude: string;
}

export interface APIResponse {
  branch: PlaceResponse[];
}

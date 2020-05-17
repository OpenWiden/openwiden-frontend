export interface FetchingData<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

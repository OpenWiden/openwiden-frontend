export interface Data<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[] | [];
}

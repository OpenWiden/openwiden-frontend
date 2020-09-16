/**
 * Type for default fetching data structure with pagination
 */
export interface FetchingDataWithPagination<T> {
  /** Count of fetched items */
  count: number;

  /** URI for fetching next part of data */
  next?: string;

  /** URI for fetching previous part of data */
  previous?: string;

  results: T[];
}

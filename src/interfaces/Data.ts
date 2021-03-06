/**
 * These types describe data which stores in the components
 */

export type DATA_STATUSES =
  | 'notAsked'
  | 'loading'
  | 'loaded'
  | 'failed'
  | 'idle';

export const DATA_STATUS: Record<string, DATA_STATUSES> = {
  NOT_ASKED: 'notAsked',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
  IDLE: 'idle',
};

export interface Data<T> {
  /** For handling data status in components. For example, show preloader */
  loadingStatus: DATA_STATUSES;
  errorText: string;
  data: T[] | null;
}

export const DEFAULT_DATA_OBJECT = {
  loadingStatus: DATA_STATUS.NOT_ASKED,
  errorText: '',
  data: null,
};

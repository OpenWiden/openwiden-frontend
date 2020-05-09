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
  status: DATA_STATUSES;
  errorText: string;
  data: T[] | null;
}

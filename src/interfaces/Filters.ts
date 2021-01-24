export enum Filter {
  STARS_COUNT_GTE = 'STARS_COUNT_GTE',
  OPEN_ISSUES_COUNT_GTE = 'OPEN_ISSUES_COUNT_GTE',
  FORKS_COUNT = 'FORKS_COUNT',
  PROGRAMMING_LANGUAGE = 'PROGRAMMING_LANGUAGE',
  VERSION_CONTROL_SERVICE = 'VERSION_CONTROL_SERVICE',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export interface Filters {
  [Filter.STARS_COUNT_GTE]: number | null;
  [Filter.OPEN_ISSUES_COUNT_GTE]: number | null;
  [Filter.FORKS_COUNT]: number | null;
  [Filter.PROGRAMMING_LANGUAGE]: string | null;
  [Filter.VERSION_CONTROL_SERVICE]: string | null;
  [Filter.CREATED_AT]: string | null;
  [Filter.UPDATED_AT]: string | null;
}

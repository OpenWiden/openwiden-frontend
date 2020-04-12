import { ProgrammingLanguage } from './ProgrammingLanguage';

export enum Filter {
  STAR_COUNT = 'STAR_COUNT',
  OPEN_ISSUES_COUNT = 'OPEN_ISSUES_COUNT',
  FORKS_COUNT = 'FORKS_COUNT',
  PROGRAMMING_LANGUAGE = 'PROGRAMMING_LANGUAGE',
  VERSION_CONTROL_SERVICE = 'VERSION_CONTROL_SERVICE',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}

export interface Filters {
  [Filter.STAR_COUNT]: number | null;
  [Filter.OPEN_ISSUES_COUNT]: number | null;
  [Filter.FORKS_COUNT]: number | null;
  [Filter.PROGRAMMING_LANGUAGE]: ProgrammingLanguage | null;
  [Filter.VERSION_CONTROL_SERVICE]: string | null;
  [Filter.CREATED_AT]: string | null;
  [Filter.UPDATED_AT]: string | null;
}

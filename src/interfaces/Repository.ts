/* eslint-disable camelcase */

export interface Repository {
  id?: string;
  version_control_service: string;
  name: string;
  description?: string;
  url: string;
  star_count?: number;
  open_issues_count?: number;
  forks_count?: number;
  created_at: Date;
  updated_at: Date;
  programming_languages: ProgrammingLanguage;
}

type ProgrammingLanguage = {
  [x: string]: string;
};

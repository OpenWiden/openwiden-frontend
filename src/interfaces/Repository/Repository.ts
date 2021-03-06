/* eslint-disable camelcase */
import { ProgrammingLanguage } from '../ProgrammingLanguage';

export interface RepositoryData {
  id?: string;
  vcs: string;
  name: string;
  description?: string;
  url: string;
  stars_count?: number;
  open_issues_count?: number;
  forks_count?: number;
  created_at: Date;
  updated_at: Date;
  programming_languages: ProgrammingLanguage;
}

export interface Repository {
  id?: string;
  vcs: string;
  name: string;
  description?: string;
  url: string;
  starsCount?: number;
  openIssuesCount?: number;
  forksCount?: number;
  createdAt: Date;
  updatedAt: Date;
  programmingLanguages: ProgrammingLanguage;
}

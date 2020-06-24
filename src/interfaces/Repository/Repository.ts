/* eslint-disable camelcase */
import { ProgrammingLanguage } from '../ProgrammingLanguage';

enum RepoVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  INTERNAL = 'internal',
}

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
  programming_language: ProgrammingLanguage;
  is_added?: boolean;
  visibility?: RepoVisibility;
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
  programmingLanguage: ProgrammingLanguage;
  isAdded?: boolean;
  visibility?: RepoVisibility;
}

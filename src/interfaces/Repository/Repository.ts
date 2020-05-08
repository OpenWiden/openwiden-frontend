/* eslint-disable camelcase */
import { ProgrammingLanguage } from '../ProgrammingLanguage';

export interface RepositoryData {
  id?: string;
  version_control_service: string;
  name: string;
  description?: string;
  url: string;
  stars_count?: number;
  open_issues_count?: number;
  forks_count?: number;
  created_at: Date;
  updated_at: Date;
  programming_language: ProgrammingLanguage;
}

export interface Repository {
  id?: string;
  versionControlService: string;
  name: string;
  description?: string;
  url: string;
  starsCount?: number;
  openIssuesCount?: number;
  forksCount?: number;
  createdAt: Date;
  updatedAt: Date;
  programmingLanguage: ProgrammingLanguage;
}

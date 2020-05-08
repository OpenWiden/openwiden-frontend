import {
  RepositoryData,
  Repository,
} from '@/src/interfaces/Repository/Repository';

export interface RepositoriesData {
  count: number;
  results: RepositoryData[];
  next?: string;
  previous?: string;
}

export interface Repositories {
  count: number;
  results: Repository[];
  next?: string;
  previous?: string;
}

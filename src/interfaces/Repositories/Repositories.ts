import {
  RepositoryData,
  Repository,
} from '@/src/interfaces/Repository/Repository';
import {
  UserRepositoryData,
  UserRepository,
} from '@/src/interfaces/UserRepository/UserRepository';

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

export interface UserRepositoriesData extends RepositoriesData {
  results: UserRepositoryData[];
}

export interface UserRepositories extends Repositories {
  results: UserRepository[];
}

/* eslint-disable camelcase */
import { Repository, RepositoryData } from '../Repository/Repository';

enum RepoState {
  INITIAl = 'initial',
  ADDING = 'adding',
  ADDED = 'added',
  ADD_FAILED = 'add_failed',
  REMOVING = 'removing',
  REMOVED = 'removed',
}

export interface UserRepositoryData extends RepositoryData {
  state: RepoState;
}

export interface UserRepository extends Repository {
  state: RepoState;
}

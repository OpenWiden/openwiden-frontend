/* eslint-disable camelcase */
import { Provider } from '@/src/interfaces/Provider';

interface VCSAccount {
  vcs: Provider;
  login: string;
}

export interface UserData {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  date_joined?: Date;
  avatar: string;
  vcs_accounts: VCSAccount[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  dateJoined?: Date;
  firstName?: string;
  lastName?: string;
  vcsAccounts: VCSAccount[];
}

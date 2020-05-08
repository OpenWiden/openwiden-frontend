/* eslint-disable camelcase */
import { Provider } from '@/src/interfaces/Provider';

export interface UserData {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  date_joined?: Date;
  first_name?: string;
  last_name?: string;
  password: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  last_login?: Date | null;
  user_permissions?: any[];
  oauth2_tokens: { login: string; provider: Provider }[];
  groups?: any[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  email?: string;
  dateJoined?: Date;
  firstName?: string;
  lastName?: string;
  oauth2Tokens: { login: string; provider: Provider }[];
}

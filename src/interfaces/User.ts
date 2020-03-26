/* eslint-disable camelcase */
export interface User {
  id: string;
  username: string;
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
  groups?: any[];
}

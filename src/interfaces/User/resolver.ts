/* eslint-disable camelcase */
import { UserData, User } from './User';

export default function userResolver(user: UserData): User {
  const { id, username } = user;
  return {
    id,
    username,
    email: user?.email,
    avatar: user?.avatar,
    firstName: user?.first_name,
    lastName: user?.last_name,
    dateJoined: user?.date_joined,
    vcsAccounts: user.vcs_accounts,
  };
}

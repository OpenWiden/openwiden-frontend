import { UserData, User } from './User';

export default function userResolver(user: UserData): User {
  const { id, username, email, avatar } = user;
  return {
    id,
    username,
    email,
    avatar,
    firstName: user.first_name,
    lastName: user.last_name,
    dateJoined: user.date_joined,
    oauth2Tokens: user.oauth2_tokens,
  };
}

import { User } from '@/src/interfaces/User/User';
import { Provider } from '@/src/interfaces/Provider';

export interface AppState {
  auth: string | null;
  refresh: string | null;
  user: User | null;
  provider: Provider | null;
}

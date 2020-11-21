import { User } from '@/src/interfaces/User/User';
import { Provider } from '@/src/interfaces/Provider';
import { Filters } from '@/src/interfaces/Filters';

export interface AppState {
  auth: string | null;
  refresh: string | null;
  user: User | null;
  provider: Provider | null;
  filters: Filters;
}

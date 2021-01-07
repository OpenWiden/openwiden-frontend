import { Context } from '@nuxt/types';
import { events } from '../src/components/ToastsGroup/events';

export interface RepositoryMessage {
  message: string;
  object: {
    id: string;
    type: 'repository';
    state: 'added' | 'removed';
  };
}
declare module 'vue/types/vue' {
  interface Vue {
    $notify: (props: RepositoryMessage) => void;
  }
}

const createNotification = ({ message, object }: RepositoryMessage) => {
  const toast = {
    message,
    id: object.id,
    state: object.state,
  };

  events.$emit('add', { toast, state: 'IDLE' });
};

export default function (_: Context, inject: any) {
  inject('notify', createNotification);
}

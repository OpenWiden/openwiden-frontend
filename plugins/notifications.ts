import { Context } from '@nuxt/types';
import { events } from '../src/components/ToastsGroup/events';

interface Props {
  message: string;
  object: {
    id: string;
    type: 'repository';
  };
}
declare module 'vue/types/vue' {
  interface Vue {
    $notify: (props: Props) => void;
  }
}

const createNotification = ({ message, object }: Props) => {
  const toast = {
    message,
    id: object.id,
  };

  events.$emit('add', { toast, state: 'IDLE' });
};

export default function (_: Context, inject: any) {
  inject('notify', createNotification);
}

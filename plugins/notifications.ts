import { Context } from '@nuxt/types';
import { events } from '../src/components/ToastsGroup/events';
interface Props {
  href?: string;
  message?: string;
  count?: number;
  ms?: number;
}
declare module 'vue/types/vue' {
  interface Vue {
    $notify: (props: Props) => void;
  }
}

let id = 1;

const createNotification = (props: Props) => {
  const item = {
    ...props,
    state: 'IDLE',
    id,
  };

  id += 1;

  events.$emit('add', item);
};

export default function (_: Context, inject: any) {
  inject('notify', createNotification);
}

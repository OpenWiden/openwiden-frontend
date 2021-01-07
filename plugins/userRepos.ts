import { Context } from '@nuxt/types';
import { events } from '../src/components/UserRepos/events';

declare module 'vue/types/vue' {
  interface Vue {
    $update: (props: any) => void;
  }
}

export default function (_: Context, inject: any) {
  inject('update', ({ object: { id, state } }: any) => {
    events.$emit('update', { id, state });
  });
}

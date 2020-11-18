import Vue from 'vue';
import { Context } from '@nuxt/types';
import Toast from '../src/components/Toast/Toast.vue';
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

const create = (props: Props) => {
  const toastsContainer = document.getElementById('notifications');

  const ComponentCtor = Vue.extend(Toast);
  const componentInstance = new ComponentCtor({
    propsData: {
      ...props,
      count: toastsContainer?.children.length,
    },
  });

  if (toastsContainer) {
    toastsContainer.appendChild(componentInstance.$mount().$el);
  }
};

export default function (_: Context, inject: any) {
  inject('notify', (props: any) => create(props));
}

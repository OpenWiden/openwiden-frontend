import { render } from '@testing-library/vue';
import Logo from './Logo.vue';

describe('<logo/>', () => {
  it('renders without error', () => {
    const { debug } = render(Logo);
    debug();
  });
});

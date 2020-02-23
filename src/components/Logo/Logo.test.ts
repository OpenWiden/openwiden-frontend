/* eslint-env jest */
import { render } from '@testing-library/vue';
import Logo from './Logo.vue';

describe('<logo/>', () => {
  it('renders without error', () => {
    render(Logo);
  });
});

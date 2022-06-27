---
to: src/components/<%= Name %>/<%= Name %>.spec.tsx
---

import <%= Name %> from './<%= Name %>';
import { render } from '@testing-library/react';

describe('<%= Name %>', () => {
  it('should render the <%= Name %> component', () => {
    const { container } = render(<%= Name %>);
    expect(container).toMatchSnapshot();
  });
});

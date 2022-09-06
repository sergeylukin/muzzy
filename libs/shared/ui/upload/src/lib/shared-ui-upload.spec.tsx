import { render } from '@testing-library/react';

import SharedUiUpload from './shared-ui-upload';

describe('SharedUiUpload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiUpload />);
    expect(baseElement).toBeTruthy();
  });
});

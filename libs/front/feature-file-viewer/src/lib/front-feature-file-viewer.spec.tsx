import { render } from '@testing-library/react';

import FrontFeatureFileViewer from './front-feature-file-viewer';

describe('FrontFeatureFileViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontFeatureFileViewer />);
    expect(baseElement).toBeTruthy();
  });
});

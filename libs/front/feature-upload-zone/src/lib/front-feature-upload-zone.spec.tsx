import { render } from '@testing-library/react';

import FrontFeatureUploadZone from './front-feature-upload-zone';

describe('FrontFeatureUploadZone', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontFeatureUploadZone />);
    expect(baseElement).toBeTruthy();
  });
});

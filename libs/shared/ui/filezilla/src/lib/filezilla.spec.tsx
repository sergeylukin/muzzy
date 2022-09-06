import { render } from '@testing-library/react';

import { Filezilla } from './filezilla';

describe('Filezilla', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Filezilla onUploadComplete={() => console.log('uploaded!')}>
        <button type="submit">Upload!</button>
      </Filezilla>
    );
    expect(baseElement).toBeTruthy();
  });
});

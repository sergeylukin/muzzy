// @ts-nocheck
import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

import { FrontFeatureUploadZone } from '@muzzy/front/feature-upload-zone';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<FrontFeatureUploadZone />} />
      </Routes>
    </StyledApp>
  );
}

export default App;

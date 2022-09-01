import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

import { FrontFeatureUploadZone } from '@muzzy/front/feature-upload-zone';
import { FrontFeatureFileViewer } from '@muzzy/front/feature-file-viewer';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Routes>
        <Route path="/" element={<FrontFeatureUploadZone />} />
        <Route path="/p/:id" element={<FrontFeatureFileViewer />} />
      </Routes>
    </StyledApp>
  );
}

export default App;

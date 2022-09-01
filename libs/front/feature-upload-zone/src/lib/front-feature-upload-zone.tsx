import * as React from 'react';
import styled from '@emotion/styled';
import { useFileUpload } from '@muzzy/file/hooks';

const StyledFrontFeatureUploadZone = styled.div`
  color: pink;
`;

export function FrontFeatureUploadZone() {
  const { inputRef, onUpload, apiResponse } = useFileUpload();
  return (
    <StyledFrontFeatureUploadZone>
      <h1>API response {apiResponse.url}</h1>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onUpload();
          }}
        >
          <input type="file" ref={inputRef} />
          <button type="submit">Upload!</button>
        </form>
      </div>
    </StyledFrontFeatureUploadZone>
  );
}

export default FrontFeatureUploadZone;

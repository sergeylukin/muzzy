import * as React from 'react';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useFileUpload } from '@muzzy/file';

const StyledFrontFeatureUploadZone = styled.div`
  color: pink;
`;

export function FrontFeatureUploadZone() {
  const { inputRef, dropzoneRef, onUpload, apiResponse } = useFileUpload();
  if (apiResponse?.url) {
    const id = apiResponse.url.split('/').at(-1);
    return <Navigate replace to={`/p/${id}`} />;
  } else {
    return (
      <StyledFrontFeatureUploadZone id="muzzy-dropzone" ref={dropzoneRef}>
        <h1>upload a meme</h1>
        <h2>Response: {apiResponse.url}</h2>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpload();
            }}
          >
            <input type="file" ref={inputRef} />
            <button id="muzzy-upload-button" type="submit">
              Upload!
            </button>
          </form>
        </div>
      </StyledFrontFeatureUploadZone>
    );
  }
}

export default FrontFeatureUploadZone;

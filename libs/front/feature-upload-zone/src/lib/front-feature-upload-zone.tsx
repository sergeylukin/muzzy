import * as React from 'react';
import styled from '@emotion/styled';
import {
  IFileUploadApiResponse,
  FILE_UPLOAD_API_URL,
} from '@muzzy/shared/api-interface';
import { environment } from '@muzzy/shared/environments';

const StyledFrontFeatureUploadZone = styled.div`
  color: pink;
`;

export function FrontFeatureUploadZone() {
  const [apiResponse, setApiResponse] = React.useState<IFileUploadApiResponse>({
    url: '',
  });
  React.useEffect(() => {
    fetch(environment.api.hostport + FILE_UPLOAD_API_URL)
      .then((r) => r.json())
      .then(setApiResponse);
  }, []);
  return (
    <StyledFrontFeatureUploadZone>
      <h1>API response {apiResponse.url}</h1>
    </StyledFrontFeatureUploadZone>
  );
}

export default FrontFeatureUploadZone;

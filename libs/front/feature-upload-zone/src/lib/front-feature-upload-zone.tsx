import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FrontFeatureUploadZoneProps {}

const StyledFrontFeatureUploadZone = styled.div`
  color: pink;
`;

export function FrontFeatureUploadZone(props: FrontFeatureUploadZoneProps) {
  return (
    <StyledFrontFeatureUploadZone>
      <h1>Welcome to FrontFeatureUploadZone!</h1>
    </StyledFrontFeatureUploadZone>
  );
}

export default FrontFeatureUploadZone;

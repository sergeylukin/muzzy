import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { getFileApiUrlWithId } from '@muzzy/file';

const StyledFrontFeatureFileViewer = styled.div`
  color: pink;
`;

export function FrontFeatureFileViewer() {
  const { id } = useParams();
  const fileURL = getFileApiUrlWithId(id);
  const shareableURL = window.location.href;

  return (
    <StyledFrontFeatureFileViewer>
      <h2>{shareableURL}</h2>
      <img src={fileURL} alt="" />
    </StyledFrontFeatureFileViewer>
  );
}

export default FrontFeatureFileViewer;

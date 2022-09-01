import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface FrontFeatureFileViewerProps {}

const StyledFrontFeatureFileViewer = styled.div`
  color: pink;
`;

export function FrontFeatureFileViewer(props: FrontFeatureFileViewerProps) {
  const params = useParams();
  return (
    <StyledFrontFeatureFileViewer>
      Hey! you're viewing web version of meme with ID "{params['id']}"
    </StyledFrontFeatureFileViewer>
  );
}

export default FrontFeatureFileViewer;

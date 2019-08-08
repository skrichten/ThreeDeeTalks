import styled, { css } from 'styled-components';

const Grid = styled.div`
  position: ${props => props.position || 'relative'};
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(${props => props.cols || props.theme.gridCols}, 1fr);

  ${props => props.styles && css`
    ${props.styles}
  `}
`;

Grid.Item = styled.div`
  grid-column: span ${props => props.span || 1};

  ${props => props.styles && css`
    ${props.styles}
  `}
`;

export default Grid;

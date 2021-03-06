import React, { useState } from 'react';
import styled from 'styled-components';

const over = `
  position:relative;
  z-index: 2;
`

const under = `
  position:relative;
  z-index: 0;
`


const DomContent = styled.div`
  min-height: 5000px;
`;

const Title = styled.h1 `
  font-size: 5.5rem;
  margin: 75px 0 300px 40px;
  opacity: .5;
  ${over}
`;

const List = styled.ul`
  list-style: none;
  text-align: left;
  width: 300px;
  ${over}
  margin-bottom: 2000px;
`;

const Item = styled.li`
  font-size: 4rem;
  line-height: 3;
  margin-left: 30px;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : .5 };
  &:hover { opacity: .8; }
  ${over}
`;

const SpookyWrap = styled.div`
  max-width: 1100px;
  margin: auto;
`;

const SpookyUnder = styled.div`
  font-size: 4rem;
  margin-left: 250px;
  font-weight:bold;
  margin-bottom:70px;
  color: #fff;
  max-width: 300px;
  ${under}
`;

const SpookyOver = styled.div`
  font-size: 4rem;
  margin-left: 250px;
  font-weight:bold;
  color: #fff;
  max-width: 300px;
  ${over}
`;

const order = [ 1, 2, 0, 3 ];

/**
 * Renders the HTML content behind or on top of the WebGL canvas
 * depending on the z-index / stacking order of the elements.
 * The set setLookIndex function is passed in from the parent page
 * to allow interactions in the dom to change the lookIndex value
 */
function GDogContent({setLookIndex}) {
  const [defaultLook, setDefaultLook] = useState(3);
  const lookItems = order.map( (num, i) =>
    <Item key={num}
      selected={ num === defaultLook}
      // when an option is clicked we set the default look which is displaced when not moused over one of the items.
      onClick={() => setDefaultLook(num)}
      onMouseOver={() => setLookIndex(num)}
    >
      Story {i+1}
    </Item>
  )

  return (
    <DomContent>
      <Title>Ghost Stories...</Title>
      <List onMouseLeave={() => setLookIndex(defaultLook)}>
        {lookItems}
      </List>
      <SpookyWrap>
        <SpookyUnder>
          Spooky!
          Spooky!
        </SpookyUnder>
        <SpookyOver>
          Spooky!
          Spooky!
        </SpookyOver>
      </SpookyWrap>
    </DomContent>
  );
}

export default GDogContent;

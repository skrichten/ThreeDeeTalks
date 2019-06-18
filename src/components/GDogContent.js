import React, { useState } from 'react';
import styled from 'styled-components';

const DomContent = styled.div`
  position:relative;
  min-height: 5000px;
  opacity:.7;
`;

const Title = styled.h1 `
  font-size: 5.5rem;
  margin: 75px 0 300px 40px;
`;

const List = styled.ul`
  list-style: none;
  text-align: left;
  width: 300px;
`;

const Item = styled.li`
  font-size: 4rem;
  line-height: 3;
  margin-left: 30px;
  cursor: pointer;
  opacity: .5;
  &:hover { opacity: .9; }
`;

const order = [ 1, 2, 0, 3 ];

function GDogContent({setLookIndex}) {
  const [defaultLook, setDefaultLook] = useState(3);
  const lookItems = order.map( (num, i) =>
    <Item key={num}
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
    </DomContent>
  );
}

export default GDogContent;

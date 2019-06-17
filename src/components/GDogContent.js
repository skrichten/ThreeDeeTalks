import React from 'react';
import styled from 'styled-components';

const DomContent = styled.div`
  position:relative;
  min-height: 5000px;
  opacity:.7;
`;

const Title = styled.h1 `
  font-size: 6.3rem;
  margin: 20px 0 300px 40px;
`;



const List = styled.ul`
  list-style: none;
  text-align: left;
`;

const Item = styled.li`
  font-size: 4rem;
  line-height: 3;
  margin-left: 30px;
  cursor: pointer;
`;

const order = [ 1, 2, 0, 3 ];

function GDogContent({setLookIndex}) {
  const lookItems = order.map( (num, i) =>
    <Item key={num}
      onMouseOut={() => setLookIndex(3)}
      onMouseOver={() => setLookIndex(num)}
    >Story {i+1}</Item>
  )

  return (
    <DomContent>
      <Title>Ghost Stories...</Title>
      <List>
        {lookItems}
      </List>
    </DomContent>
  );
}

export default GDogContent;

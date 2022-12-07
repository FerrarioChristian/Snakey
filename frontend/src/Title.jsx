import React from "react";
import styled from "styled-components";

function Title() {
  return (
    <CenteredDiv>
      <Text>Snakey.io</Text>
    </CenteredDiv>
  );
}

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  font-size: 100px;
  font-family: "Press Start 2P", cursive;
  color: #fff;
  margin: 15px 10px;
`;

export default Title;

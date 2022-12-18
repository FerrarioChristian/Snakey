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
  font-size: 80px;
  font-family: "Fredoka One", cursive;
  color: #ead2ac;
  margin: 15px 10px;
  font-weight: 400;
`;

export default Title;

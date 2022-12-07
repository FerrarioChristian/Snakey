import React from "react";
import styled from "styled-components";

function Canvas(props) {
  return (
    <CenteredDiv>
      <canvas id="canvas" />
    </CenteredDiv>
  );
}

const CenteredDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Canvas;

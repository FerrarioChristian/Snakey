import React from "react";
import styled from "styled-components";

function Canvas({ winner }) {
  return (
    <CenteredDiv>
      <div>
        <CenteredDiv>
          <WinnerTextDiv>
            {winner}
            {winner ? <StyledButton>Play Again</StyledButton> : null}
          </WinnerTextDiv>
        </CenteredDiv>
        <StyledCanvas id="canvas" />
      </div>
    </CenteredDiv>
  );
}

const CenteredDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCanvas = styled.canvas`
  border: 5px solid #ead2ac;
  z-index: 1;
`;

const WinnerTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ead2ac;
  font-size: 5rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  z-index: 2;
  margin: 0;
  font-family: "Fredoka One", cursive;
`;

const StyledButton = styled.button`
  background-color: #ead2ac;
  color: #333;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: #ead2ac;
  }
`;

export default Canvas;

import React from "react";
import styled, { keyframes } from "styled-components";

// --> Styled components start <--
//keyframe animation
const Animate = keyframes`
    0%{
        height: 0;
    }
    50%{
        height: 40px;
    }
    100%{
        height: 0px;    
    }
`;

//Wrapper component for everything else
const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: min-content;

  height: 40px;

  .element {
    width: 6px;
    height: 40px;
    border-radius: 10px;

    background: black;
    margin: 3px;

    animation: ${Animate} 0.6s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;
// --> Styled components end <--

// Functional component for Loading Animation
const LoadingAnimation = () => {
  return (
    <Wrapper>
      <div className="element"></div>
      <div className="element"></div>
      <div className="element"></div>
    </Wrapper>
  );
};

export default LoadingAnimation;

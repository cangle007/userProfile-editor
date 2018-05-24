import React from 'react';
import styled from 'styled-components';

export default function WelcomePageComponent() {
  const Wrapper = styled.h1`
    line-height: 150px;
    color: #66fcf1;
    font-weight: 900;
    font-size: 50px;
    text-transform: uppercase;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    animation-duration: 15s;
    animation-iteration-count: infinite;
  `;

  return (
    <Wrapper id="welcomePage" className="animated fadeIn">
      WELCOME
    </Wrapper>
  );
}

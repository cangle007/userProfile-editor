import React, { Component } from 'react';
import inline from '../images/widget-slider-inline.png';
import styled from 'styled-components';

export default class InlineComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  generateData = () => {
    this.props.get_myData();
  };

  allowDrop = event => {
    event.preventDefault();
  };

  drag = event => {
    event.dataTransfer.setData('text', event.target.id);
  };

  drop = event => {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));
  };

  render() {
    const Wrapper = styled.div`
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      border: 1px solid white;
      justify-items: center;
    `;
    return (
      <Wrapper>
        <img
          draggable="true"
          onDragStart={this.drag}
          value="dragInline"
          id="dragInline"
          src={inline}
          alt="inline"
        />
      </Wrapper>
    );
  }
}

// import React from 'react';
// import inline from '../images/widget-slider-inline.png';
// import styled from 'styled-components';
//
// export default function InlineComponent() {
//   const Wrapper = styled.div`
//     display: grid;
//     grid-template-columns: repeat(1, 1fr);
//     border: 1px solid white;
//     justify-items: center;
//   `;
//
//   return (
//     <Wrapper>
//       <img
//         draggable="true"
//         onDragStart={this.drag}
//         value="dragInline"
//         id="dragInline"
//         src={inline}
//         alt="inline"
//       />
//     </Wrapper>
//   );
// }

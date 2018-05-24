import React, { Component } from 'react';
import popup from '../images/widget-slider-popup.png';
import styled from 'styled-components';

export default class PopupComponentOneColumn extends Component {
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
          value="dragOneColumn"
          id="dragOneColumn"
          src={popup}
          alt="popup"
        />
      </Wrapper>
    );
  }
}

// import React from 'react';
// import popup from '../images/widget-slider-popup.png';
// import styled from 'styled-components';
//
// export default function PopupComponentOneColumn() {
// const Wrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   border: 1px solid white;
//   justify-items: center;
// `;
//
//   function allowDrop(event) {
//     event.preventDefault();
//   }
//
//   function drag(event) {
//     event.dataTransfer.setData('text', event.target.id);
//   }
//
//   function drop(event) {
//     event.preventDefault();
//     var data = event.dataTransfer.getData('text');
//     event.target.appendChild(document.getElementById(data));
//   }
//
//   return (
//     <Wrapper>
//       <div draggable="true" onDragStart={drag()} value="drag1" id="drag1">
//         <img
//           draggable="true"
//           onDragStart={drag()}
//           value="drag1"
//           id="drag1"
//           src={popup}
//           alt="popup"
//         />
//       </div>
//     </Wrapper>
//   );
// }

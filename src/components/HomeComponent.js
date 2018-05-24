import React, { Component } from 'react';
import aferoResponsive from '../images/afero-logo-responsive.svg';
import popup from '../images/widget-slider-popup.png';
import inline from '../images/widget-slider-inline.png';
import WelcomePageComponent from './WelcomePageComponent';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataCounter: -1
    };
  }

  /*functions for drag, drop, and remove elements */
  dragover = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  drag = event => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  drop = event => {
    event.preventDefault();

    var data = event.dataTransfer.getData('text/plain');
    //console.log('this data-------------');
    event.target.appendChild(document.getElementById(data));
  };

  getElementInfo = event => {
    let value = event.target.alt;
    console.log('element---------', value);
    //this.props.remove_allData(value);
  };

  remove = event => {
    if (event.stopPropagation) event.stopPropagation();
    var element = document.getElementById(event.dataTransfer.getData('Text'));

    this.props.remove_allData(element.alt);
    element.parentNode.removeChild(element);
    // event.dataTransfer.clearData();
  };

  /*buttons to review multiple data set */
  nextCounter = () => {
    let { dataCounter } = this.state;
    let { allData } = this.props;
    let dataLength = allData.length - 1;

    if (dataCounter < dataLength) {
      this.setState({ dataCounter: dataCounter + 1 });
    }
  };

  backCounter = () => {
    let { dataCounter } = this.state;
    if (dataCounter > 0) {
      this.setState({ dataCounter: dataCounter - 1 });
    }
  };

  render() {
    let { allData } = this.props;
    let { dataCounter } = this.state;
    let currentDataRendered = allData[dataCounter];

    console.log('props------------', this.props);
    //console.log('this state------------', this.state);
    return (
      <div className="container">
        {/* this is where user can remove their elements */}
        <div id="dragPlace-1" onDrop={this.remove} onDragOver={this.dragover} />
        <div className="wrapper">
          <div className="header">
            <div className="usericon" />
            <div className="status">
              <p>STATUS</p>
              <p>Device Name</p>
            </div>
          </div>
          <div className="subheader">
            <p>Controls</p>
          </div>

          <div className="body">
            {dataCounter === -1 ? (
              <WelcomePageComponent />
            ) : (
              currentDataRendered &&
              currentDataRendered.map((controlObj, i) => {
                //console.log('control-------------', controlObj);
                if (
                  controlObj.viewStyle === 'popup' &&
                  controlObj.tally === 3
                ) {
                  return (
                    <div
                      key={i}
                      id="dragPlace-body"
                      className="popup-threeCol-style"
                      onDrop={this.drop}
                      onDragOver={this.dragover}>
                      <img
                        draggable="true"
                        onDragStart={this.drag}
                        src={popup}
                        id={i + 'A'}
                        value={i + 'A'}
                        alt={controlObj.viewStyle}
                      />
                      <img
                        draggable="true"
                        onDragStart={this.drag}
                        src={popup}
                        id={i + 'B'}
                        value={i + 'B'}
                        alt={controlObj.viewStyle}
                      />
                      <img
                        draggable="true"
                        onDragStart={this.drag}
                        src={popup}
                        id={i + 'C'}
                        value={i + 'C'}
                        alt={controlObj.viewStyle}
                      />
                    </div>
                  );
                } else if (
                  controlObj.viewStyle === 'popup' &&
                  controlObj.tally === 2
                ) {
                  return (
                    <div
                      key={i}
                      id="dragPlace-body"
                      onDrop={this.drop}
                      onDragOver={event => event.preventDefault()}
                      className="popup-twoCol-style">
                      <img
                        draggable="true"
                        onDragStart={this.drag}
                        src={popup}
                        id={i + 'D'}
                        value={i + 'D'}
                        alt={controlObj.viewStyle}
                      />
                      <img
                        draggable="true"
                        onDragStart={this.drag}
                        src={popup}
                        id={i + 'E'}
                        value={i + 'E'}
                        alt={controlObj.viewStyle}
                      />
                    </div>
                  );
                } else if (
                  controlObj.viewStyle === 'popup' &&
                  controlObj.tally === 1
                ) {
                  return (
                    <div
                      key={i}
                      id="dragPlace-body"
                      onDrop={this.drop}
                      onDragOver={event => event.preventDefault()}
                      className="popup-oneCol-style ">
                      <img
                        draggable="true"
                        onDragStart={this.drag}
                        src={popup}
                        id={i + 'F'}
                        value={i + 'F'}
                        alt={controlObj.viewStyle}
                      />
                    </div>
                  );
                } else if (controlObj.viewStyle === 'inline') {
                  return (
                    <div
                      key={i}
                      id="dragPlace-body"
                      onDrop={this.drop}
                      onDragOver={event => event.preventDefault()}
                      className="inline-oneCol-style">
                      <img
                        draggable="true"
                        onDragStart={this.drag}
                        src={inline}
                        id={i + 'G'}
                        value={i + 'G'}
                        alt={controlObj.viewStyle}
                      />
                    </div>
                  );
                }
              })
            )}
          </div>
          <div className="footer">
            <button className="btn btn01" onClick={this.backCounter}>
              back
            </button>
            <img
              className="logo animated fadeIn"
              id="aferoLogo"
              alt="aferoResponsive"
              src={aferoResponsive}
            />
            <button className="btn btn02" onClick={this.nextCounter}>
              next
            </button>
          </div>
        </div>
        {/* this is where user can drop their elements */}
        <div
          id="dragPlace-3"
          onDrop={this.drop}
          onDragOver={event => event.preventDefault()}
        />
      </div>
    );
  }
}

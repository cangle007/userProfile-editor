import React from 'react';

export default function OrderPageLayout({ props }) {
  function dragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  /*functions for drag, drop, and remove elements */
  function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
  }

  function drop(event) {
    event.preventDefault();

    var data = event.dataTransfer.getData('text/plain');
    event.target.appendChild(document.getElementById(data));
  }

  return (
    //=========HEADER=========
    <div>
      {props &&
        props.map((obj, i) => {
          if (obj.viewStyle === 'popup' && obj.tally === 3) {
            return (
              <div
                key={i}
                id="dragPlace-body"
                className="popup-threeCol-style"
                onDrop={drop}
                onDragOver={dragover}>
                <img
                  draggable="true"
                  onDragStart={drag}
                  src={obj.url}
                  id={i + 'A'}
                  value={i + 'A'}
                  alt={i + 'A'}
                />
                <img
                  draggable="true"
                  onDragStart={drag}
                  src={obj.url}
                  id={i + 'B'}
                  value={i + 'B'}
                  alt={i + 'B'}
                />
                <img
                  draggable="true"
                  onDragStart={drag}
                  src={obj.url}
                  id={i + 'C'}
                  value={i + 'C'}
                  alt={i + 'C'}
                />
              </div>
            );
          } else if (obj.viewStyle === 'popup' && obj.tally === 2) {
            return (
              <div
                key={i}
                id="dragPlace-body"
                onDrop={drop}
                onDragOver={event => event.preventDefault()}
                className="popup-twoCol-style">
                <img
                  draggable="true"
                  onDragStart={drag}
                  src={obj.url}
                  id={i + 'D'}
                  value={i + 'D'}
                  alt={i + 'D'}
                />
                <img
                  draggable="true"
                  onDragStart={drag}
                  src={obj.url}
                  id={i + 'E'}
                  value={i + 'E'}
                  alt={i + 'E'}
                />
              </div>
            );
          } else if (obj.viewStyle === 'popup' && obj.tally === 1) {
            return (
              <div
                key={i}
                id="dragPlace-body"
                onDrop={drop}
                onDragOver={event => event.preventDefault()}
                className="popup-oneCol-style ">
                <img
                  draggable="true"
                  onDragStart={drag}
                  src={obj.url}
                  id={i + 'F'}
                  value={i + 'F'}
                  alt={i + 'F'}
                />
              </div>
            );
          } else if (obj.viewStyle === 'inline') {
            return (
              <div
                key={i}
                id="dragPlace-body"
                onDrop={drop}
                onDragOver={event => event.preventDefault()}
                className="inline-oneCol-style">
                <img
                  draggable="true"
                  onDragStart={drag}
                  src={obj.url}
                  id={i + 'F'}
                  value={i + 'F'}
                  alt={i + 'F'}
                />
              </div>
            );
          }
        })}
    </div>
  );
}

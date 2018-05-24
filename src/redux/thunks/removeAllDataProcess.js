import removeAllData from '../../api/removeAllData.js';

export default function removeAllDataProcess(viewStyle) {
  return (dispatch, getState) => {
    return removeAllData(viewStyle)
      .then(data => {
        let copy = data.slice(0);

        console.log('copy-------------------', copy);
        console.log('viewStyle-------------------', viewStyle);

        copy.map((controlObj, i) => {
          if (controlObj.viewStyle === viewStyle) {
            copy.splice(i, 1);
          }
        });
        return copy;
      })
      .then(result => {
        //dispatch modified data to store for all Components to have access to
        dispatch({ type: 'GET_ALL_DATA', allData: result });
      });
  };
}

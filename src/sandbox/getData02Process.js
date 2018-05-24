import getData02 from '../../api/getData02.js';

export default function getData02Process() {
  return (dispatch, getState) => {
    return getData02()
      .then(data => {
        /* This algorithm compares the
        "next" viewStyle to the "previous" viewStyle, and
        then tallies up the viewStyles that appeared.
        In essence, we are comparing each element backwards,
        instead of forwards */

        let result = [];
        let newObj = {};
        let counter = 0;
        let lastStyle = null;

        // To handle popup when it appears at 4 or more consecutively. Give details on why we show rows etc
        function insertPopup(lastStyle) {
          if (lastStyle !== null) {
            /* When there are more than 4 consecutive popup,
            each row should have max of three popup elements */
            while (counter > 4) {
              newObj = { viewStyle: 'popup', tally: 3 };
              result.push(newObj);
              counter = counter - 3;
            }
            /* When there are 4 consecutive popups,
            each row should have max of two popup elements */
            if (counter === 4) {
              newObj = { viewStyle: 'popup', tally: 2 };
              result.push(newObj);

              newObj = { viewStyle: 'popup', tally: 2 };
              result.push(newObj);
            } else {
              /* When there is one popup,
              each row should have one popup elements */
              newObj = { viewStyle: 'popup', tally: counter };
              result.push(newObj);
            }
          }
        }
        //Main algorithm, parse data and return new array of obj
        data.forEach(controlObj => {
          let currentStyle = controlObj.viewStyle;

          if (currentStyle === 'inline') {
            insertPopup(lastStyle); //see line 22 for details

            /* when viewStyle is 'inline' */
            newObj = { viewStyle: 'inline', tally: 1 };
            result.push(newObj);
            counter = 0;
            lastStyle = null;
          } else {
            /* when viewStyle is 'popup', counter will continue
            to increase as long as viewStyle is 'popup' */
            lastStyle = currentStyle;
            counter += 1;
          }
        });

        /* Call insertPopup() again to handle last element(s)
        when viewStyle is 'popup' */
        insertPopup(lastStyle); //see line 21 for details
        return result;
      })
      .then(result => {
        //dispatch modified data to store for all Components to have access to
        dispatch({ type: 'GET_DATA_02', data02: result });
      });
  };
}

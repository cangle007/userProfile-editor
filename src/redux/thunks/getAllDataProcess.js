import getAllData from '../../api/getAllData.js';

export default function getAllDataProcess() {
  return (dispatch, getState) => {
    return getAllData()
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

        /* Part of the main algorithm, this function handles 'popup'
        when it appears at 4 or more consecutively */
        function insertPopup(lastStyle, parsedArr) {
          if (lastStyle !== null) {
            /* When there are more than 4 consecutive popup,
            each row should have max of three popup elements */
            while (counter > 4) {
              newObj = {
                viewStyle: 'popup',
                tally: 3
              };

              parsedArr.push(newObj);
              counter = counter - 3;
            }

            /* When there are 4 consecutive popups,
            each row should have max of two popup elements */
            if (counter === 4) {
              newObj = {
                viewStyle: 'popup',
                tally: 2
              };
              parsedArr.push(newObj);

              newObj = {
                viewStyle: 'popup',
                tally: 2
              };
              parsedArr.push(newObj);
            } else if (counter < 4 && counter !== 0) {
              /* hanle 'popup' when it is less than 4,
              each column should have at less one 'popup'
              elements and max of 3 */
              newObj = {
                viewStyle: 'popup',
                tally: counter
              };
              parsedArr.push(newObj);
            }
          }
        }

        /* Main algorithm, parse data and return new array of
        obj containing properties of viewStyle, tally, url */
        data.forEach((controlObj, z) => {
          let parsedArr = []; //to push 'array of obj' into another array, result
          for (let i = 0; i < controlObj.length; i++) {
            let currentStyle = controlObj[i].viewStyle;

            if (controlObj.length === 1) {
              newObj = {
                viewStyle: controlObj[i].viewStyle,
                tally: 1
              };

              parsedArr.push(newObj);
              result.push(parsedArr);
              return result;
            } else if (currentStyle === 'inline' && counter > 0) {
              insertPopup(lastStyle, parsedArr); //see line 21 for details

              /* when viewStyle is 'inline' */
              newObj = {
                viewStyle: 'inline',
                tally: 1
              };

              parsedArr.push(newObj);
              result.push(parsedArr);
              counter = 0;
              lastStyle = null;
            } else if (currentStyle === 'inline' && counter === 0) {
              newObj = {
                viewStyle: 'inline',
                tally: 1
              };
              parsedArr.push(newObj);
            } else {
              /* when viewStyle is 'popup', counter will continue
              to increase as long as viewStyle is 'popup' */
              lastStyle = currentStyle;
              counter += 1;
            }
          }

          /* To handle when first element is 'inline' */
          if (parsedArr.length > 0 && parsedArr[0].viewStyle === 'inline') {
            insertPopup(lastStyle, parsedArr);
            result.push(parsedArr);
            counter = 0;
            lastStyle = null;
          }
        });

        /* This function is similar to insertPopup(), but slightly different cause
        this funct handles the last index of the data when viewStyle is 'popup' */
        function insertPopupLastIndex(lastStyle) {
          let parsedArr = [];

          if (lastStyle !== null) {
            /* When there are more than 4 consecutive popup,
            each row should have max of three popup elements */
            while (counter > 4) {
              newObj = {
                viewStyle: 'popup',
                tally: 3
              };
              parsedArr.push(newObj);
              counter = counter - 3;
            }

            /* when there are 4 consecutive popups,
            each row should have max of two popup elements */
            if (counter === 4) {
              newObj = {
                viewStyle: 'popup',
                tally: 2
              };
              parsedArr.push(newObj);

              newObj = {
                viewStyle: 'popup',
                tally: 2
              };
              parsedArr.push(newObj);
            } else if (counter < 4 && counter !== 0) {
              /* when there is one popup,
              each row should have one popup elements */
              newObj = {
                viewStyle: 'popup',
                tally: counter
              };
              parsedArr.push(newObj);
            }
          }
          result.push(parsedArr);
        }
        insertPopupLastIndex(lastStyle);
        return result;
      })
      .then(result => {
        //dispatch modified data to store for all Components to have access to
        dispatch({ type: 'GET_ALL_DATA', allData: result });
      });
  };
}

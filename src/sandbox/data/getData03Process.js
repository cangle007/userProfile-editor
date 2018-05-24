import getData03 from '../../api/getData03.js';
import cat01 from '../../images/cat01.png';
import cat02 from '../../images/cat02.png';
import cat03 from '../../images/cat03.png';
import cat04 from '../../images/cat04.png';
import catinline from '../../images/catinline.png';

export default function getData03Process() {
  return (dispatch, getState) => {
    return getData03()
      .then(data => {
        /*objective of this algorithm is to compare the
        "next" viewStyle to the "previous" viewStyle, and
        then tally up the viewStyle that appeared.
        In essence we are comparing each element backwardly,
        instead of forwardly */

        let result = [];
        let newObj = {};
        let counter = 0;
        let lastStyle = null;

        //to handle popup when it appears at 4 or more consecutively
        function insertPopup(lastStyle) {
          if (lastStyle !== null) {
            while (counter > 4) {
              newObj.viewStyle = 'popup';
              newObj.tally = 3;
              newObj.url = cat01;
              result.push(newObj);
              newObj = {};
              counter = counter - 3;
            }
            if (counter === 4) {
              newObj.viewStyle = 'popup';
              newObj.tally = 2;
              newObj.url = cat02;
              result.push(newObj);
              newObj = {};
              newObj.viewStyle = 'popup';
              newObj.tally = 2;
              newObj.url = cat03;
              result.push(newObj);
              newObj = {};
            } else {
              newObj.viewStyle = 'popup';
              newObj.tally = counter;
              newObj.url = cat04;
              result.push(newObj);
              newObj = {};
            }
          }
        }

        //Main algorithm
        data.forEach(obj => {
          let currentStyle = obj.viewStyle;

          if (currentStyle === 'inline') {
            insertPopup(lastStyle); //see line 21 for details

            //when viewStyle is 'inline'
            newObj.viewStyle = 'inline';
            newObj.tally = 1;
            newObj.url = catinline;
            result.push(newObj);
            newObj = {};
            counter = 0;
            lastStyle = null;
          } else {
            //counter will continue to increase as long as viewStyle is 'popup'
            lastStyle = currentStyle;
            counter += 1;
          }
        });

        /*call insertPropup() again to handle last element(s)
        when viewStyle is 'popup'*/
        insertPopup(lastStyle); //see line 21 for details
        return result;
      })
      .then(result => {
        //iterate through result and add IMG URL property

        //dispatch modified data to store for all Components to have access to
        dispatch({ type: 'GET_DATA_03', data03: result });
      });
  };
}

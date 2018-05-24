import getData07 from '../../api/getData07.js';
import dog01 from '../../images/dog01.png';
import dog02 from '../../images/dog02.png';
import dog03 from '../../images/dog03.png';
import cat04 from '../../images/cat04.png';
import inline from '../../images/widget-slider-inline.png';

export default function getData07Process() {
  return (dispatch, getState) => {
    return getData07()
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
              newObj.url = dog01;
              result.push(newObj);
              newObj = {};
              counter = counter - 3;
            }
            if (counter === 4) {
              newObj.viewStyle = 'popup';
              newObj.tally = 2;
              newObj.url = dog02;
              result.push(newObj);
              newObj = {};
              newObj.viewStyle = 'popup';
              newObj.tally = 2;
              newObj.url = dog03;
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
            newObj.url = inline;
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
        dispatch({ type: 'GET_DATA_07', data07: result });
      });
  };
}

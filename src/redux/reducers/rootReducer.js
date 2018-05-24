export default function rootReducer(
  currentState = {
    allData: ''
  },
  action
) {
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...currentState, allData: action.allData };
    default:
      return currentState;
  }
}

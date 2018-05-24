// import { compose, lifecycle } from 'recompose';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
//
// import TestPage from '../../components/TestPage.js';
// import getMyDataProcess from '../thunks/getMyDataProcess';
// import initMuuriProcess from '../thunks/initMuuriProcess.js';
//
// function mapStateToProps(state, ownProps) {
//   return {
//     myData: state.myData
//   };
// }
//
// function mapDispatchToProps(dispatch, ownProps) {
//   return {
//     get_myData: () => {
//       dispatch(getMyDataProcess());
//     },
//     init_grid: () => {
//       dispatch(initMuuriProcess());
//     }
//   };
// }
//
// const withlifecycle = lifecycle({
//   componentDidMount(prevProps, prevState) {
//     this.props.get_myData();
//     //this.props.init_grid();
//   },
//   componentDidUpdate(prevProps, prevState) {
//     //this.props.init_grid();
//   }
// });
//
// const connectToStore = connect(mapStateToProps, mapDispatchToProps);
//
// export default compose(connectToStore, withlifecycle)(withRouter(TestPage));

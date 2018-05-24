import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import getAllDataProcess from '../thunks/getAllDataProcess.js';
import removeAllDataProcess from '../thunks/removeAllDataProcess.js';
import HomePage from '../../components/HomePage';

function mapStateToProps(state, ownProps) {
  return {
    allData: state.allData
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    get_allData: () => {
      dispatch(getAllDataProcess());
    },
    remove_allData: viewStyle => {
      dispatch(removeAllDataProcess(viewStyle));
    }
  };
}

const withlifecycle = lifecycle({
  componentDidMount(prevProps, prevState) {
    this.props.get_allData();
  }
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectToStore, withlifecycle)(withRouter(HomePage));

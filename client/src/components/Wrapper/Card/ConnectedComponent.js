import React from 'react'
import Card from './Card.js'
import {connect} from 'react-redux'
import { Provider } from 'react-redux'
import store from './redux/store'
import {addCardClass, addTooltipClass, updateDisableProp, changeQuote} from './redux/store'

const mapStateToProps = (state)  => {
  return ({
    cardVisibility: state.cardVisibility,
    tooltipVisibility: state.tooltipVisibility,
    disabled: state.disabled,
    currentQuote: state.currentQuote,
    currentAuthor: state.currentAuthor
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCardVisibility : function(className) {
        dispatch(addCardClass(className));
    },
    setTooltipVisibility : function(className) {
        dispatch(addTooltipClass(className));
    },
    disableButton : function(bool) {
        dispatch(updateDisableProp(bool));
    },
    changeQuote: function(quote, author) {
        dispatch(changeQuote(quote, author));
    },
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Card);

//wrapping app to work with redux---------------
class ConnectedComponent extends React.Component {
  render () {
     return (
      <Provider store={store}>
        <Container />
       </Provider>
     );
  }
}

export default ConnectedComponent;

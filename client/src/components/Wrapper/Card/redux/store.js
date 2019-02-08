import {createStore} from 'redux'

const TOGGLE_CARD_VISIBILITY = 'TOGGLE_CARD_VISIBILITY';
const TOGGLE_TOOLTIP_VISIBILITY = 'TOGGLE_TOOLTIP_VISIBILITY';
const DISABLE_BUTTON = 'DISABLE_BUTTON';
const CHANGE_QUOTE = 'CHANGE_QUOTE';

const initialState = {
  cardVisibility: "show",
  tooltipVisibility: "hide",
  disabled: false,
  currentQuote: 'Too many of us are not living our dreams because we are living our fears.',
  currentAuthor: 'Les Brown'
}

//redux action creator_____________________________________________
export const addCardClass = (visibility) => {
  return {
   type: TOGGLE_CARD_VISIBILITY,
   cardVisibility: visibility
  };
};

export const addTooltipClass = (visibility) => {
  return {
   type: TOGGLE_TOOLTIP_VISIBILITY,
   tooltipVisibility: visibility
  };
};

export const updateDisableProp = (bool) => {
  return {
   type: DISABLE_BUTTON,
   disabled: bool
  };
};

export const changeQuote= (quote, author) => {
  return {
   type: CHANGE_QUOTE,
   currentQuote: quote,
   currentAuthor: author
  };
};

//--------------------------------------------------------------------

//redux reducer function_____________________________________________
const reducer = (state = initialState, action) => {
  switch(action.type){
    case TOGGLE_CARD_VISIBILITY : return {cardVisibility: action.cardVisibility, tooltipVisibility: state.tooltipVisibility, disabled: state.disabled, currentQuote: state.currentQuote, currentAuthor: state.currentAuthor};
    case TOGGLE_TOOLTIP_VISIBILITY : return {cardVisibility: state.cardVisibility, tooltipVisibility: action.tooltipVisibility, disabled: state.disabled, currentQuote: state.currentQuote, currentAuthor: state.currentAuthor};
    case DISABLE_BUTTON : return {cardVisibility: state.cardVisibility, tooltipVisibility: state.tooltipVisibility, disabled: action.disabled, currentQuote: state.currentQuote, currentAuthor: state.currentAuthor};
    case CHANGE_QUOTE : return {cardVisibility: state.cardVisibility, tooltipVisibility: state.tooltipVisibility, disabled: state.disabled, currentQuote: action.currentQuote, currentAuthor: action.currentAuthor};
    default : return state;
  };
};
//----------------------------------------------------------------


//declaring redux store___________________________________________
const store = createStore(reducer);
//------------------------------------------------

export default store;

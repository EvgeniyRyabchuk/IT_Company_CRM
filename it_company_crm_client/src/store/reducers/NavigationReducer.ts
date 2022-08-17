
import { navigations } from '../../routing/navigations';
import { SET_USER_NAVIGATION } from '../action-creator/NavigationAction';

const initialState = [...navigations];

const NavigationReducer = function (state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_NAVIGATION: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default NavigationReducer;





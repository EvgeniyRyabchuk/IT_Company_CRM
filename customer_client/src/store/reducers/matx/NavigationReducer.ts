
import { navigations } from '../../../routing/navigations';
import {NavigationAction, NavigationActionTypes, NavigationRoute} from "../../../types/matx/navigations";

const initialState : NavigationRoute[] = [...navigations];

const NavigationReducer = function (state = initialState, action: NavigationAction) {
  switch (action.type) {
    case NavigationActionTypes.SET_USER_NAVIGATION: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default NavigationReducer;





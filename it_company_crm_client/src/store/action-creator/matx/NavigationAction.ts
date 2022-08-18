

import {Dispatch} from "react";
import {NavigationAction, NavigationActionTypes} from "../../../types/matx/navigations";


const getfilteredNavigations = (navList = [], role: any) => {
  return navList.reduce((array: any, nav: any) => {
      if (nav.auth) {
      if (nav.auth.includes(role)) {
        array.push(nav);
      }
    } else {
      if (nav.children) {
        nav.children = getfilteredNavigations(nav.children, role);
        array.push(nav);
      } else {
        array.push(nav);
      }
    }
    return array;
  }, []);
};

export function getNavigationByUser() {
  return (dispatch: Dispatch<NavigationAction>, getState: any) => {
    let { user, navigations = [] } = getState();

    let filteredNavigations = getfilteredNavigations(navigations, user.role);

    dispatch({
      type: NavigationActionTypes.SET_USER_NAVIGATION,
      payload: [...filteredNavigations],
    });
  };
}




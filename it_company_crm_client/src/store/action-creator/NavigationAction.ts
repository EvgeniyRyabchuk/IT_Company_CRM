

import {Dispatch} from "react";
export const SET_USER_NAVIGATION = 'SET_USER_NAVIGATION';

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
  return (dispatch: Dispatch<any>, getState: any) => {
    let { user, navigations = [] } = getState();

    let filteredNavigations = getfilteredNavigations(navigations, user.role);

    dispatch({
      type: SET_USER_NAVIGATION,
      payload: [...filteredNavigations],
    });
  };
}




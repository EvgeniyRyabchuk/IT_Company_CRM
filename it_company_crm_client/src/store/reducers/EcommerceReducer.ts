import {EcommerceAction, EcommerceActionTypes, EcommerceState} from "../../types/matx/ecommerce";


const initialState : EcommerceState = {
  productList: [],
  cartList: [],
};

const EcommerceReducer = function (state = initialState, action: EcommerceAction) {
  switch (action.type) {
    case EcommerceActionTypes.GET_PRODUCT_LIST: {
      return {
        ...state,
        productList: [...action.payload],
      };
    }
    case EcommerceActionTypes.GET_CATEGORY_LIST: {
      return {
        ...state,
        categoryList: [...action.payload],
      };
    }
    case EcommerceActionTypes.GET_RATING_LIST: {
      return {
        ...state,
        ratingList: [...action.payload],
      };
    }
    case EcommerceActionTypes.GET_BRAND_LIST: {
      return {
        ...state,
        brandList: [...action.payload],
      };
    }
    case EcommerceActionTypes.GET_CART_LIST: {
      return {
        ...state,
        cartList: [...action.payload],
      };
    }
    case EcommerceActionTypes.ADD_PRODUCT_TO_CART: {
      return {
        ...state,
        cartList: [...action.payload],
      };
    }
    case EcommerceActionTypes.DELETE_PRODUCT_FROM_CART: {
      return {
        ...state,
        cartList: [...action.payload],
      };
    }
    case EcommerceActionTypes.UPDATE_CART_AMOUNT: {
      return {
        ...state,
        cartList: [...action.payload],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default EcommerceReducer;

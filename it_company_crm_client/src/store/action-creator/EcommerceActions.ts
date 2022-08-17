import axios from 'axios';
import {Dispatch} from "react";
import {EcommerceAction, EcommerceActionTypes} from "../../types/matx/ecommerce";


export const getProductList = () => (dispatch: Dispatch<EcommerceAction>) => {
  axios.get('/api/ecommerce/get-product-list').then((res) => {
    dispatch({
      type: EcommerceActionTypes.GET_PRODUCT_LIST,
      payload: res.data,
    });
  });
};

export const getCategoryList = () => (dispatch: Dispatch<EcommerceAction>) => {
  axios.get('/api/ecommerce/get-category-list').then((res) => {
    dispatch({
      type: EcommerceActionTypes.GET_CATEGORY_LIST,
      payload: res.data,
    });
  });
};

export const getRatingList = () => (dispatch: Dispatch<EcommerceAction>) => {
  axios.get('/api/ecommerce/get-rating-list').then((res) => {
    dispatch({
      type: EcommerceActionTypes.GET_RATING_LIST,
      payload: res.data,
    });
  });
};

export const getBrandList = () => (dispatch: Dispatch<EcommerceAction>) => {
  axios.get('/api/ecommerce/get-brand-list').then((res) => {
    dispatch({
      type: EcommerceActionTypes.GET_BRAND_LIST,
      payload: res.data,
    });
  });
};

export const getCartList = (uid: any) => (dispatch: Dispatch<EcommerceAction>) => {
  axios.get('/api/ecommerce/get-cart-list', { data: uid }).then((res) => {
    dispatch({
      type: EcommerceActionTypes.GET_CART_LIST,
      payload: res.data,
    });
  });
};

export const addProductToCart = (uid: any, productId: any) => (dispatch: any) => {
  axios.post('/api/ecommerce/add-to-cart', { uid, productId }).then((res) => {
    console.log(res.data);
    dispatch({
      type: EcommerceActionTypes.ADD_PRODUCT_TO_CART,
      payload: res.data,
    });
  });
};

export const deleteProductFromCart = (uid: any, productId: any) => (dispatch: any) => {
  axios.post('/api/ecommerce/delete-from-cart', { uid, productId }).then((res) => {
    dispatch({
      type: EcommerceActionTypes.DELETE_PRODUCT_FROM_CART,
      payload: res.data,
    });
  });
};

export const updateCartAmount = (uid: any, productId: any, amount: any) => (dispatch: any) => {
  console.log(uid, productId, amount);
  axios.post('/api/ecommerce/update-cart-amount', { uid, productId, amount }).then((res) => {
    dispatch({
      type: EcommerceActionTypes.UPDATE_CART_AMOUNT,
      payload: res.data,
    });
  });
};


export interface EcommerceState {
    productList: any[];
    cartList: any[]
}

export enum EcommerceActionTypes {
    GET_PRODUCT_LIST = 'GET_PRODUCT_LIST',
    GET_CART_LIST = 'GET_CART_LIST',
    GET_CATEGORY_LIST = 'GET_CATEGORY_LIST',
    GET_RATING_LIST = 'GET_RATING_LIST',
    GET_BRAND_LIST = 'GET_BRAND_LIST',

    ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
    DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART',

    UPDATE_CART_AMOUNT = 'UPDATE_CART_AMOUNT',
}

export interface getProductListAction {
    type: EcommerceActionTypes.GET_PRODUCT_LIST,
    payload: any
}

export interface getCategoryListAction {
    type: EcommerceActionTypes.GET_CATEGORY_LIST,
    payload: any[]
}

export interface getRatingListAction {
    type: EcommerceActionTypes.GET_RATING_LIST,
    payload: any[]
}

export interface getBrandListAction {
    type: EcommerceActionTypes.GET_BRAND_LIST,
    payload: any[]
}


export interface getCartListAction {
    type: EcommerceActionTypes.GET_CART_LIST,
    payload: any[]
}

export interface addProductToCartAction {
    type: EcommerceActionTypes.ADD_PRODUCT_TO_CART,
    payload: any[]
}

export interface deleteProductFromCartAction {
    type: EcommerceActionTypes.DELETE_PRODUCT_FROM_CART,
    payload: any[]
}

export interface updateCartAmountAction {
    type: EcommerceActionTypes.UPDATE_CART_AMOUNT,
    payload: any[]
}





export type EcommerceAction = getProductListAction | getCategoryListAction |
    getRatingListAction | getBrandListAction | getCartListAction | addProductToCartAction |
    deleteProductFromCartAction | updateCartAmountAction;
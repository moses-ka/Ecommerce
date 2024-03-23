
export interface userType {
  user: "";
  token: "";
  loggedIn: false;
}
export interface productType {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
  tags: string;
  sex: string;
  size: string;
  color: string;
}
export interface productInCartType {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
  tags: string;
  quantity: number;
  
}
export interface StateType {
products: productInCartType[];
}
export interface StateWishListType {
  favorate: productInCartType[];
}
export interface searchResultsType {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
}
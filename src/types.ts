
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
export interface RootState {
  productSlice: productType[]
}
export interface searchResultsType {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
}
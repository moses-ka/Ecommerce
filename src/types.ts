
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
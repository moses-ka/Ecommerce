
export interface userType {
  user_name: "";
  token: "";
  logging: false;
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
export interface MouseImageTrailProps {
  children: React.ReactNode;
  images: string[];
  renderImageBuffer: number;
  rotationRange: number;
}
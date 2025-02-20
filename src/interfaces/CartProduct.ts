import { Product } from "./Products";

export interface CartProduct extends Product {
  quantity: number;
}

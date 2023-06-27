type MenuId = number;
type CategoryId = number;

export interface Menus {
  [key: MenuId]: MenuInfo;
}

export interface Categories {
  [key: CategoryId]: CategoryInfo;
}

export interface MenuInfo {
  name: string;
  menuId: number;
  price: number;
  imgUrl: string;
  isBest?: boolean;
  hasLarge: boolean;
  hasSmall: boolean;
  hasHot: boolean;
  hasIce: boolean;
}

export interface CategoryInfo {
  categoryName: string;
  categoryId: number;
  menus: MenuInfo[];
}

export interface MenuOrder {
  menuId: number;
  size: string;
  temperature: string;
  amount: number;
}

interface OrderList {
  orderItems: MenuOrder[];
  totalPrice: number;
}

export interface OrderSuccessInfo {
  orderId: number;
  orderNumber: number;
  orderItems: OrderItem[];
  paymentMethod: string;
  totalPrice: number;
  receivedPrice: number;
  remainedPrice: number;
  orderDatetime: string;
}

export interface OrderResult {
  success: boolean;
  data: { orderId: number };
  errorCode: { status: number; code: string; message: string };
}

export interface OrderItem {
  name: string;
  size: string;
  temperature: string;
  amount: number;
}

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
  isBest: boolean;
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

interface OrderSuccessInfo {
  orderId: number;
  orderItems: MenuOrder[];
  paymentMethod: 'card' | 'cash';
  totalPrice: number;
  receivedPrice: number;
  remainedPrice: number;
  orderDateTime: string;
}

interface OrderResult {
  success: boolean;
  errorCode: { status: number; code: string; message: string };
}

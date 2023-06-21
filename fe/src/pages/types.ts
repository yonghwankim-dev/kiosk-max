export interface Menus {
  [key: string]: MenuInfo[];
}

export interface Categories {
  [key: string]: CategoryInfo;
}

export interface MenuInfo {
  name: string;
  menuId: string;
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
  categoryId: string;
  menus: MenuInfo[];
}

export interface MenuOrder {
  menuId: string;
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

export interface AllMenus {
  [key: string]: MenuInfo;
}

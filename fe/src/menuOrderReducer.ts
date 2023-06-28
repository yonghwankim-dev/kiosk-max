import { ProductOrder } from 'pages/types';

export type ActionMap = {
  ADD_ORDER: { newOrder: ProductOrder };
  REMOVE_ORDER: { productId: number };
  RESET: {};
};

export type MenuOrderAction = {
  [Key in keyof ActionMap]: {
    type: Key;
    payload?: ActionMap[Key];
  };
}[keyof ActionMap];

export default function menuOrderReducer(initialOrders: ProductOrder[], action: MenuOrderAction): ProductOrder[] {
  switch (action.type) {
    case 'ADD_ORDER': {
      return [...initialOrders, action.payload!.newOrder];
    }
    case 'REMOVE_ORDER': {
      return initialOrders.filter(order => order.productId !== action.payload!.productId);
    }
    case 'RESET': {
      return [];
    }
    default:
      return initialOrders;
  }
}

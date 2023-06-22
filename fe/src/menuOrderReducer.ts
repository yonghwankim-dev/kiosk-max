import { MenuOrder } from 'pages/types';

export type ActionMap = {
  ADD_ORDER: { newOrder: MenuOrder };
  REMOVE_ORDER: { menuId: number };
  RESET: {};
};

export type MenuOrderAction = {
  [Key in keyof ActionMap]: {
    type: Key;
    payload?: ActionMap[Key];
  };
}[keyof ActionMap];

export default function menuOrderReducer(initialOrders: MenuOrder[], action: MenuOrderAction): MenuOrder[] {
  switch (action.type) {
    case 'ADD_ORDER': {
      return [...initialOrders, action.payload!.newOrder];
    }
    case 'REMOVE_ORDER': {
      return initialOrders.filter(order => order.menuId !== action.payload!.menuId);
    }
    case 'RESET': {
      return [];
    }
    default:
      return initialOrders;
  }
}

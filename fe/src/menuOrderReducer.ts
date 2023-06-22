import { MenuOrder } from 'pages/types';

export interface ActionMap {
  ADD_ORDER: MenuOrder;
  REMOVE_ORDER: MenuOrder;
}

export type MenuOrderAction<T extends keyof ActionMap> = { type: T } & { payload: ActionMap[T] };

export default function menuOrderReducer(initialOrders: MenuOrder[], action: MenuOrderAction<keyof ActionMap>) {
  switch (action.type) {
    case 'ADD_ORDER':
      return [...initialOrders, action.payload];
    case 'REMOVE_ORDER':
  }
}

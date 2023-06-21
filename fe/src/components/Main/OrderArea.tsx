import { MenuInfo } from 'pages/types';
import styles from './Main.module.css';
import MenuItem from './MenuItem';

interface OrderAreaProps {
  orderMenus: { menu: MenuInfo; amount: number }[];
}

export default function OrderArea({ orderMenus }: OrderAreaProps) {
  // TODO: dispatch deleteOrder action 넘기기
  return (
    <div className={styles.orderArea}>
      <div className={styles.orderItems}>
        {orderMenus.map(order => {
          const { menu, amount } = order;
          return (
            <div key={menu.menuId} className={styles.itemWrapper}>
              <div className={styles.amount}>{amount}</div>
              <MenuItem
                classNames={[styles.orderItem]}
                menuName={menu.name}
                menuImg={menu.imgUrl}
                menuPrice={menu.price}
              />
              <button onClick={() => {}}></button>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

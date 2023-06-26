import { MenuInfo } from 'pages/types';
import { useEffect, useRef, useState } from 'react';
import styles from './Main.module.css';
import MenuItem from './MenuItem';

interface OrderAreaProps {
  orderMenus: { menu: MenuInfo; amount: number }[];
  handleRemoveOrder: (menuId: number) => void;
  handleRemoveAllOrders: () => void;
}

export default function Cart({ handleRemoveAllOrders, handleRemoveOrder, orderMenus }: OrderAreaProps) {
  const [seconds, setSeconds] = useState(30);
  const intervalRef: { current: null | NodeJS.Timer } = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  if (seconds <= 0) {
    handleRemoveAllOrders();
  }

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
                menuId={menu.menuId}
                menuName={menu.name}
                menuImg={menu.imgUrl}
                menuPrice={menu.price}
              />
              <button className={styles.menuCancelButton} onClick={() => handleRemoveOrder(menu.menuId)}>
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button onClick={handleRemoveAllOrders} className={styles.allCancelButton}>
          전체취소
        </button>
        <button className={styles.orderButton}>결제하기</button>
        <span className={styles.timer}>결제하기 버튼을 누르지 않으면 {seconds}초 뒤에 메뉴가 전체 취소돼요!</span>
      </div>
    </div>
  );
}

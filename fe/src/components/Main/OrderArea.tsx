import { MenuInfo } from 'pages/types';
import { useEffect, useRef, useState } from 'react';
import styles from './Main.module.css';
import MenuItem from './MenuItem';

interface OrderAreaProps {
  orderMenus: { menu: MenuInfo; amount: number }[];
}

export default function OrderArea({ orderMenus }: OrderAreaProps) {
  const [seconds, setSeconds] = useState(30);
  const intervalRef: { current: null | NodeJS.Timer } = useRef(null);

  useEffect(() => {
    if (seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [seconds]);

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
              <button className={styles.menuCancelButton} onClick={() => {}}>
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <button className={styles.allCancelButton}>전체취소</button>
        <button className={styles.orderButton}>결제하기</button>
        <span className={styles.timer}>결제하기 버튼을 누르지 않으면 {seconds}초 뒤에 메뉴가 전체 취소돼요!</span>
      </div>
    </div>
  );
}

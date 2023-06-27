import PaymentModalContent from 'components/Modal/PaymentModalContent';
import { MenuOrder, Menus } from 'pages/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { formatSameMenuOrderList } from 'utils';
import styles from './Main.module.css';
import MenuItem from './MenuItem';

interface CartProps {
  homeRef: React.RefObject<HTMLDivElement>;
  orderList: MenuOrder[];
  menus: Menus;
  navigate: (path: string) => void;
  handleRemoveOrder: (menuId: number) => void;
  handleRemoveAllOrders: () => void;
}

export default function Cart({
  navigate,
  homeRef,
  handleRemoveAllOrders,
  handleRemoveOrder,
  menus,
  orderList,
}: CartProps) {
  const [seconds, setSeconds] = useState(30);
  const intervalRef: { current: null | NodeJS.Timer } = useRef(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  if (seconds <= 0) {
    handleRemoveAllOrders();
  }

  const formattedOrderList = useMemo(() => formatSameMenuOrderList(orderList), [orderList]);
  const orderMenus = formattedOrderList.map(order => {
    const { menuId, amount } = order;
    const menu = menus[menuId];
    return { menu, amount };
  });
  const totalPrice = useMemo(() => {
    return orderMenus.reduce((acc, cur) => {
      const { menu, amount } = cur;
      return acc + menu.price * amount;
    }, 0);
  }, [orderMenus]);

  const handlePaymentButtonClick = () => {
    clearInterval(intervalRef.current!);
    setShowPaymentModal(true);
  };

  const handlePaymentCancelButtonClick = () => {
    setShowPaymentModal(false);
    setSeconds(30);
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
  };

  return (
    <div className={styles.cart}>
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
        <button className={styles.orderButton} onClick={handlePaymentButtonClick}>
          결제하기
        </button>
        <span className={styles.timer}>결제하기 버튼을 누르지 않으면 {seconds}초 뒤에 메뉴가 전체 취소돼요!</span>
      </div>
      {showPaymentModal &&
        createPortal(
          <PaymentModalContent
            navigate={navigate}
            totalPrice={totalPrice}
            orderList={orderList}
            handlePaymentCancelButtonClick={handlePaymentCancelButtonClick}
          />,
          homeRef.current!
        )}
    </div>
  );
}

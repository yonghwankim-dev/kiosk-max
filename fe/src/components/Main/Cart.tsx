import PaymentModalContent from 'components/Modal/PaymentModalContent';
import { MenuOrder, Menus } from 'pages/types';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { formatSameMenuIdList } from 'utils';
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

  if (seconds <= 0) {
    handleRemoveAllOrders();
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    setSeconds(30);
  }, [orderList]);

  const totalPrice = orderList.reduce((acc, cur) => {
    const { menuId, amount } = cur;
    return acc + menus[menuId].price * amount;
  }, 0);

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

  const formatted = formatSameMenuIdList(orderList);

  return (
    <div className={styles.cart}>
      <div className={styles.orderItems}>
        {formatted.map(order => {
          const { menuId, amount } = order;
          const menu = menus[menuId];
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

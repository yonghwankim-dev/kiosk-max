import MenuItem from 'components/Main/MenuItem';
import styles from './OrderModal.module.css';
import React, { useState } from 'react';

interface MenuInfo {
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

interface OrderDataInfo {
  menuId: string;
  size: string;
  temperature: string;
  amount: number;
}
interface OrderModalProps {
  menu: MenuInfo;
  closeOrderModal: () => void;
  // orderList: [];
  // setOrderList: (data: OrderDataInfo) => void;
}

export default function OrderModal({ menu, closeOrderModal }: OrderModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedTemp, setSelectedTemp] = useState('');
  const [amount, setAmount] = useState(1);

  const sendOrderData = () => {
    const orderData = {
      menuId: menu.menuId,
      size: selectedSize,
      temperature: selectedTemp,
      amount: amount,
    };
    // orderList.push(orderData);
  };

  return (
    <div className={styles.wrap}>
      <CloseButton closeOrderModal={closeOrderModal} />
      <div className={styles.contents}>
        <MenuItem menuName={menu.name} menuImg={menu.imgUrl} menuPrice={menu.price} />
        <MenuOption
          hasLarge={menu.hasLarge}
          hasSmall={menu.hasSmall}
          hasHot={menu.hasHot}
          hasIce={menu.hasIce}
          selectedSize={selectedSize}
          selectedTemp={selectedTemp}
          setSelectedSize={setSelectedSize}
          setSelectedTemp={setSelectedTemp}
          amount={amount}
          setAmount={setAmount}
        />
      </div>
      <AddButton closeOrderModal={closeOrderModal} sendOrderData={sendOrderData} />
    </div>
  );
}

function CloseButton({ closeOrderModal }: { closeOrderModal: () => void }) {
  return (
    <button className={styles.closeButton} type="button" onClick={closeOrderModal}>
      X
    </button>
  );
}

interface MenuOptionProps extends SizeOptionProps, TempOptionProps, AmountCounterProps {
  setSelectedSize: (size: string) => void;
  setSelectedTemp: (temp: string) => void;
}

function MenuOption({
  hasLarge,
  hasSmall,
  hasHot,
  hasIce,
  selectedSize,
  setSelectedSize,
  selectedTemp,
  setSelectedTemp,
  amount,
  setAmount,
}: MenuOptionProps) {
  return (
    <div className={styles.optionWrap}>
      <SizeOption
        hasSmall={hasSmall}
        hasLarge={hasLarge}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <TempOption hasHot={hasHot} hasIce={hasIce} selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} />
      <AmountCounter amount={amount} setAmount={setAmount} />
    </div>
  );
}

interface SizeOptionProps {
  hasLarge: boolean;
  hasSmall: boolean;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

function SizeOption({ hasSmall, hasLarge, selectedSize, setSelectedSize }: SizeOptionProps) {
  return (
    <div className={hasSmall && hasLarge ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasSmall && (
        <button
          onClick={() => setSelectedSize('Small')}
          className={`${styles.optionButton} ${selectedSize === 'Small' ? `${styles.selected}` : ''}`}
        >
          Small
        </button>
      )}
      {hasLarge && (
        <button
          onClick={() => setSelectedSize('Large')}
          className={`${styles.optionButton} ${selectedSize === 'Large' ? `${styles.selected}` : ''}`}
        >
          Large
        </button>
      )}
    </div>
  );
}

interface TempOptionProps {
  hasHot: boolean;
  hasIce: boolean;
  selectedTemp: string;
  setSelectedTemp: (temp: string) => void;
}

function TempOption({ hasHot, hasIce, selectedTemp, setSelectedTemp }: TempOptionProps) {
  return (
    <div className={hasHot && hasIce ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasHot && (
        <button
          onClick={() => setSelectedTemp('Hot')}
          className={`${styles.optionButton} ${selectedTemp === 'Hot' ? `${styles.selected}` : ''}`}
        >
          Hot
        </button>
      )}
      {hasIce && (
        <button
          onClick={() => setSelectedTemp('Ice')}
          className={`${styles.optionButton} ${selectedTemp === 'Ice' ? `${styles.selected}` : ''}`}
        >
          Ice
        </button>
      )}
    </div>
  );
}

interface AmountCounterProps {
  amount: number;
  setAmount: (amount: number) => void;
}

function AmountCounter({ amount, setAmount }: AmountCounterProps) {
  const plusAmount = () => {
    amount === 99 ? setAmount(99) : setAmount(amount + 1);
  };

  const minusAmount = () => {
    amount === 1 ? setAmount(1) : setAmount(amount - 1);
  };

  return (
    <div className={styles.counter}>
      <button onClick={minusAmount}>-</button>
      <div>
        <span>{amount}</span>
      </div>
      <button onClick={plusAmount}>+</button>
    </div>
  );
}

interface AddButtonProps {
  closeOrderModal: () => void;
  sendOrderData: () => void;
}

function AddButton({ closeOrderModal, sendOrderData }: AddButtonProps) {
  return (
    <button
      className={styles.addButton}
      type="button"
      onClick={() => {
        closeOrderModal();
        sendOrderData();
      }}
    >
      담기
    </button>
  );
}

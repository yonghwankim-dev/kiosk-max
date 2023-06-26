import MenuItem from 'components/Main/MenuItem';
import { MenuOrder } from 'pages/types';
import { useState } from 'react';
import ModalStyles from './Modal.module.css';
import styles from './OrderModal.module.css';

interface MenuInfo {
  name: string;
  menuId: number;
  price: number;
  imgUrl: string;
  isBest: boolean;
  hasLarge: boolean;
  hasSmall: boolean;
  hasHot: boolean;
  hasIce: boolean;
}

interface OrderDataInfo {
  menuId: number;
  size: string;
  temperature: string;
  amount: number;
}
interface OrderModalProps {
  menu: MenuInfo;
  closeOrderModal: () => void;
  handleAddOrder: (menuOrder: OrderDataInfo) => void;
}

export default function OrderModal({ menu, closeOrderModal, handleAddOrder }: OrderModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedTemp, setSelectedTemp] = useState('');
  const [amount, setAmount] = useState(1);
  const sendOrderData = (handleAddOrder: (menuOrder: MenuOrder) => void) => {
    const orderData = {
      menuId: menu.menuId,
      size: selectedSize,
      temperature: selectedTemp,
      amount: amount,
    };
    handleAddOrder(orderData);
  };

  return (
    <div className={styles.wrap}>
      <CloseButton closeOrderModal={closeOrderModal} />
      <div className={styles.contents}>
        <MenuItem
          menuId={menu.menuId}
          menuName={menu.name}
          menuImg={menu.imgUrl}
          menuPrice={menu.price}
          hasHot={menu.hasHot}
          hasIce={menu.hasIce}
          hasLarge={menu.hasLarge}
          hasSmall={menu.hasSmall}
        />
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
      <AddButton
        handleAddOrder={handleAddOrder}
        closeOrderModal={closeOrderModal}
        sendOrderData={sendOrderData}
        selectedSize={selectedSize}
        selectedTemp={selectedTemp}
      />
    </div>
  );
}

function CloseButton({ closeOrderModal }: { closeOrderModal: () => void }) {
  return (
    <button className={ModalStyles.closeButton} type="button" onClick={closeOrderModal}>
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
        <OptionButton label={'Small'} isSelected={selectedSize === 'Small'} onClick={() => setSelectedSize('Small')} />
      )}
      {hasLarge && (
        <OptionButton label={'Large'} isSelected={selectedSize === 'Large'} onClick={() => setSelectedSize('Large')} />
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
        <OptionButton label={'Hot'} isSelected={selectedTemp === 'Hot'} onClick={() => setSelectedTemp('Hot')} />
      )}
      {hasIce && (
        <OptionButton label={'Ice'} isSelected={selectedTemp === 'Ice'} onClick={() => setSelectedTemp('Ice')} />
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
  sendOrderData: (handleAddOrder: (menuOrder: MenuOrder) => void) => void;
  handleAddOrder: (menuOrder: MenuOrder) => void;
  selectedSize: string;
  selectedTemp: string;
}

function AddButton({ closeOrderModal, sendOrderData, handleAddOrder, selectedSize, selectedTemp }: AddButtonProps) {
  return (
    <button
      className={styles.addButton}
      type="button"
      onClick={() => {
        if (selectedSize !== '' && selectedTemp !== '') {
          closeOrderModal();
          sendOrderData(handleAddOrder);
        }
      }}
    >
      담기
    </button>
  );
}

interface OptionButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function OptionButton({ label, isSelected, onClick }: OptionButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.optionButton} ${isSelected ? `${styles.selected}` : ''}`}>
      {label}
    </button>
  );
}

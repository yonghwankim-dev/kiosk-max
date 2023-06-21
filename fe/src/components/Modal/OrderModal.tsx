import MenuItem from 'components/Main/MenuItem';
import styles from './OrderModal.module.css';
import React, { useState } from 'react';

interface OrderModalProps {
  menuName: string;
  menuImg: string;
  menuPrice: number;
  handleMenuItemClick?: (menuName: string) => void;
}

export default function OrderModal({ menuName, menuImg, menuPrice, handleMenuItemClick }: OrderModalProps) {
  return (
    <div className={styles.wrap}>
      <CloseButton handleCloseModal={handleMenuItemClick} />
      <div className={styles.contents}>
        <MenuItem menuName={menuName} menuImg={menuImg} menuPrice={menuPrice} />
        <MenuOption hasLarge={true} hasSmall={true} hasHot={true} hasIce={true} />
      </div>
      <AddButton handleAddClick={handleMenuItemClick} />
    </div>
  );
}

function CloseButton({ handleCloseModal }) {
  return (
    <button className={styles.closeButton} type="button" onClick={handleCloseModal}>
      X
    </button>
  );
}

interface MenuOptionProps {
  hasLarge: boolean;
  hasSmall: boolean;
  hasHot: boolean;
  hasIce: boolean;
}

function MenuOption({ hasLarge, hasSmall, hasHot, hasIce }: MenuOptionProps) {
  return (
    <div className={styles.optionWrap}>
      <SizeOption hasSmall={hasSmall} hasLarge={hasLarge} />
      <TempOption hasHot={hasHot} hasIce={hasIce} />
      <div className={styles.counter}>
        <button>-</button>
        <div>
          <span>1</span>
        </div>
        <button>+</button>
      </div>
    </div>
  );
}

interface SizeOptionProps {
  hasLarge: boolean;
  hasSmall: boolean;
}

function SizeOption({ hasSmall, hasLarge }: SizeOptionProps) {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className={hasSmall && hasLarge ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasSmall && (
        <button
          onClick={() => handleSizeSelect('Small')}
          className={selectedSize === 'Small' ? `${styles.optionButton} ${styles.selected}` : ''}
        >
          Small
        </button>
      )}
      {hasLarge && (
        <button
          onClick={() => handleSizeSelect('Large')}
          className={selectedSize === 'Large' ? `${styles.optionButton} ${styles.selected}` : ''}
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
}

function TempOption({ hasHot, hasIce }: TempOptionProps) {
  const [selectedTemp, setSelectedTemp] = useState('');

  const handleTempSelect = (temp: string) => {
    setSelectedTemp(temp);
  };

  return (
    <div className={hasHot && hasIce ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasHot && (
        <button onClick={() => handleTempSelect('Hot')} className={selectedTemp === 'Hot' ? 'selected' : ''}>
          Hot
        </button>
      )}
      {hasIce && (
        <button onClick={() => handleTempSelect('Ice')} className={selectedTemp === 'Ice' ? 'selected' : ''}>
          Ice
        </button>
      )}
    </div>
  );
}

function AddButton({ handleAddClick }) {
  return (
    <button className={styles.addButton} type="button" onClick={handleAddClick}>
      담기
    </button>
  );
}

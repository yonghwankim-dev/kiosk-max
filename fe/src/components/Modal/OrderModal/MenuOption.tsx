import Button from 'components/atoms/Button';
import styles from './OrderModal.module.css';

interface MenuOptionProps extends SizeOptionProps, TempOptionProps, AmountCounterProps {
  setSelectedSize: (size: string) => void;
  setSelectedTemp: (temp: string) => void;
}

interface SizeOptionProps {
  hasLarge: boolean;
  hasSmall: boolean;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

interface TempOptionProps {
  hasHot: boolean;
  hasIce: boolean;
  selectedTemp: string;
  setSelectedTemp: (temp: string) => void;
}

interface AmountCounterProps {
  amount: number;
  setAmount: (amount: number) => void;
}

export default function MenuOption({
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

function SizeOption({ hasSmall, hasLarge, selectedSize, setSelectedSize }: SizeOptionProps) {
  return (
    <div className={hasSmall && hasLarge ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasSmall && (
        <Button
          label={'Small'}
          className={styles.optionButton}
          isSelected={selectedSize === 'Small'}
          selectedClassName={styles.selected}
          onClick={() => setSelectedSize('Small')}
        />
      )}
      {hasLarge && (
        <Button
          label={'Large'}
          className={styles.optionButton}
          isSelected={selectedSize === 'Large'}
          selectedClassName={styles.selected}
          onClick={() => setSelectedSize('Large')}
        />
      )}
    </div>
  );
}

function TempOption({ hasHot, hasIce, selectedTemp, setSelectedTemp }: TempOptionProps) {
  return (
    <div className={hasHot && hasIce ? styles.dualButtonWrap : styles.singleButtonWrap}>
      {hasHot && (
        <Button
          label={'Hot'}
          className={styles.optionButton}
          isSelected={selectedTemp === 'Hot'}
          selectedClassName={styles.selected}
          onClick={() => setSelectedTemp('Hot')}
        />
      )}
      {hasIce && (
        <Button
          label={'Ice'}
          className={styles.optionButton}
          isSelected={selectedTemp === 'Ice'}
          selectedClassName={styles.selected}
          onClick={() => setSelectedTemp('Ice')}
        />
      )}
    </div>
  );
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
      <span>{amount}</span>
      <button onClick={plusAmount}>+</button>
    </div>
  );
}

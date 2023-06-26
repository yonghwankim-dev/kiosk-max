import styles from './PaymentIndicator.module.css';

export function PaymentIndicator() {
  return (
    <div className={styles.paymentIndicator}>
      <Indicator />
      <span>카드 결제중...</span>
    </div>
  );
}

function Indicator() {
  return (
    <div className={styles.indicatorWrap}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

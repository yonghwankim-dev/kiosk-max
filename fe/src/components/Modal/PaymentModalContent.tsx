import modalStyles from './Modal.module.css';
import styles from './PaymentModalContent.module.css';

interface PaymentModalContentProps {
  setPaymentOption: (option: 'card' | 'cash' | 'select') => void;
  handlePaymentCancelButtonClick: () => void;
}

export default function PaymentModalContent({
  setPaymentOption,
  handlePaymentCancelButtonClick,
}: PaymentModalContentProps) {
  return (
    <div className={modalStyles.dim}>
      <div className={modalStyles.modalContent}>
        <button className={modalStyles.closeButton} onClick={handlePaymentCancelButtonClick}>
          X
        </button>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentIcon}>💳</div>
          <button className={styles.paymentOptionButton} onClick={() => setPaymentOption('card')}>
            카드결제
          </button>
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.paymentIcon}>💵</div>
          <button className={styles.paymentOptionButton} onClick={() => setPaymentOption('cash')}>
            현금결제
          </button>
        </div>
      </div>
    </div>
  );
}

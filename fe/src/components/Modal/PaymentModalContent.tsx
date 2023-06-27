import { requestCardOrder } from 'api';
import { MenuOrder } from 'pages/types';
import { useState } from 'react';
import modalStyles from './Modal.module.css';
import { PaymentIndicator } from './PaymentIndicator';
import styles from './PaymentModalContent.module.css';

interface PaymentModalContentProps {
  totalPrice: number;
  handlePaymentCancelButtonClick: () => void;
  orderList: MenuOrder[];
}

export default function PaymentModalContent({
  totalPrice,
  handlePaymentCancelButtonClick,
  orderList,
}: PaymentModalContentProps) {
  const [paymentOption, setPaymentOption] = useState<'card' | 'cash' | 'select'>('select');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isCardPaymentOption = paymentOption === 'card';

  const handleCardPaymentClick = async () => {
    setPaymentOption('card');
    const response = await requestCardOrder(orderList, totalPrice);

    if (!response) {
      setErrorMessage('서버 에러: 잠시 후 결제를 다시 요청해주세요.');
      return;
    }

    setLoading(false);
    switch (response.errorCode.status) {
      case 200: {
        // const orderId = response.data.orderId;
        // window.location.href = `/payment/card/${orderId}`;
        // fetchReceipt(orderId);
        return;
      }
      case 400: {
        setErrorMessage(response.errorCode.message);
        return;
      }
      case 500: {
        setErrorMessage('서버 에러: 잠시 후 결제를 다시 요청해주세요.');
        return;
      }
    }
  };

  return (
    <div className={modalStyles.dim}>
      {paymentOption === 'select' && (
        <div className={modalStyles.modalContent}>
          <button className={modalStyles.closeButton} onClick={handlePaymentCancelButtonClick}>
            X
          </button>
          <div className={styles.paymentMethod}>
            <div className={styles.paymentIcon}>💳</div>
            <button className={styles.paymentOptionButton} onClick={handleCardPaymentClick}>
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
      )}
      {isCardPaymentOption && loading && <PaymentIndicator />}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

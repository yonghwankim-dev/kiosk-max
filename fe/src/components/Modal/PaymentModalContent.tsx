import { requestCardOrder } from 'api';
import { LoadingIndicator } from 'components/LoadingIndicator/LoadingIndicator';
import { ProductOrder } from 'pages/types';
import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import modalStyles from './Modal.module.css';
import styles from './PaymentModalContent.module.css';

interface PaymentModalContentProps {
  totalPrice: number;
  handlePaymentCancelButtonClick: () => void;
  navigate: (path: string) => void;
  orderList: ProductOrder[];
}

export default function PaymentModalContent({
  totalPrice,
  handlePaymentCancelButtonClick,
  navigate,
  orderList,
}: PaymentModalContentProps) {
  const paymentModal = useRef<HTMLDivElement>(null);
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
        const orderId = response.data.orderId;
        navigate(`/receipt/orderId/${orderId}`);
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

  useOutsideClick(paymentModal, handlePaymentCancelButtonClick);

  return (
    <div ref={paymentModal} className={modalStyles.dim}>
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
      {isCardPaymentOption && loading && <LoadingIndicator text="카드 결제중..." />}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

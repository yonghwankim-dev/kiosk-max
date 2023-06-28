import Receipt from 'components/Receipt/Receipt';
import { useEffect, useState } from 'react';
import { fetchReceipt } from '../api';
import styles from './ReceiptPage.module.css';

export default function ReceiptPage({ goHome, orderId }: { goHome: () => void; orderId: number }) {
  const [data, setData] = useState(undefined);
  const [seconds, setSeconds] = useState(10);

  const getReceipt = async () => {
    const fetchedReceipt = await fetchReceipt(orderId);

    if (!fetchedReceipt) return;
    setData(fetchedReceipt);
  };

  useEffect(() => {
    getReceipt();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      goHome();
    }
  }, [seconds, goHome]);

  return (
    data && (
      <div className={styles.receiptPage}>
        {data && <Receipt data={data} />}
        <span className={styles.timerInfo}>(주의: 이 화면은 10초 뒤에 자동으로 사라집니다)</span>
        <span className={styles.seconds}>{`${seconds}초`}</span>
      </div>
    )
  );
}

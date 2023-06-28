import styles from './ReceiptPage.module.css';
import { fetchReceipt } from '../api';
import Receipt from 'components/Receipt/Receipt';
import { useEffect, useRef, useState } from 'react';

export default function ReceiptPage({ orderId }: { orderId: number }) {
  const [data, setData] = useState(undefined);
  const [seconds, setSeconds] = useState(10);
  const intervalRef: { current: null | NodeJS.Timer } = useRef(null);

  const getReceipt = async () => {
    const fetchedReceipt = await fetchReceipt(orderId);

    if (!fetchedReceipt) return;
    setData(fetchedReceipt);
  };

  useEffect(() => {
    getReceipt();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      handleRefreshPage();
    }
  }, [seconds]);

  function handleRefreshPage() {
    window.location.reload();
  }

  return (
    <div className={styles.receiptPage}>
      {data && <Receipt data={data} />}
      <span className={styles.timerInfo}>(주의: 이 화면은 10초 뒤에 자동으로 사라집니다)</span>
      <span className={styles.seconds}>{`${seconds}초`}</span>
    </div>
  );
}

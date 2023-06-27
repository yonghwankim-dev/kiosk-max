import styles from './ReceiptPage.module.css';
import Receipt from 'components/Receipt/Receipt';
import { OrderSuccessInfo } from './types';
import { useEffect, useRef, useState } from 'react';

export default function ReceiptPage({ orderId }: { orderId: number }) {
  const [seconds, setSeconds] = useState(10);
  const intervalRef: { current: null | NodeJS.Timer } = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, []);

  if (seconds <= 0) {
    handleRefreshPage();
  }

  function handleRefreshPage() {
    // 페이지가 새로고침되어 초기 화면이 보이는 로직
    window.location.reload();
  }

  return (
    <div className={styles.receiptPage}>
      {/* <Receipt data={orderSuccessInfo} /> */}
      <span className={styles.timerInfo}>(주의: 이 화면은 10초 뒤에 자동으로 사라집니다)</span>
      <span className={styles.seconds}>{`${seconds}초`}</span>
    </div>
  );
}

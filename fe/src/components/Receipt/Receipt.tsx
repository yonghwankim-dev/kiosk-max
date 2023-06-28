import styles from './Receipt.module.css';
import { OrderSuccessInfo } from '../../pages/types';
import { calculateTotalAmount } from '../../utils';

export default function Receipt({ data }: { data: OrderSuccessInfo }) {
  const paymentMethod = data.paymentMethod === 'cash' ? '현금' : '카드';
  const isCashPayment = data.paymentMethod === 'cash';
  const calculatedAmount = calculateTotalAmount(data);
  const keys = Object.keys(calculatedAmount);
  const mappedArray = keys.map(key => ({
    name: key,
    amount: calculatedAmount[key],
  }));

  return (
    <div className={styles.receiptWrap}>
      <h1 className={styles.orderNumber}>{`주문번호 ${data.orderNumber}`}</h1>
      <span className={styles.orderTime}>{`${data.orderDatetime}`}</span>
      <div className={styles.orderLists}>
        {mappedArray.map((list: OrderListProps, index: number) => {
          return <OrderList key={index} list={list} />;
        })}
      </div>
      <div className={styles.paymentInfo}>
        <span>{`결제방식: ${paymentMethod}`}</span>
        {isCashPayment && <span>{`투입금액: ${data.receivedPrice}`}</span>}
        <span>{`총 결제금액: ${data.totalPrice}`}</span>
        {isCashPayment && <span>{`거스름돈: ${data.remainedPrice}`}</span>}
      </div>
    </div>
  );
}

interface OrderListProps {
  name: string;
  amount: number;
}

function OrderList({ list }: { list: OrderListProps }) {
  return (
    <div className={styles.orderList}>
      <span>{`${list.name}`}</span>
      <span>{`${list.amount}`}</span>
    </div>
  );
}

import styles from './Main.module.css';

interface MenuItemProps {
  menuName: string;
  menuImg: string;
  menuPrice: number;
  classNames?: string[];
  handleMenuItemClick?: (menuName: string) => void;
  openOrderModal: () => void;
}

export default function MenuItem({
  menuName,
  menuImg,
  menuPrice,
  handleMenuItemClick,
  openOrderModal,
  classNames = [],
}: MenuItemProps) {
  return (
    <div
      onClick={() => {
        openOrderModal();
        handleMenuItemClick && handleMenuItemClick(menuName);
      }}
      className={styles.menuItem + ' ' + classNames.join(' ')}
    >
      <img src={menuImg} alt={menuName} />
      <span>{menuName}</span>
      <span>{menuPrice}</span>
    </div>
  );
}

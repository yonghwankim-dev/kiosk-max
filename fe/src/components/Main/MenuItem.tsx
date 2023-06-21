import styles from './Main.module.css';

interface MenuItemProps {
  menuName: string;
  menuImg: string;
  menuPrice: number;
  handleMenuItemClick?: (menuName: string) => void;
}

export default function MenuItem({ menuName, menuImg, menuPrice, handleMenuItemClick }: MenuItemProps) {
  return (
    <div onClick={() => handleMenuItemClick && handleMenuItemClick(menuName)} className={styles.menuItem}>
      <img src={menuImg} alt={menuName} />
      <span>{menuName}</span>
      <span>{menuPrice}</span>
    </div>
  );
}

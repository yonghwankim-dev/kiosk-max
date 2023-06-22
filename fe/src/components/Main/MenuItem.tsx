import styles from './Main.module.css';

interface MenuItemProps {
  menuId: string;
  menuName: string;
  menuImg: string;
  menuPrice: number;
  classNames?: string[];
  openOrderModal?: () => void;
  setSelectedMenu?: any;
  handleMenuItemClick?: (menuName: string) => void;
}

export default function MenuItem({
  menuId,
  menuName,
  menuImg,
  menuPrice,
  openOrderModal,
  setSelectedMenu,
  handleMenuItemClick,
  classNames = [],
}: MenuItemProps) {
  const clickMenu = () => {
    setSelectedMenu &&
      setSelectedMenu({
        name: menuName,
        menuId: menuId,
        price: menuPrice,
        imgUrl: menuImg,
      });
    openOrderModal && openOrderModal();
  };

  return (
    <div
      onClick={() => {
        clickMenu();
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

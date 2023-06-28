import styles from './Main.module.css';

interface MenuItemProps {
  menuId: number;
  menuName: string;
  menuImg: string;
  menuPrice: number;
  isBest?: boolean;
  hasLarge?: boolean;
  hasSmall?: boolean;
  hasHot?: boolean;
  hasIce?: boolean;
  classNames?: string[];
  openOrderModal?: () => void;
  setSelectedMenu?: any;
}

export default function MenuItem({
  menuId,
  menuName,
  menuImg,
  menuPrice,
  isBest,
  hasLarge,
  hasSmall,
  hasHot,
  hasIce,
  openOrderModal,
  setSelectedMenu,
  classNames = [],
}: MenuItemProps) {
  const clickMenu = () => {
    setSelectedMenu &&
      setSelectedMenu({
        name: menuName,
        menuId: menuId,
        price: menuPrice,
        imgUrl: menuImg,
        hasLarge: hasLarge,
        hasSmall: hasSmall,
        hasHot: hasHot,
        hasIce: hasIce,
      });
    openOrderModal && openOrderModal();
  };

  return (
    <div
      onClick={() => {
        clickMenu();
      }}
      className={styles.menuItem + ' ' + classNames.join(' ')}
    >
      {isBest && <div className={styles.best}>인기</div>}
      <img src={menuImg} alt={menuName} />
      <span>{menuName}</span>
      <span>{menuPrice}</span>
    </div>
  );
}

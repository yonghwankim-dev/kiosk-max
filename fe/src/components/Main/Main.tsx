import OrderModal from 'components/Modal/OrderModal';
import { MenuInfo, MenuOrder } from 'pages/types';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Main.module.css';
import MenuItem from './MenuItem';

interface MainProps {
  handleAddOrder: (menuOrder: MenuOrder) => void;
  menus: MenuInfo[];
}

export default function Main({ handleAddOrder, menus }: MainProps) {
  const [isOrderModalOpen, setOrderModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [selectedMenu, setSelectedMenu]: [MenuInfo, Dispatch<MenuInfo>] = useState<MenuInfo>({
    name: '',
    menuId: 0,
    price: 0,
    imgUrl: '',
    isBest: true,
    hasLarge: true,
    hasSmall: true,
    hasHot: true,
    hasIce: true,
  });

  const openOrderModal = () => {
    setOrderModal(true);
  };

  const closeOrderModal = () => {
    setOrderModal(false);
  };

  return (
    <div className={styles.main}>
      {menus.map(menu => {
        return (
          <>
            {menu.isBest && <div className={styles.best}>인기</div>}
            <MenuItem
              key={menu.menuId}
              menuId={menu.menuId}
              menuName={menu.name}
              menuImg={menu.imgUrl}
              menuPrice={menu.price}
              hasLarge={menu.hasLarge}
              hasSmall={menu.hasSmall}
              hasHot={menu.hasHot}
              hasIce={menu.hasIce}
              openOrderModal={openOrderModal}
              setSelectedMenu={setSelectedMenu}
            />
          </>
        );
      })}
      {isOrderModalOpen && (
        <dialog open className={styles.OrderModal}>
          <OrderModal handleAddOrder={handleAddOrder} menu={selectedMenu} closeOrderModal={closeOrderModal} />
        </dialog>
      )}
    </div>
  );
}

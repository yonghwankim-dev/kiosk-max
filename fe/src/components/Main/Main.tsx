import { MenuInfo } from 'pages/types';
import styles from './Main.module.css';
import MenuItem from './MenuItem';
import OrderModal from 'components/Modal/OrderModal';
import { Dispatch, SetStateAction, useState } from 'react';

interface MainProps {
  menus: MenuInfo[];
}

export default function Main({ menus }: MainProps) {
  const [isOrderModalOpen, setOrderModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const openOrderModal = () => {
    setOrderModal(true);
  };

  const closeOrderModal = () => {
    setOrderModal(false);
  };

  const menu = {
    name: '프리미엄 블렌드 아메리카노',
    menuId: '1',
    price: 4900,
    imgUrl: 'assets/MenuImg/Americano.png',
    isBest: true,
    hasLarge: true,
    hasSmall: true,
    hasHot: true,
    hasIce: true,
  };

  const menuItems = menus.map(menu => (
    <MenuItem
      key={menu.menuId}
      menuName={menu.name}
      menuImg={menu.imgUrl}
      menuPrice={menu.price}
      openOrderModal={openOrderModal}
    />
  ));
  return (
    <div className={styles.main}>
      {menuItems}
      {isOrderModalOpen && (
        <dialog open>
          <OrderModal menu={menu} openOrderModal={openOrderModal} closeOrderModal={closeOrderModal} />
        </dialog>
      )}
    </div>
  );
}

import { MenuInfo } from 'pages/types';
import styles from './Main.module.css';
import MenuItem from './MenuItem';
import OrderModal from 'components/Modal/OrderModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface MainProps {
  menus: MenuInfo[];
}

export default function Main({ menus }: MainProps) {
  const [isOrderModalOpen, setOrderModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [selectedMenu, setSelectedMenu]: [MenuInfo, Dispatch<MenuInfo>] = useState<MenuInfo>({
    name: '',
    menuId: '',
    price: 0,
    imgUrl: '',
    isBest: true,
    hasLarge: true,
    hasSmall: true,
    hasHot: true,
    hasIce: true,
  });

  // const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if ((e.currentTarget as HTMLDivElement).tagName === 'DIV') {
  //     openOrderModal();
  //   }
  // };

  const openOrderModal = () => {
    setOrderModal(true);
  };

  const closeOrderModal = () => {
    setOrderModal(false);
  };

  const menuItems = menus.map(menu => (
    <MenuItem
      key={menu.menuId}
      menuName={menu.name}
      menuImg={menu.imgUrl}
      menuPrice={menu.price}
      openOrderModal={openOrderModal}
      setSelectedMenu={setSelectedMenu}
    />
  ));
  return (
    <div className={styles.main}>
      {menuItems}
      {isOrderModalOpen && (
        <dialog open>
          <OrderModal menu={selectedMenu} closeOrderModal={closeOrderModal} />
        </dialog>
      )}
    </div>
  );
}

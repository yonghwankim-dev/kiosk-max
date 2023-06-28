import OrderModal from 'components/Modal/OrderModal';
import { MenuInfo, MenuOrder } from 'pages/types';
import { useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import ModalStyles from '../Modal/Modal.module.css';
import styles from './Main.module.css';
import MenuItem from './MenuItem';

interface MainProps {
  handleAddOrder: (menuOrder: MenuOrder) => void;
  menus: MenuInfo[];
}

export default function Main({ handleAddOrder, menus }: MainProps) {
  const orderModal = useRef<HTMLDivElement>(null);
  const [isOrderModalOpen, setOrderModal] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuInfo | undefined>(undefined);

  const openOrderModal = () => setOrderModal(true);
  const closeOrderModal = () => setOrderModal(false);

  useOutsideClick(orderModal, closeOrderModal);

  return (
    <div className={styles.main}>
      {menus.map(menu => (
        <MenuItem
          key={menu.menuId}
          menuId={menu.menuId}
          menuName={menu.name}
          isBest={menu.isBest}
          menuImg={menu.imgUrl}
          menuPrice={menu.price}
          hasLarge={menu.hasLarge}
          hasSmall={menu.hasSmall}
          hasHot={menu.hasHot}
          hasIce={menu.hasIce}
          openOrderModal={openOrderModal}
          setSelectedMenu={setSelectedMenu}
        />
      ))}
      {isOrderModalOpen && selectedMenu && (
        <div ref={orderModal} className={`${ModalStyles.dim} ${styles.mainDim}`}>
          <OrderModal handleAddOrder={handleAddOrder} menu={selectedMenu} closeOrderModal={closeOrderModal} />
        </div>
      )}
    </div>
  );
}

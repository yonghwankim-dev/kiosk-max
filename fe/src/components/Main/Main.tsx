import { MenuInfo } from 'pages/types';
import styles from './Main.module.css';
import MenuItem from './MenuItem';

interface MainProps {
  menus: MenuInfo[];
}

export default function Main({ menus }: MainProps) {
  const menuItems = menus.map(menu => (
    <MenuItem key={menu.menuId} menuName={menu.name} menuImg={menu.imgUrl} menuPrice={menu.price} />
  ));
  return <div className={styles.main}>{menuItems}</div>;
}

interface MenuItemProps {
  handleMenuItemClick: (menuName: string) => void;
  menuName: string;
  menuImg: string;
  menuPrice: string;
}

export function MenuItem({ handleMenuItemClick, menuName, menuImg, menuPrice }: MenuItemProps) {
  return (
    <div onClick={() => handleMenuItemClick(menuName)} className="menu-item">
      <img src={menuImg} alt={menuName} />
      <span>{menuName}</span>
      <span>{menuPrice}</span>
    </div>
  );
}

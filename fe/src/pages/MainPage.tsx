import Main from 'components/Main';
import OrderArea from 'components/Main/OrderArea';
import CategoryNavbar from 'components/Navbar';
import menuOrderReducer, { MenuOrderAction } from 'menuOrderReducer';
import { Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { formatAllCategories, formatAllMenus, formatOrderList } from 'utils';
import { CategoryInfo, MenuOrder } from './types';

export default function MainPage() {
  const [menuData, setMenuData]: [CategoryInfo[], Dispatch<SetStateAction<[]>>] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [orderList, dispatch]: [MenuOrder[], Dispatch<MenuOrderAction>] = useReducer(menuOrderReducer, []);

  useEffect(() => {
    fetch('data/categories.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setSelectedCategoryId(data[0].categoryId);
      });
  }, []);

  const isMenuDataEmpty = Object.keys(menuData).length === 0;
  const isOrderListEmpty = orderList.length === 0;
  const formattedMenuData = formatAllCategories(menuData);
  const categoryNavbarInfo = menuData.map((category: CategoryInfo) => {
    return { categoryId: category.categoryId, categoryName: category.categoryName };
  });
  const currentMenus = selectedCategoryId && formattedMenuData[selectedCategoryId].menus;
  const formattedOrderList = formatOrderList(orderList, (item, order) => item.menuId === order.menuId);
  const formattedMenus = formatAllMenus(menuData);

  const orderMenus = formattedOrderList.map(order => {
    const { menuId, amount } = order;
    const menu = formattedMenus[menuId];

    return { menu, amount };
  });

  const handleCategoryClick = (clickCategoryId: string) => {
    setSelectedCategoryId(clickCategoryId);
  };
  const handleAddOrder = (menuOrder: MenuOrder) => {
    dispatch({ type: 'ADD_ORDER', payload: { newOrder: menuOrder } });
  };
  const handleRemoveOrder = (menuId: number) => {
    dispatch({ type: 'REMOVE_ORDER', payload: { menuId: menuId } });
  };

  const handleRemoveAllOrders = () => dispatch({ type: 'RESET' });

  return (
    <>
      <CategoryNavbar
        selectedCategoryId={selectedCategoryId}
        categories={categoryNavbarInfo}
        handleCategoryClick={handleCategoryClick}
      />
      {currentMenus && <Main handleAddOrder={handleAddOrder} menus={currentMenus} />}
      {!isMenuDataEmpty && !isOrderListEmpty && (
        <OrderArea
          orderMenus={orderMenus}
          handleRemoveOrder={handleRemoveOrder}
          handleRemoveAllOrders={handleRemoveAllOrders}
        />
      )}
    </>
  );
}

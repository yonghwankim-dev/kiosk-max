import Main from 'components/Main';
import OrderArea from 'components/Main/OrderArea';
import CategoryNavbar from 'components/Navbar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { formatAllCategories, formatAllMenus, formatOrderList } from 'utils';
import { CategoryInfo, MenuOrder } from './types';

function menuOrderReducer() {}

export default function MainPage() {
  const [menuData, setMenuData]: [CategoryInfo[], Dispatch<SetStateAction<[]>>] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId]: [string, Dispatch<SetStateAction<string>>] = useState('');
  // const [orderList, dispatch]: [MenuOrder[], DispatchWithoutAction] = useReducer(menuOrderReducer, []);
  const orderList: MenuOrder[] = [
    {
      menuId: '1',
      size: 'small',
      temperature: 'hot',
      amount: 2,
    },
    {
      menuId: '1',
      size: 'small',
      temperature: 'cold',
      amount: 1,
    },
    {
      menuId: '1',
      size: 'small',
      temperature: 'cold',
      amount: 1,
    },
    {
      menuId: '18',
      size: 'large',
      temperature: 'cold',
      amount: 3,
    },
  ];

  useEffect(() => {
    fetch('data/categories.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setSelectedCategoryId(data[0].categoryId);
      });
  }, []);

  const formattedMenuData = formatAllCategories(menuData);
  const categoryNavbarInfo = menuData.map((category: CategoryInfo) => {
    return { categoryId: category.categoryId, categoryName: category.categoryName };
  });
  const currentMenus = selectedCategoryId && formattedMenuData[selectedCategoryId].menus;
  const formattedOrderList = formatOrderList(orderList);
  const formattedMenus = formatAllMenus(menuData);

  const orderMenus = formattedOrderList.map(order => {
    const { menuId, amount } = order;
    const menu = formattedMenus[menuId];

    return { menu, amount };
  });

  const handleCategoryClick = (clickCategoryId: string) => {
    setSelectedCategoryId(clickCategoryId);
  };

  return (
    <>
      <CategoryNavbar
        selectedCategoryId={selectedCategoryId}
        categories={categoryNavbarInfo}
        handleCategoryClick={handleCategoryClick}
      />
      {currentMenus && <Main menus={currentMenus} />}
      {Object.keys(menuData).length && orderList.length && <OrderArea orderMenus={orderMenus} />}
    </>
  );
}

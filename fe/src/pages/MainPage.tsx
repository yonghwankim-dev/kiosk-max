import Main from 'components/Main';
import Cart from 'components/Main/Cart';
import CategoryNavbar from 'components/Navbar';
import menuOrderReducer from 'menuOrderReducer';
import { useMemo, useReducer, useRef, useState } from 'react';
import { formatAllCategories, formatAllMenus, formatOrderList } from 'utils';
import styles from './MainPage.module.css';
import { CategoryInfo, MenuOrder } from './types';

interface MainPageProps {
  allMenus: CategoryInfo[];
}

export default function MainPage({ allMenus }: MainPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(allMenus[0].categoryId);
  const [orderList, dispatch] = useReducer(menuOrderReducer, []);
  const mainPageRef = useRef<HTMLDivElement>(null);

  const categoryNavbarInfo = useMemo(
    () =>
      allMenus.map((category: CategoryInfo) => {
        return { categoryId: category.categoryId, categoryName: category.categoryName };
      }),
    [allMenus]
  );
  const formattedMenuData = useMemo(() => formatAllCategories(allMenus), [allMenus]);
  const formattedMenus = useMemo(() => formatAllMenus(allMenus), [allMenus]);
  const currentMenus = formattedMenuData[selectedCategoryId].menus;
  const formattedOrderList = useMemo(() => formatOrderList(orderList), [orderList]);
  const orderMenus = formattedOrderList.map(order => {
    const { menuId, amount } = order;
    const menu = formattedMenus[menuId];
    return { menu, amount };
  });
  const isOrderListEmpty = orderList.length === 0;

  const handleCategoryClick = (clickCategoryId: string) => setSelectedCategoryId(clickCategoryId);
  const handleAddOrder = (menuOrder: MenuOrder) => dispatch({ type: 'ADD_ORDER', payload: { newOrder: menuOrder } });
  const handleRemoveOrder = (menuId: number) => dispatch({ type: 'REMOVE_ORDER', payload: { menuId: menuId } });
  const handleRemoveAllOrders = () => dispatch({ type: 'RESET' });

  return (
    <div ref={mainPageRef} className={styles.mainPage}>
      <CategoryNavbar
        selectedCategoryId={selectedCategoryId}
        categories={categoryNavbarInfo}
        handleCategoryClick={handleCategoryClick}
      />
      <Main handleAddOrder={handleAddOrder} menus={currentMenus} />
      {!isOrderListEmpty && (
        <Cart
          mainPageRef={mainPageRef}
          orderMenus={orderMenus}
          handleRemoveOrder={handleRemoveOrder}
          handleRemoveAllOrders={handleRemoveAllOrders}
        />
      )}
    </div>
  );
}

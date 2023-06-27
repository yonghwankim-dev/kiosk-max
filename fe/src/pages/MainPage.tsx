import Main from 'components/Main';
import Cart from 'components/Main/Cart';
import CategoryNavbar from 'components/Navbar';
import menuOrderReducer from 'menuOrderReducer';
import { useMemo, useReducer, useRef, useState } from 'react';
import { formatAllCategories, formatProducts } from 'utils';
import styles from './MainPage.module.css';
import { CategoryInfo, MenuOrder } from './types';

interface MainPageProps {
  products: CategoryInfo[];
}

export default function MainPage({ products }: MainPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(products[0].categoryId);
  const [orderList, dispatch] = useReducer(menuOrderReducer, []);
  const mainPageRef = useRef<HTMLDivElement>(null);

  const categoryNavbarInfo = useMemo(
    () =>
      products.map((category: CategoryInfo) => {
        return { categoryId: category.categoryId, categoryName: category.categoryName };
      }),
    [products]
  );
  const formattedMenuData = useMemo(() => formatAllCategories(products), [products]);
  const formattedMenus = useMemo(() => formatProducts(products), [products]);
  const currentMenus = formattedMenuData[selectedCategoryId].menus;
  const isOrderListEmpty = orderList.length === 0;

  const handleCategoryClick = (clickCategoryId: number) => setSelectedCategoryId(clickCategoryId);
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
          menus={formattedMenus}
          orderList={orderList}
          handleRemoveOrder={handleRemoveOrder}
          handleRemoveAllOrders={handleRemoveAllOrders}
        />
      )}
    </div>
  );
}

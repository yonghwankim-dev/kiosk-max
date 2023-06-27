import { LoadingIndicator } from 'components/LoadingIndicator/LoadingIndicator';
import Main from 'components/Main';
import Cart from 'components/Main/Cart';
import CategoryNavbar from 'components/Navbar';
import useProducts from 'hooks/useProducts';
import menuOrderReducer from 'menuOrderReducer';
import { useReducer, useRef, useState } from 'react';
import { formatAllCategories, formatProducts } from 'utils';
import styles from './Home.module.css';
import { CategoryInfo, MenuOrder } from './types';

interface HomeProps {
  navigate: (path: string) => void;
}

export default function Home({ navigate }: HomeProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [products, loading, error] = useProducts(setSelectedCategoryId);
  const [orderList, dispatch] = useReducer(menuOrderReducer, []);
  const homeRef = useRef<HTMLDivElement>(null);

  console.log('home orderList', orderList);
  const categoryNavbarInfo = products.map((category: CategoryInfo) => {
    return { categoryId: category.categoryId, categoryName: category.categoryName };
  });
  const formattedMenuData = formatAllCategories(products);
  const formattedMenus = formatProducts(products);
  const currentMenus = selectedCategoryId && formattedMenuData[selectedCategoryId];
  const isOrderListEmpty = orderList.length === 0;

  const handleCategoryClick = (clickCategoryId: number) => setSelectedCategoryId(clickCategoryId);
  const handleAddOrder = (menuOrder: MenuOrder) => dispatch({ type: 'ADD_ORDER', payload: { newOrder: menuOrder } });
  const handleRemoveOrder = (menuId: number) => dispatch({ type: 'REMOVE_ORDER', payload: { menuId: menuId } });
  const handleRemoveAllOrders = () => dispatch({ type: 'RESET' });

  if (loading) return <LoadingIndicator text="메뉴를 불러오는 중입니다. 잠시만 기다려주세요!" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div ref={homeRef} className={styles.home}>
      {selectedCategoryId && (
        <CategoryNavbar
          selectedCategoryId={selectedCategoryId}
          categories={categoryNavbarInfo}
          handleCategoryClick={handleCategoryClick}
        />
      )}
      {currentMenus && <Main handleAddOrder={handleAddOrder} menus={currentMenus.menus} />}
      {!isOrderListEmpty && (
        <Cart
          navigate={navigate}
          homeRef={homeRef}
          menus={formattedMenus}
          orderList={orderList}
          handleRemoveOrder={handleRemoveOrder}
          handleRemoveAllOrders={handleRemoveAllOrders}
        />
      )}
    </div>
  );
}

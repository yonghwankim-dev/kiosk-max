import { fetchMenus } from 'api';
import Main from 'components/Main';
import Cart from 'components/Main/Cart';
import CategoryNavbar from 'components/Navbar';
import menuOrderReducer from 'menuOrderReducer';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { formatAllCategories, formatProducts } from 'utils';
import styles from './Home.module.css';
import { CategoryInfo, MenuOrder } from './types';

interface MainPageProps {
  navigate: (path: string) => void;
}

export default function MainPage({ navigate }: MainPageProps) {
  const [products, setProducts] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getMenus = async () => {
    const menuData = await fetchMenus();

    if (!menuData) {
      return;
    }

    setProducts(menuData);
    setSelectedCategoryId(menuData[0].categoryId);
  };

  useEffect(() => {
    getMenus();
  }, []);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
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
  const currentMenus = formattedMenuData[selectedCategoryId];
  const isOrderListEmpty = orderList.length === 0;

  const handleCategoryClick = (clickCategoryId: number) => setSelectedCategoryId(clickCategoryId);
  const handleAddOrder = (menuOrder: MenuOrder) => dispatch({ type: 'ADD_ORDER', payload: { newOrder: menuOrder } });
  const handleRemoveOrder = (menuId: number) => dispatch({ type: 'REMOVE_ORDER', payload: { menuId: menuId } });
  const handleRemoveAllOrders = () => dispatch({ type: 'RESET' });

  return (
    <div ref={mainPageRef} className={styles.home}>
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

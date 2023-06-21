import Main from 'components/Main';
import CategoryNavbar from 'components/Navbar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Categories, CategoryInfo } from './types';

export default function MainPage() {
  const [menuData, setMenuData]: [CategoryInfo[], Dispatch<SetStateAction<[]>>] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId]: [string, Dispatch<SetStateAction<string>>] = useState('');
  // const [orderList, setOrderList] = useState([]);

  const formatMenuData = (menuData: CategoryInfo[]) => {
    const formattedMenuData: Categories = {};
    menuData.forEach(category => {
      formattedMenuData[category.categoryId] = category;
    });
    return formattedMenuData;
  };

  useEffect(() => {
    fetch('data/categories.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        setSelectedCategoryId(data[0].categoryId);
      });
  }, []);

  const formattedMenuData = formatMenuData(menuData);
  const categoryNavbarInfo = menuData.map((category: CategoryInfo) => {
    return { categoryId: category.categoryId, categoryName: category.categoryName };
  });
  const currentMenus = selectedCategoryId && formattedMenuData[selectedCategoryId].menus;
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
    </>
  );
}

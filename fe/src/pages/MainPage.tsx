import CategoryNavbar from 'components/CategoryNavbar';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const [menuData, setMenuData] = useState({});

  useEffect(() => {
    fetch('data/menus.json')
      .then(res => res.json())
      .then(data => setMenuData(data));
  }, []);

  const categoryNames = Object.keys(menuData);
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <>
      <CategoryNavbar
        handleCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
        categoryNames={categoryNames}
      />
      {/* <Main /> */}
    </>
  );
}

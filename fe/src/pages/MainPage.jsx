import { useEffect, useState } from 'react';

interface Menus {
  [category: string]: Menu[];
}

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

interface CategoryButtonProps {
  categoryName: string;
  selectedCategory: string;
  handleCategoryClick: (categoryName: string) => void;
}

function CategoryButton({ handleCategoryClick, categoryName, selectedCategory }: CategoryButtonProps) {
  return (
    <button
      onClick={() => handleCategoryClick(categoryName)}
      key={categoryName}
      className={categoryName === selectedCategory ? 'active' : ''}
    >
      {categoryName}
    </button>
  );
}

interface CategoryNavbarProps {
  handleCategoryClick: (categoryName: string) => void;
  selectedCategory: string;
  categoryNames: string[];
}

function CategoryNavbar({ handleCategoryClick, selectedCategory, categoryNames }: CategoryNavbarProps) {
  return (
    <div>
      {categoryNames.map(categoryName => (
        <CategoryButton
          selectedCategory={selectedCategory}
          categoryName={categoryName}
          key={categoryName}
          handleCategoryClick={handleCategoryClick}
        />
      ))}
    </div>
  );
}

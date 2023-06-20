import CategoryButton from './CategoryButton';

interface CategoryNavbarProps {
  handleCategoryClick: (categoryName: string) => void;
  selectedCategory: string;
  categoryNames: string[];
}

export default function CategoryNavbar({ handleCategoryClick, selectedCategory, categoryNames }: CategoryNavbarProps) {
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

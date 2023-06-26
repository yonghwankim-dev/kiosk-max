import CategoryButton from './CategoryButton';
import styles from './CategoryNavbar.module.css';

interface CategoryNavbarProps {
  handleCategoryClick: (categoryName: string) => void;
  selectedCategoryId: string;
  categories: { categoryId: string; categoryName: string }[];
}

export default function CategoryNavbar({ handleCategoryClick, selectedCategoryId, categories }: CategoryNavbarProps) {
  return (
    <div className={styles.categoryNavbar}>
      {categories.map(category => (
        <CategoryButton
          id={category.categoryId}
          isActive={selectedCategoryId === category.categoryId}
          categoryName={category.categoryName}
          key={category.categoryId}
          handleCategoryClick={handleCategoryClick}
        />
      ))}
    </div>
  );
}

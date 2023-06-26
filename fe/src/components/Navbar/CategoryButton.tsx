import styles from './CategoryNavbar.module.css';

interface CategoryButtonProps {
  id: string;
  categoryName: string;
  isActive: boolean;
  handleCategoryClick: (categoryName: string) => void;
}

export default function CategoryButton({ id, handleCategoryClick, categoryName, isActive }: CategoryButtonProps) {
  const className = styles.categoryButton;

  return (
    <button onClick={() => handleCategoryClick(id)} className={isActive ? `${className} ${styles.active}` : className}>
      {categoryName}
    </button>
  );
}

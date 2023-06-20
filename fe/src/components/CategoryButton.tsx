interface CategoryButtonProps {
  categoryName: string;
  selectedCategory: string;
  handleCategoryClick: (categoryName: string) => void;
}

export default function CategoryButton({ handleCategoryClick, categoryName, selectedCategory }: CategoryButtonProps) {
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

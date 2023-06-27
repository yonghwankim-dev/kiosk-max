import { fetchMenus } from 'api';
import { CategoryInfo } from 'pages/types';
import { useEffect, useState } from 'react';

export default function useProducts(
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number>>
): [CategoryInfo[], boolean, string | undefined] {
  const [products, setProducts] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getProducts = async () => {
      const productData = await fetchMenus();
      setLoading(false);

      if (typeof productData === 'undefined') {
        setError('Failed to fetch menus');
        return;
      }

      setProducts(productData);
      setSelectedCategoryId(productData[0].categoryId);
    };

    getProducts();
  }, [setSelectedCategoryId]);

  return [products, loading, error];
}

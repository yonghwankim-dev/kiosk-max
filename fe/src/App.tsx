import { fetchMenus } from 'api';
import MainPage from 'pages/MainPage';
import { CategoryInfo } from 'pages/types';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [menuData, setMenuData] = useState<CategoryInfo[]>([]);

  const getMenus = async () => {
    const menuData = await fetchMenus();
    if (!menuData) {
      return;
    }
    setMenuData(menuData);
    setLoading(false);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <div className="App">{loading ? <div>메뉴를 불러오고 있습니다...</div> : <MainPage products={menuData} />}</div>
  );
}

export default App;

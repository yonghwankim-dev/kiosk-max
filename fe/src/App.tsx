import { fetchMenus } from 'api';
import MainPage from 'pages/MainPage';
import { CategoryInfo } from 'pages/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
  const [menuData, setMenuData]: [CategoryInfo[], Dispatch<SetStateAction<[]>>] = useState([]);

  const getMenus = async () => {
    const menuData = await fetchMenus();
    setMenuData(menuData);
    setLoading(false);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <div className="App">{loading ? <div>메뉴를 불러오고 있습니다...</div> : <MainPage allMenus={menuData} />}</div>
  );
}

export default App;

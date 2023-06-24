import { AllMenus, Categories, CategoryInfo, MenuInfo, MenuOrder } from 'pages/types';

export const formatAllMenus = (menuData: CategoryInfo[]) => {
  const allMenus: AllMenus = {};
  menuData.forEach((category: CategoryInfo) => {
    category.menus.forEach((menu: MenuInfo) => {
      allMenus[menu.menuId] = menu;
    });
  });

  return allMenus;
};

export const formatAllCategories = (menuData: CategoryInfo[]) => {
  const formattedMenuData: Categories = {};
  menuData.forEach(category => {
    formattedMenuData[category.categoryId] = category;
  });

  return formattedMenuData;
};

export function formatOrderList(orderList: MenuOrder[]) {
  const formattedOrderList: MenuOrder[] = [];
  orderList.forEach(order => {
    const { menuId, size, temperature, amount } = order;
    const orderItem = formattedOrderList.find(item => item.menuId === menuId);
    if (orderItem) {
      orderItem.amount += amount;
    } else {
      formattedOrderList.push({ menuId, size, temperature, amount });
    }
  });

  return formattedOrderList;
}

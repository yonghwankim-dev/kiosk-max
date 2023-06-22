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

export function formatOrderList(orderList: MenuOrder[], findCondition: (item: MenuOrder, order: MenuOrder) => boolean) {
  const formattedOrderList: MenuOrder[] = [];

  orderList.forEach(order => {
    const { amount } = order;
    const orderItem = formattedOrderList.find(item => findCondition(item, order));

    if (orderItem) {
      orderItem.amount += amount;
    } else {
      formattedOrderList.push(order);
    }
  });

  return formattedOrderList;
}

const BASE_API_DOMAIN = new URL(`https://050ac41b-0add-475f-9551-31bf41119bcc.mock.pstmn.io`);

const fetchJSON = async (url: URL) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const fetchMenus = async () => {
  try {
    const url = new URL('products', BASE_API_DOMAIN);
    return await fetchJSON(url);
  } catch (error) {
    console.error(error);
  }
};

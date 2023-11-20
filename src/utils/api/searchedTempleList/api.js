






export const axiousInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
    },
  });

export const getSearchedTemple = async query => {
    try {
      let result = await axiousInstance.get(
        `${endpoints.MORE_TO_EXPLORE}?page=0&pageSize=20&query=${query}`,
        {retry: 5, retryDelay: 3000},
      );
      return result;
    } catch (error) {
      return error;
    }
  };
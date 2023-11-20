





export const axiousInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
    },
  });



export const getFavoritesList = async (pageNo, pageSize) => {
    try {
      let result = await axiousInstance.get(
        `${endpoints.GET_FOLLOW_LIST}?page=${pageNo}&pageSize=${pageSize}`,
      );
      return result;
    } catch (error) {
      return error;
    }
  };
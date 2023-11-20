



export const axiousInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
  },
});

export const getFollowSearchList = async query => {
  try {
    let result = await axiousInstance.get(
      `${endpoints.GET_FOLLOW_LIST}?page=0&pageSize=100&query=${query}`,
    );
    return result;
  } catch (error) {
    return error;
  }
};

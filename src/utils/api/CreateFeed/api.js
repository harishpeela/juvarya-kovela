

export const axiousInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Basic ' + base64.encode('skillrat-client:skillrat@2021'),
    },
  });

export const createFeed = async data => {
    try {
      let result = await axiousInstance.post(`${endpoints.CREATE_FEED}`, data);
      return result;
    } catch (error) {
      return error;
    }
  };
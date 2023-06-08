import {getAuthTokenDetails} from './preferences/localStorage';
let Token = getAuthTokenDetails();
export const createFeedAccess = ({profId, custId}) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    `http://20.255.59.150:9096/jtprofile/admin/verify?profileId=${profId}&customerId=${custId}`,
    requestOptions,
  )
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

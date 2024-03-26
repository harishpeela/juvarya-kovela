import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import {statusBarHeight} from '../../utils/config/config';
import {Store_Comp, Store_SignUp} from '../../components';
import {signIn} from '../../utils/api';
import axios from 'axios';
import qs from 'qs';
import base64 from 'react-native-base64';
import { BROADLEAF_AUTH } from '../../utils/api/api';
import { saveBraodLeafClientCredentials, getBroadLeafAuthTokenDetails } from '../../utils/preferences/localStorage';
const Store = ({navigation}) => {
  const [results, setResults] = useState([]);
  const storeResponce = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer 6fe28f92-3333-4078-984a-903787c6fa37',
    );
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://4.240.68.49:8080/api/v1/product/store/products?storeId=1&pageNo=0&pageSize=100',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          setResults(result?.data?.products);
          console.log('result', result);
        }
      })
      .catch(error => console.error(error));
  };
  const StoreSignIn = async () => {
    let payload = {
      username: 'harishharish16@juvarya.com',
      password: 'Abc@123',
    };
    console.log('payload', payload);
    let responce = await signIn(payload);
    console.log('res ==><><><>', responce?.data);
  };
  const getToken = async () => {
    let token = await getBroadLeafAuthTokenDetails()
    console.log('token==', token);
    const url = BROADLEAF_AUTH;
    const data = {
      grant_type: "client_credentials",
    };
    const auth = {
      username: "skillrat-client",
      password: "skillrat@2021",
    };
    const authHeader = `Basic ${base64.encode(`${auth.username}:${auth.password}`)}`;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": authHeader,
      },
      data: qs.stringify(data),
      url,
    };
 
    try {
      const response = await axios(options);
      console.log('response==========>', response.data);
      if(response?.data){
        saveBraodLeafClientCredentials(response?.data?.token_type, response?.data?.access_token)
      }
    } catch (error) {
      console.log('error-->', error);
    }
  };
 

  useEffect(() => {
    storeResponce();
    getToken();
  }, []);
  //   console.log('results', results);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 60, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Store'} navigation={navigation} />
      </View>
      <View>
        <Store_Comp data={results} />
      </View>
      <View>
        <Store_SignUp />
      </View>
    </View>
  );
};
export default Store;

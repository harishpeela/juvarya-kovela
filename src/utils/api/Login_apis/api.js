import { View, Text } from 'react-native'
import React from 'react'

export const authAxiousInstance1 = axios.create({
    baseURL: BASEURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const loginUser1 = async data => {
    try {
      let result = await authAxiousInstance1.post(
        `${endpoints.NEW_SIGN_IN}`,
        data,
      );
      return result;
    } catch (error) {
      console.log('error in login', error);
      return error;
    }
  };
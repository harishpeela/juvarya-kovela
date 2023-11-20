import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


export const axiousInstanceNewSignIn = axios.create({
    baseURL: BASEURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });


export const NewRegistesrUser = async data => {
    try {
      let result = await axiousInstanceNewSignIn.post(
        `${endpoints.NEW_SIGN_UP}`,
        data,
      );
      return result;
    } catch (error) {
      return error;
    }
  };
  
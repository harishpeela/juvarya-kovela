import {StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { TopBarCard2 } from '../../components/topBar1/topBarCard'
import { GetProfileToDoList } from '../../utils/api';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';

const ToDoList = ({ navigation }) => {
  const [data, setData] = useState([])
  const getToDoList = async () => {
    try {
      const result = await GetProfileToDoList(0, 100)
      setData(result?.data?.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToDoList()
  }, [])

  return (
    <View style={{ flex: 1,backgroundColor:'white' }}>
      <View style={{ height: '15%' }}>
        <TopBarCard2 back={true}
          txt={'ToDo List'}
          navigation={navigation}
          marginLeft={'22%'}
        />
      </View>
      <View style={{padding:10,marginBottom:40}}>
      <FlatList
        data={data}
        keyExtractor={({ item, index }) => index}
        renderItem={({ item }) => (

          <View style={styles.listItemContainer}>
            <Text style={{color:'orange',fontFamily:'Poppins-Medium',fontSize:16}}>{`\u2022 ${item?.description}`}</Text>
          </View>

        )}
      />
      </View>
    </View>
  )
}

export default ToDoList



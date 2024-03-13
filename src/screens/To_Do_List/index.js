import { StyleSheet, Text, View } from 'react-native'
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ minHeight: 70, marginTop: '3%' }}>
        <TopBarCard2
          txt={'ToDo List'}
          back={true}
          navigation={navigation}
        >
        </TopBarCard2>
      </View>
      <View style={{ padding: 10, marginBottom: 40 }}>
        <FlatList
          data={data}
          keyExtractor={({ item, index }) => index}
          renderItem={({ item }) => (

            <View style={styles.listItemContainer}>
              <Text style={{ color: 'orange', fontFamily: 'Poppins-Medium', fontSize: 16 }}>{`\u2022 ${item?.description}`}</Text>
            </View>

          )}
        />
      </View>
    </View>
  )
}

export default ToDoList



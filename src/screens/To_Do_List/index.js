import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { TopBarCard2 } from '../../components/topBar1/topBarCard'
import { GetProfileToDoList } from '../../utils/api';
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';





const ToDoList = ({ navigation }) => {

const [data,setData] = useState([])

  const getToDoList = async () => {
    try{
      const result = await GetProfileToDoList(0, 100)
      setData(result?.data?.data)
    }
    catch(error){
      console.log(error)
    }
    

  }

  useEffect(() => {
    getToDoList()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '15%' }}>
        <TopBarCard2 back={true}
          txt={'ToDoList'}
          navigation={navigation}
        />
      </View>
      <FlatList
      data={data}
      keyExtractor={({item,index}) =>index}
      renderItem={({item})=>(
      
          <View style={{marginTop:50}}>
            <Text>{item?.description}</Text>
          </View>
        
      )}
      />
    </View>
  )
}

export default ToDoList



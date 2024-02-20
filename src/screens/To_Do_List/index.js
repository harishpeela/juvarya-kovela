import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TopBarCard2 } from '../../components/topBar1/topBarCard'



const ToDoList = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '15%' }}>
        <TopBarCard2 back={true}
          txt={'ToDoList'}
          navigation={navigation}
        />
      </View>
    </View>
  )
}

export default ToDoList

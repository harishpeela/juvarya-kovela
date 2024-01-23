import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
export default function ProfileDonations({navigation}) {
  return (
    <View style={{minHeight:'15%'}}>
    <TopBarCard2
        back={true}
        txt={'user donations'}
        navigation={navigation}
        
        
    />
</View>
  )
}

const styles = StyleSheet.create({})
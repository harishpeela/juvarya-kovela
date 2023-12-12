import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MemberShipCard } from '../../components'

const ProfileMemberShips = () => {
    const data = {
        item:{
            type:"Average"
        }
    }
  return (
    <View>
         <MemberShipCard />
    </View>
  )
}

export default ProfileMemberShips


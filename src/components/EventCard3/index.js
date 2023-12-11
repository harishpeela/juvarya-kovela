import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './Styles'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { colors } from '../../common'
import Icon3 from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const EventCard3 = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg",
            }}
            style={styles.Image}
          />
        </View>
        {/* <View style={styles.info}>
          <View style={styles.dateAndLocation}>
            <View style={styles.locationIcon}>
              <Icon2 name='location' color={colors.red1} size={22} />
              <Text style={[color = colors.gray, styles.locText]}>Vizag</Text>
            </View>
          </View>
        </View> */}
        <Text style={styles.eventText} >Event Name</Text>
        <Text style={styles.dateText}>07 July</Text>
        {/* <Icon3 name='like1' size={26} color={colors.orangeColor} /> */}
    </TouchableOpacity>
  )
}

export default EventCard3


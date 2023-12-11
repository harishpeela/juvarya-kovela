import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { styles } from './Styles'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { colors } from '../../common'
import Icon3 from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const EventCard3 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg",
            }}
            style={styles.Image}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.eventText} >Event Name</Text>
          <View style={styles.dateAndLocation}>
            <Text style={styles.dateText}>07 July</Text>
            <View style={styles.locationIcon}>
              <Icon2 name='location' color={colors.red1} size={22} />
              <Text style={[color = colors.gray, styles.locText]}>Vizag</Text>
            </View>
          </View>
        </View>
      </View>

      <Icon3 name='like1' size={26} color={colors.orangeColor} />


    </View>
  )
}

export default EventCard3


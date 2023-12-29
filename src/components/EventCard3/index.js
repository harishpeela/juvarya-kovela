import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { styles } from './Styles'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { colors } from '../../common'
import Icon3 from 'react-native-vector-icons/AntDesign'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Feather from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontistoIcon from 'react-native-vector-icons/Fontisto';


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
          <View style={styles.EventNameAndIcon}>
          <Text style={styles.eventText} >Event Names</Text>

          {/* <Icon3 name='like1' size={20} color={colors.orangeColor} /> */}
          <View style={styles.editIconContainer}>
                       <EntypoIcon name="pencil"  color={colors.white} size={12} />
              </View>
          </View>
          
          <View style={styles.dateAndLocation}>
            <View style={styles.textContainer}>
            <Text style={styles.dateText}>Anakapalli AnakapalliAnakapalliAnakapalliAnakapalliAnakapalliAnakapalli is a residential neighborhood  Visakhapatnam</Text>
            </View>
            <View style={styles.calenderDate}>
            <FontistoIcon style={{color:colors.orangeColor}} name="date" size={14} />
            <Text style={styles.eventDate}>
              28-12-2023
            </Text>
            </View>
           
            
          </View>
        </View>
      </View>

      


    </View>
  )
}

export default EventCard3


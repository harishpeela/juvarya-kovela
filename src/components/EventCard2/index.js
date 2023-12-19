import { Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/EvilIcons'
import { allTexts, colors } from '../../common'

const EventCard2 = ({ navigation }) => {
    return (

        <TouchableOpacity
        style={styles.container}
        onPress={() => {
            navigation.navigate(allTexts.screenNames.eventsDetails,{
                navigation:navigation,
            })
        }}
        >
          

                <Image
                    source={{
                        uri: "https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg",
                    }}
                    style={styles.Image}
                />
                <View style={styles.container2}>


                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText} >Thu, 30 Nov</Text>
                    </View>
                    <View style={styles.secondContainer}>
                        <Text style={[styles.festivalText]} >Ganesh festival</Text>
                        <View style={styles.locationIcon}>
                            <Icon name='location' color={colors.red1} size={20} />
                            <Text style={{ color: colors.gray }}>Vizag</Text>
                        </View>


                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={[styles.text]} >description adsasd asd asdasdas</Text>
                    </View>
                </View>

        </TouchableOpacity>
    )
}

export default EventCard2


import { Text, View, Image } from 'react-native'
import React from 'react'
import { styles } from './styles'

const EventCard2 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image
                    source={{
                        uri: "https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg",
                    }}
                    style={styles.Image}
                />
            </View>
            <View style={styles.hrLine} />
            <View style={styles.rightContainer}>
                <Text style={[styles.text]} >Name: (Ganesh chaturthi)</Text>
                <Text style={[styles.text]} >Name: (EventName)</Text>
                <Text style={[styles.text]} >Name: (EventName)</Text>
                <Text style={[styles.text]} >Community: (CommunityName)</Text>
                <View style={styles.dateContainer}>
                    <Text style={[styles.text]} >Start:(start Date)</Text>
                    <Text style={[styles.text]} >End:(End Date)</Text>
                </View>
            </View>
        </View>
    )
}

export default EventCard2


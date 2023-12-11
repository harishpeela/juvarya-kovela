import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { PrimaryButton } from '../primary-button';
import { colors, fontSize } from '../../common';
import Icon from 'react-native-vector-icons/FontAwesome';

const FollowersListCard3 = ({
    donation,
    data,
    name,
    location,
    date,
    onPress,
    img,
    rs,
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.listItemContainer}>
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: img
                                ? img
                                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
                        }}
                        style={styles.image}
                    />
                    <Image
                        source={{
                            uri: img
                                ? img
                                : 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1688133109358jai hanuman.jpg',
                        }}
                        style={styles.backgroundImage}
                    />
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View style={styles.listFirstItem}>
                    <View style={styles.textContainer}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.firstName}>
                            Harsha
                        </Text>
                        <View style={styles.textContainer2}>
                            <Text style={styles.premiumText}>Premium Member</Text>
                        </View>

                    </View>

                </View>
            </View>
        </TouchableOpacity>
    );
};
export default FollowersListCard3
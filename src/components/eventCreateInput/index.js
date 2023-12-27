import React from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from "../../common";
const EventInput = ({ lable, placeholder, height, calendar, location, onChangeText, value, errorText, error}) => {
    return (
        <View>
            <Text style={styles.label}>{lable}</Text>
            <View style={{ 
                ...styles.input, 
                height: height, 
                width: '80%', 
                flexDirection: calendar || location ? 'row' : 'column', 
                alignItems: calendar || location ? 'center' : 'flex-start'
                }}>
                {calendar && (
                    <TouchableOpacity>
                      <FontAwesome name='calendar' size={20} color={colors.orangeColor} style={{marginLeft: 10}} />
                    </TouchableOpacity>
                )}
                {location && (
                    <TouchableOpacity>
                      <EvilIcons name='location' size={25} color={colors.orangeColor} style={{marginLeft: 10}} />
                    </TouchableOpacity>
                )}
                <TextInput value={value} placeholder={placeholder} style={{ marginLeft: 5 }}  onChangeText={onChangeText} />
            </View>
        </View>
    );
};
export default EventInput;
const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    label: {
        marginLeft: '10%',
        marginVertical: '2%',
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
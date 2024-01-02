import React from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { colors } from "../../common";
export  const EventInput = ({ lable, placeholder, height, calendar, location, onChangeText, value, onPressCalendar}) => {
    const isDarkMode = useColorScheme() === 'dark';

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
                    <TouchableOpacity onPress={onPressCalendar}>
                      <FontAwesome name='calendar' size={20} color={colors.orangeColor} style={{marginLeft: 10}} />
                    </TouchableOpacity>
                )}
                {location && (
                    <TouchableOpacity>
                      <EvilIcons name='location' size={20} color={colors.orangeColor} style={{marginLeft: 10}}  />
                    </TouchableOpacity>
                )}
                <TextInput value={value} placeholder={placeholder} placeholderTextColor={isDarkMode ? 'gray' : 'gray'}  style={{ marginLeft: 5, width: '90%'}} multiline={true}  onChangeText={onChangeText} />
            </View>
        </View>
    );
};
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
export  const EventInput1 = ({ lable, placeholder, height, calendar, location, onChangeText, onPressCalendar2, onPressCalendar, value1, value2}) => {
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
                    <TouchableOpacity onPress={onPressCalendar}>
                      <FontAwesome name='calendar' size={20} color={colors.orangeColor} style={{marginLeft: 10}} />
                    </TouchableOpacity>
                    <TextInput value={value1} placeholder={placeholder}  style={{ marginLeft: 5, width: '40%'}} onChangeText={onChangeText} />

                    <TouchableOpacity onPress={onPressCalendar2}>
                      <FontAwesome name='calendar' size={20} color={colors.orangeColor} style={{marginLeft: 10}} />
                    </TouchableOpacity>
                <TextInput value={value2} placeholder={'to-Date'}  style={{ marginLeft: 5, width: '40%'}}  onChangeText={onChangeText} />
            </View>
        </View>
    );
};
export default EventInput1;
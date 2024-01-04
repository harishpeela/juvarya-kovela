import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';

import {colors} from '../../common';
export const EventInput = ({
  lable,
  placeholder,
  height,
  user,
  calendar,
  gender,
  email,
  gotra,
  location,
  phone,
  onChangeText,
  keyboardType,
  pincode,
  value,
  onPressCalendar,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isRoleSelected, setIsRoleSelected] = useState('');
  const [dropDownError, setDropDownError] = useState(true);
  const [genderValue, setGenderValue] = useState('');

  return (
    <View>
      <Text style={styles.label}>{lable}</Text>
      <View
        style={{
          ...styles.input,
          height: height,
          width: '80%',
          flexDirection:
            calendar ||
            location ||
            user ||
            email ||
            phone ||
            gender ||
            gotra ||
            pincode
              ? 'row'
              : 'column',
          alignItems: calendar || location ? 'center' : 'flex-start',
        }}>
        {/* <MaterialIcons name="temple-buddhist" size={25} color={'red'} /> */}
        {calendar && (
          <TouchableOpacity onPress={onPressCalendar}>
            <FontAwesome
              name="calendar"
              size={20}
              color={colors.orangeColor}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        )}
        {location && (
          <TouchableOpacity>
            <EvilIcons
              name="location"
              size={20}
              color={colors.orangeColor}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        )}
        {email && (
          <TouchableOpacity>
            <Fontisto
              name="email"
              size={20}
              color={colors.orangeColor}
              style={{marginLeft: 10, top: 15}}
            />
          </TouchableOpacity>
        )}
        {gender && (
          <TouchableOpacity>
            <FontAwesome
              name="transgender-alt"
              size={20}
              color={colors.orangeColor}
              style={{marginLeft: 10, top: 15}}
            />
          </TouchableOpacity>
        )}
        {pincode && (
          <TouchableOpacity>
            <FontAwesome
              name="lock"
              size={20}
              color={colors.orangeColor}
              style={{marginLeft: 10, top: 15}}
            />
          </TouchableOpacity>
        )}
        {gotra && (
          <TouchableOpacity>
            <AntDesign
              name="user"
              size={20}
              color={colors.orangeColor}
              style={{marginLeft: 10, top: 15}}
            />
          </TouchableOpacity>
        )}
        {user && (
          <TouchableOpacity>
            <AntDesign
              name="user"
              size={20}
              color={colors.orangeColor}
              style={{marginLeft: 10, top: 15}}
            />
          </TouchableOpacity>
        )}
        {phone && (
          <TouchableOpacity>
            <FontAwesome
              name="phone"
              size={20}
              color={colors.orangeColor}
              style={{
                marginLeft: 15,
                top: 15,
              }}
            />
          </TouchableOpacity>
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          style={{
            marginLeft: 15,
            width: '90%',
          }}
          multiline={true}
          onChangeText={onChangeText}
        />
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
  },
});
export const EventInput1 = ({
  lable,
  placeholder,
  height,
  calendar,
  location,
  onChangeText,
  onPressCalendar2,
  onPressCalendar,
  value1,
  value2,
}) => {
  return (
    <View>
      <Text style={styles.label}>{lable}</Text>
      <View
        style={{
          ...styles.input,
          height: height,
          width: '80%',
          flexDirection: calendar || location ? 'row' : 'column',
          alignItems: calendar || location ? 'center' : 'flex-start',
        }}>
        <TouchableOpacity onPress={onPressCalendar}>
          <FontAwesome
            name="calendar"
            size={20}
            color={colors.orangeColor}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <TextInput
          value={value1}
          placeholder={placeholder}
          style={{marginLeft: 5, width: '40%'}}
          onChangeText={onChangeText}
        />

        <TouchableOpacity onPress={onPressCalendar2}>
          <FontAwesome
            name="calendar"
            size={20}
            color={colors.orangeColor}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <TextInput
          value={value2}
          placeholder={'to-Date'}
          style={{marginLeft: 5, width: '40%', flexDirection: 'row'}}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
export const EventInput2 = ({
  lable,
  placeholder,
  height,
  calendar,
  location,
  onChangeText,
  onPressCalendar,
  value1,
}) => {
  return (
    <View>
      <Text style={styles.label}>{lable}</Text>
      <View
        style={{
          ...styles.input,
          height: height,
          width: '70%',
          marginRight: 30,
          flexDirection: calendar || location ? 'row' : 'column',
          alignItems: calendar || location ? 'center' : 'flex-start',
        }}>
        <TouchableOpacity onPress={onPressCalendar}>
          <FontAwesome
            name="calendar"
            size={20}
            color={colors.orangeColor}
            style={{marginLeft: 10}}
          />
        </TouchableOpacity>
        <TextInput
          value={value1}
          placeholder={placeholder}
          style={{
            marginLeft: 15,
            width: '50%',
            flexDirection: 'row',
          }}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};
export default EventInput1;

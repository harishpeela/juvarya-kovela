/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  useColorScheme,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BackgroundImage, BackHeaderNew} from '../../components';
import {styles} from './styles';
import Snackbar from 'react-native-snackbar';
import {MemberShipCreate} from '../../utils/api';
import Icon from 'react-native-vector-icons/AntDesign';
import {allTexts, colors} from '../../common';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import { statusBarHeight } from '../../utils/config/config';

const AddMemebershipDetails = ({route, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {jtProfileId, roleId} = route.params || {};
  const [memType, setMemType] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [memberShipError, setMemberShipError] = useState(false);
  const [memName, setMemName] = useState('');
  const [memberShip, setMemberShip] = useState(false);
  const submit = async () => {
    const payload = {
      name: memName,
      profileId: jtProfileId,
      type: memType,
    };
    console.log('payload', payload);
    try {
      let result = await MemberShipCreate(payload);
      if (result.status === 200) {
        setMemberShip(result?.data);
        console.log(result?.data);
        Alert.alert('Success', `membership was added`, [
          {
            text: 'Ok',
            onPress: () =>
              navigation.navigate(allTexts.tabNames.search, {
                roleId: roleId,
              }),
          },
        ]);
      } else {
        setMemberShip(0);
      }
    } catch (error) {
      console.log('Error in sending the request', error);
      Alert.alert(
        'Error',
        'Failed to Create MemberShip...Please try again.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    }
  };
  const onPressDone = () => {
    if (!memType && !memName) {
      console.log('1');
      setTypeError(true);
      setMemberShipError(true);
    } else if (!memName && memType) {
      console.log('2');
      setMemberShipError(true);
      setTypeError(false);
    } else if (memName && !memType) {
      setMemberShipError(false);
      setTypeError(true);
    } else if (memType && memName) {
      console.log('3');
      setTypeError(false);
      setMemberShipError(false);
      submit();
    }
  };

  let donationType = ['BASIC', 'Primium'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        {/* <BackHeaderNew
          txt={'Add Membership'}
          onPress={() => navigation.goBack()}
          isArrow={true}
        /> */}
        <View style={{height:60, marginTop: statusBarHeight}}>
          <TopBarCard2
            back={true}
            txt={'Add Membership'}
            navigation={navigation}
          />
        </View>
        <View style={{marginTop: '35%', padding: '5%'}}>
          <SelectDropdown
            data={donationType}
            defaultValue={memType}
            buttonTextStyle={styles.DTextStyle}
            onSelect={e => setMemType(e)}
            buttonStyle={styles.DbuttonStyle}
            defaultButtonText="Type"
            renderDropdownIcon={() => (
              <View>
                <Icon color={'black'} size={20} name="down" />
              </View>
            )}
          />
          {typeError && (
            <Text style={{alignSelf: 'center', color: colors.orangeColor}}>
              please select type{' '}
            </Text>
          )}
          <TextInput
            style={{
              ...styles.inputTextStyle,
              color: isDarkMode ? 'black' : 'black',
            }}
            placeholder="MemberShip Name"
            onChangeText={v => setMemName(v)}
            value={memName}
            placeholderTextColor={isDarkMode ? 'black' : 'black'}
          />
          {memberShipError && (
            <Text style={{alignSelf: 'center', color: colors.orangeColor}}>
              please select type{' '}
            </Text>
          )}
          <TouchableOpacity onPress={onPressDone} style={styles.btnContainer}>
            <Text style={styles.loginText}>{'CREATE'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AddMemebershipDetails;

/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Alert} from 'react-native';
import {styles} from './styles';
import {
  BackHeaderNew,
  Donation_first_Tab,
  Donation_Second_Tab,
  Donation_Third_Tab,
} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import {DonationsPost} from '../../utils/api';
import {allTexts} from '../../common';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
const Donations = ({route, navigation}) => {
  const [value, setValue] = useState(value);
  const [dropValue, setDropValue] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let Data = [
    {id: 1, rs: '101'},
    {id: 3, rs: '301'},
    {id: 5, rs: '501'},
  ];
  let donationType = [
    'Food',
    'Prasadam',
    'Temple',
    'Roads',
    'Education',
    'Others',
  ];
  const {userDetails} = useContext(ApplicationContext);
  const {data} = route.params || {};
  const PostDonations = async () => {
    let payload = {
      donation: value,
      description: dropValue,
      email: userDetails?.email,
      jtProfile: data?.jtProfile,
    };
    console.log('payload', payload);
    try {
      if (value === '0' || value === undefined) {
        alert('please enter amount');
      } else if (!dropValue) {
        alert('please select donation type');
      } else {
        let result = await DonationsPost(payload);
        if (result) {
          console.log('message', result?.data);
          Alert.alert('Success', result?.data?.message, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.bottomTab, {
                  data: data,
                }),
            },
          ]);
        }
        console.log('result of post donations', result?.data);
      }
    } catch (error) {
      console.log('error in donations api', error);
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TopBarCard2
            back={true}
            txt={'Add Donation'}
            navigation={navigation}
          />
        </View>
        <Donation_first_Tab title={data?.name} rating={'3.5 (18 rating)'} />
        <View>
          <View style={styles.secondTab}>
            <Donation_Second_Tab
              VALUE={a => setValue(a)}
              Data={Data}
              onChange={e => setValue(e)}
              dropData={donationType}
              onSelect={e => setDropValue(e)}
              valueRs={value}
              onChangeEmail={e => setEmail(e)}
              valueEmail={email}
              onChangeName={e => setName(e)}
              valueName={name}
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Donation_Third_Tab />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => PostDonations()}>
        <Text style={styles.butText}> Donate ₹ {value} </Text>
      </TouchableOpacity>
    </>
  );
};
export default Donations;

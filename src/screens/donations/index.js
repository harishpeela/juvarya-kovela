/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Alert} from 'react-native';
import {styles} from './styles';
import {
  BackHeaderNew,
  Donation_first_Tab,
  Donation_Second_Tab,
  Donation_Third_Tab,
} from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import {DonationsPost, getDonationTypes, getDonationsList, GetProfilePic} from '../../utils/api';
import {allTexts} from '../../common';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
const Donations = ({route, navigation}) => {
  const [value, setValue] = useState(value);
  const [dropValue, setDropValue] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [topDonation, setTopDonation] = useState([]);
  const [donationLoader, setDonationLoader] = useState(false);
  const donTypes = async() => {
    let result = await getDonationTypes(0, 100);
    console.log('types of donations', result?.data);
  }
  let Data = [
    {id: 1, rs: '101'},
    {id: 3, rs: '301'},
    {id: 5, rs: '501'},
  ];
  let donationType = [
    'ANNADHANAM',
    'Vigrah Seva',
    'Sadhu Bhojan',
    'Gau Seva',
  ];
  const {userDetails} = useContext(ApplicationContext);
  const {data} = route.params || {};
  // console.log('data =====><', data);
  const PostDonations = async () => {
    let payload = {
      donation: value,
      description: dropValue,
      email: email,
      jtProfile: data?.jtProfile,
      contactNumber: userDetails?.primaryContact,
      type: dropValue,
      active: !isChecked,
      donorName: name,
    };
    console.log('payload', payload);
    try {
      if (value === '0' || value === undefined) {
        alert('please enter amount');
      } else if (!dropValue) {
        alert('please select donation type');
      } else if(email === '' ){
        alert('please enter email')
      } else if(name === ''){
        alert('please enetr name')
      }
      else {
        let result = await DonationsPost(payload);
        if (result) {
          console.log('message', result?.data);
          Alert.alert('Success', result?.data?.message, [
            {
              text: 'Ok',
              onPress: () =>
                {navigation.navigate(allTexts.screenNames.donationslist, {
                  data: data,
                });
              }
            },
          ]);
        }
        console.log('result of post donations', result?.data);
      }
    } catch (error) {
      console.log('error in donations api', error);
    }
  };
  const profilePic = async (e) => {
    let responce = await GetProfilePic(e.email);
    if(responce){
      setTopDonation(responce);
      setDonationLoader(false);
    }
  }
  const dontationValue = async () => {
    let id = data?.jtProfile;
    console.log(id, 'kkk');
    setDonationLoader(true);
    let result = await getDonationsList(id, 0, 20);
    console.log('donation card', result.data);
    if (result) {
      let res = result?.data?.data;
      if(res){
        res.map(e =>  {
          profilePic(e);
        })
      }
      console.log('loader donation 1', donationLoader);
    } else {
      setDonationLoader(false);
      console.log('loader donation 2', donationLoader);
    }
  };
useEffect(() => {
  donTypes();
  dontationValue();
},[ ]);
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
              onPressCheck={() => setIsChecked(!isChecked)}
              isChecked={isChecked}
              donationText={`top donation by ${topDonation[0]?.donorName}`}
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

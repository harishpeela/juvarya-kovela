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
import {
  DonationsPost,
  getDonationTypes,
  getTopDonation,
  GetProfilePic,
  DonationsType,
} from '../../utils/api';
import {allTexts} from '../../common';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
import { statusBarHeight } from '../../utils/config/config';

const Donations = ({route, navigation}) => {
  const [value, setValue] = useState(value);
  const [dropValue, setDropValue] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [topDonation, setTopDonation] = useState([]);
  const [donationLoader, setDonationLoader] = useState(false);
  const {userDetails} = useContext(ApplicationContext);
  const {data} = route.params || {};
  // console.log('data =====><', data);
  const [typeData, setTypeData] = useState();
  const donTypes = async () => {
    let result = await getDonationTypes(0, 100);
    // console.log('types of donations', result?.data);
  };
  let Data = [
    {id: 1, rs: '101'},
    {id: 3, rs: '301'},
    {id: 5, rs: '501'},
  ];
  let donationType = ['Food', 'Event', 'Permanent'];

  const donType = async e => {
    // console.log('type', e);
    let result = await DonationsType(e);
    console.log('res of donat6ype', result?.data);
    if (result?.data) {
      setTypeData(result?.data);
    }
  };
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
        alert('Please Enter Amount');
      } else if (!dropValue) {
        alert('Please Select Donation Type');
      } else if (email === '') {
        alert('Please Enter Email');
      } else if (name === '') {
        alert('Please Enter Name');
      } else {
        let result = await DonationsPost(payload);
        if (result) {
          console.log('message', result?.data);
          Alert.alert('Success', 'Donation Saved', [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate(allTexts.screenNames.donationslist, {
                  message: 200,
                  data: data,
                });
                console.log('logg');
                // dontationValue();
              },
            },
          ]);
        }
      }
    } catch (error) {
      console.log('error in donations api', error);
    }
  };
  const profilePic = async e => {
    let responce = await GetProfilePic(e.email);
    // console.log('responce', responce.data);
    if (responce) {
      let res = {...e, url: responce?.data?.url};
      setTopDonation(array => [...array, res]);
      setDonationLoader(false);
    }
  };
  const dontationValue = async () => {
    let id = data?.jtProfile;
    setDonationLoader(true);
    let result = await getTopDonation(id, 0, 20);
    // console.log('donation card', result.data);
    if (result) {
      let res = result?.data?.data;
      if (res) {
        res.map(e => {
          profilePic(e);
        });
      }
    } else {
      setDonationLoader(false);
    }
  };
  useEffect(() => {
    donTypes();
    dontationValue();
  }, []);
  return (
      <View style={styles.container}>
        <View style={{height:60, marginTop:statusBarHeight}}>
          <TopBarCard2
            back={true}
            txt={'Add Donation'}
            navigation={navigation}
          />
        </View>
        <ScrollView style={{marginTop:'2%'}}>
        <Donation_first_Tab img={data?.logo} title={data?.name} rating={'3.5 (18 rating)'} />
          <View style={styles.secondTab}>
            <Donation_Second_Tab
              VALUE={a => setValue(a)}
              Data={Data}
              onChange={e => setValue(e)}
              dropData={donationType}
              onSelect={e => {
                setDropValue(e);
                donType(e);
              }}
              valueRs={value}
              onChangeEmail={e => setEmail(e)}
              valueEmail={email}
              onChangeName={e => setName(e)}
              valueName={name}
              onPressCheck={() => setIsChecked(!isChecked)}
              isChecked={isChecked}
              donationText={
                topDonation[0]?.donorName
                  ? `Top Donation By ${topDonation[0]?.donorName}`
                  : topDonation[0]?.name
                    ? topDonation[0]?.name
                    : 'No donations yet'
              }
              // donationText={`top donation by ${topDonation[0]?.donorName ? topDonation[0]?.donorName : topDonation[0]?.name ? topDonation[0]?.name : 'no donations yet'}`}
              donurl={topDonation[0]?.url}
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Donation_Third_Tab
              url={
                typeData?.mediaList
                  ? typeData?.mediaList[0]?.url
                  : 'https://fanfun.s3.ap-south-1.amazonaws.com/1706881490111food donation.jpeg'
              }
              description={
                typeData?.description
                  ? typeData?.description
                  : 'Please Select Donation Type'
              }
            />
          </View>
  
      <TouchableOpacity style={styles.button} onPress={() => PostDonations()}>
        <Text style={styles.butText}> Donate ₹ {value} </Text>
      </TouchableOpacity>
   </ScrollView>
      </View>
  );
};
export default Donations;

/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {BackgroundImage, BackHeaderNew, Loader} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MemberShipDetails} from '../../utils/api';
import {styles} from './styles';
import {colors, allTexts} from '../../common';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-share';
const ProfileMembership = ({route, navigation}) => {
  // const {id} = route.params || {};
  const [data, setData] = useState([{name: 'sai'}, {name: 'something'}]);
  const [loader, setaLoader] = useState(false);
  
  // const MembershipData = async () => {
  //   setaLoader(true);
  //   try {
  //     let result = await MemberShipDetails(id);
  //     // console.log('res', result?.data?.memberships);
  //     if (result) {
  //       setaLoader(false);
  //       setData(result?.data?.memberships);
  //     }
  //   } catch (error) {
  //     console.log('error in membership details api', error);
  //   }
  // };
  // useEffect(() => {
  //   MembershipData();
  // }, [id]);
  return (
    <SafeAreaView>
      <BackgroundImage />
      <View style={styles.mainContainer}>
        <BackHeaderNew
          txt={'Membership'}
          onPress={() => navigation.goBack()}
          isPlus
          onPlusPress={() =>
            navigation.navigate(allTexts.screenNames.addMembershipDetails)
          }
        />
        <View>
          {loader ? (
            <View>
              <Loader size={'small'} color={colors.orangeColor} />
            </View>
          ) : data?.length > 0 ? (
            data?.map((e, idx) => (
              <View style={styles.card}>
                <View style={styles.firstDetails}>
                  <Image
                    source={{
                      uri: 'https://juvaryacloud.s3.ap-south-1.amazonaws.com/1686296312205image.jpg',
                    }}
                    style={styles.image}
                  />
                  <View style={styles.firstDetailsTextContainer}>
                    <Text style={styles.firstDetailsText}>Premium</Text>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.buttonText}>Click</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.description}>Description</Text>
                <Text style={styles.moreDetails}>more Details</Text>
                <View style={styles.border} />
                <View style={styles.lastContainer}>
                  <View style={styles.lastContainerText}>
                    <Text style={styles.priceText}>$49.99</Text>
                    <Text style={styles.priceText2}>$49.99</Text>
                  </View>
                  <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonText}>Click Here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.nomemship}>
              <Text> No Membership available for this Temple</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ProfileMembership

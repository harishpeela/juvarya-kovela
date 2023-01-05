/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Switch,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {styles} from './styles';
import ToggleSwitch from 'toggle-switch-react-native';
import {BackHeader, PrimaryButton} from '../../components';
import {
  AccountIcon1,
  AccountIcon2,
  AccountIcon3,
  AccountIcon4,
} from '../../utils/svgs';
import {getTempleList, seviceCategoryItems} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';
import {allTexts, colors} from '../../common';
const Services = ({navigation, route}) => {
  const {
    params: {id, title, name},
  } = route || {};
  const [servicesData, setServicesData] = useState(name);
  const [isEnabled, setIsEnabled] = useState(false);
  const [conditionData, setConditionData] = useState(false);
  const {setCondition, setDonationId} = useContext(ApplicationContext);
  const ConditionData = () => {
    if (isEnabled === true) {
      setCondition(true);
    } else if (isEnabled == false) {
      setCondition(false);
      return false;
    }
    return true;
  };
  // console.log('conditionData', servicesData?.serviceCategories);
  setDonationId(id);
  // console.log('servicesData', name);

  // const serviceCategories = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     'Authorization',
  //     'Bearer c476912a-3e59-421f-87ac-93606319cafc',
  //   );
  //   myHeaders.append('Content-Type', 'application/json');
  //   myHeaders.append(
  //     'Cookie',
  //     'JSESSIONID=F6BE527D4E59FA851C1D2528317015C3; JSESSIONID=954C6808E1E19996F5BCA052E3F802E0',
  //   );

  //   var raw = JSON.stringify({
  //     jtItem: {
  //       id: 1200,
  //     },
  //     serviceCategory: [
  //       {
  //         id: 1474,
  //       },
  //       {
  //         id: 1470,
  //         active: true,
  //       },
  //       {
  //         id: 1469,
  //       },
  //       {
  //         id: 1473,
  //       },
  //     ],
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow',
  //   };

  //   fetch(
  //     'http://20.255.59.150:8082/api/v1/jtitemservicecategorytoitem/save',
  //     requestOptions,
  //   )
  //     .then(response => response.json())
  //     .then(result => {
  //       if (result) {
  //         setServices(result);
  //       }
  //     })
  //     .catch(error => console.log('error', error));
  // };
  useEffect(() => {
    // serviceCategories();
  }, []);
  // console.log('servicesDataafter', servicesData);

  const Item = ({data, itemIndex}) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Image source={{uri: data?.icon?.url}} style={styles.iconContainer} />
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{data?.name}</Text>
        </View>
        <View style={styles.toogleContainer}>
          <ToggleSwitch
            isOn={data?.active}
            initialValue={false}
            onColor={colors.blue3}
            offColor={colors.gray2}
            size="medium"
            onToggle={isOn => {
              // setIsEnabled(!isEnabled);
              let ArrData = servicesData?.serviceCategories;
              ArrData[itemIndex] = {
                active: !data?.active,
                icon: {
                  id: data?.icon?.id,
                  url: data?.icon?.url,
                  verificationPending: data?.icon?.verificationPending,
                },
                id: data?.id,
                name: data?.name,
                verificationPending: data?.verificationPending,
              };
              setServicesData({
                serviceCategories: ArrData,
              });
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.headerContainer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'Services'}
        />
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
      </View>

      <View style={styles.profileItemsContainer}>
        <FlatList
          data={servicesData?.serviceCategories}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item, index) => item?.id}
          renderItem={({item, index}) => {
            return (
              <View>
                <Item data={item} itemIndex={index} />
              </View>
            );
          }}
        />
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <PrimaryButton
            bgColor={colors.blue3}
            text={'Save Changes'}
            radius={27}
            onPress={() => {
              navigation.navigate(
                allTexts.screenNames.myTamples,
                ConditionData(),
                {
                  id: id,
                  title: title,
                },
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Services;

// var raw = JSON.stringify({
//   jtItem: {
// 'id': 1200,
//   },
//   serviceCategory: [
//     {
//       id: 1474,
//       active: true,
//     },
//     {
//       id: 1470,
//   'active': true,
//     },
//     {
//   'id': 1469,
//     },
//     {
//   'id': 1473,
//     },
//   ],
// });

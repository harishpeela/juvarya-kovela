/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import ToggleSwitch from 'toggle-switch-react-native';
import {BackHeader, PrimaryButton} from '../../components';
import {allTexts, colors} from '../../common';
const Services = ({navigation, route}) => {
  const {
    params: {id, title, name},
  } = route || {};
  const [servicesData, setServicesData] = useState(name);
  console.log('servicedata', name.id);

  const ActiveData = () => {
    let data = servicesData?.serviceCategories;
    const mappedData = data?.map(serviceData => ({
      id: serviceData.id,
      active: serviceData?.active ? true : false,
    }));
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer c476912a-3e59-421f-87ac-93606319cafc',
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      jtItem: {
        id: name.id,
      },
      serviceCategory: mappedData,
    });
    console.log('  ', raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://20.255.59.150:8082/api/v1/jtitemservicecategorytoitem/save',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log('result', result))
      .catch(error => console.log('error', error));
  };
  console.log('get', name.serviceCategories);
  useEffect(() => {
    ActiveData();
  }, []);

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
              let ArrData = servicesData?.serviceCategories;
              console.log('AeeData', ArrData[itemIndex]);
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
                ActiveData(),
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

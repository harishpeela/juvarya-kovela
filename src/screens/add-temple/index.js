/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {
  AddTampleStep1,
  AddTampleStep2,
  AddTampleStep3,
  BackHeader,
} from '../../components';
import {allTexts, colors} from '../../common';
import {styles} from './styles';
import {
  AddTempleAdmin,
  createTemple,
  UploadTemplePicture,
} from '../../utils/api';
import ApplicationContext from '../../utils/context-api/Context';

const AddTample = ({navigation}) => {
  const [screenNo, setScreenNo] = useState(1);
  const [step1Data, setStep1Data] = useState({
    tampleName: '',
    description: '',
    community: '',
    type: 0,
  });
  const [step2Data, setStep2Data] = useState({
    pinCode: '',
    line1: '',
    line2: '',
    line3: '',
  });
  const [step3Data, setStep3Data] = useState({
    employeId: '',
    role: '',
  });
  const [image, setImage] = useState(null);
  const [addBtnLoading, setaddBtnLoading] = useState(false);
  const [isAllDataAvailable, setIsAllDataAvailable] = useState(false);
  const [userID, setUserID] = useState(1);

  const {userDetails} = useContext(ApplicationContext);
  const getImageObj = img => {
    let newUri =
      Platform.OS === 'ios' ? img.uri : img.uri.replace('file://', 'file:');
    let imageObj = {
      uri: newUri,
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
    };
    return imageObj;
  };

  const createTempleHandler = async showCard => {
    let creatTemplePayload = {
      name: step1Data.tampleName,
      desciption: step1Data.description,
      line1: step2Data.line1,
      line2: step2Data.line2,
      Line3: step2Data.line3,
      establishedOn: '01-OCT-2008', // for now its static
      seasonal: step1Data.type === 0 ? true : false,
      platform: 'KOVELA',
      zipCode: step2Data.pinCode,
      subCategoryId: 1, // for now dont now what to do
    };
    setaddBtnLoading(true);
    createTemple(creatTemplePayload).then(createRes => {
      console.log('createtemp', createRes);
      if (createRes && createRes.status === 200) {
        let id = createRes?.data?.id;
        setUserID(id);
        let img = getImageObj(image);
        console.log('img', img);
        let formData = new FormData();
        formData.append('jtItemId', id);
        formData.append('profilePicture', img);
        UploadTemplePicture(formData).then(picRes => {
          if (picRes && picRes.status === 200) {
            let templeAdminPayload = {
              itemId: id,
              userName: userDetails.email,
              roleName: allTexts.constants.roleTypes.admin,
            };
            AddTempleAdmin(templeAdminPayload).then(async res => {
              if (res && res.status === 200) {
                setaddBtnLoading(false);
                showCard();
              }
            });
          }
        });
      }
    });
  };
  const CountNo = ({no, selectedNo, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.countTrack,
          {
            backgroundColor: selectedNo === no ? colors.white : colors.gray5,
            borderWidth: selectedNo === no ? 2 : 0,
            borderColor: colors.blue3,
          },
        ]}>
        <Text style={styles.countText}>{no}</Text>
      </TouchableOpacity>
    );
  };

  const AddTempleSteps = ({value}) => {
    switch (value) {
      case 1:
        return (
          <AddTampleStep1
            data={step1Data}
            image={image}
            setImage={setImage}
            onNextBtnPress={(values, type) => {
              setScreenNo(2);
              setStep1Data({
                tampleName: values.tampleName,
                description: values.description,
                community: values.community,
                type: type,
              });
            }}
          />
        );
      case 2:
        return (
          <AddTampleStep2
            data={step2Data}
            onNextBtnPress={values => {
              setScreenNo(3);
              setStep2Data({
                pinCode: values.pinCode,
                line1: values.line1,
                line2: values.line2,
                line3: values.line3,
              });
            }}
          />
        );
      case 3:
        return (
          <AddTampleStep3
            data={step3Data}
            cardData={{name: step1Data.tampleName, id: userID}}
            loading={addBtnLoading}
            isAllDataAvailable={isAllDataAvailable}
            setIsAllDataAvailable={setIsAllDataAvailable}
            navigation={navigation}
            onResetBtnPress={hideCard => {
              setScreenNo(1);
              setStep1Data({});
              setStep2Data({});
              setStep3Data({});
              hideCard();
              setImage(null);
            }}
            onAddBtnPress={(values, designation, showCard) => {
              setStep3Data({
                employeId: values.employeId,
                role: designation,
              });
              createTempleHandler(showCard);
            }}
            onAllDataCollected={() => {
              navigation.goBack();
            }}
          />
        );
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.headerContinaer}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'Add Temple Details'}
        />
      </View>
      <View style={styles.trackScreenContainer}>
        <CountNo
          no={1}
          onPress={() => {
            if (screenNo === 3 || screenNo === 2) {
              setScreenNo(1);
            }
          }}
          selectedNo={screenNo}
        />
        <View style={styles.line} />
        <CountNo
          no={2}
          onPress={() => {
            if (screenNo === 3) {
              setScreenNo(2);
            }
          }}
          selectedNo={screenNo}
        />
        <View style={styles.line} />
        <CountNo
          no={3}
          onPress={() => {
            if (screenNo === 3) {
              setScreenNo(3);
            }
          }}
          selectedNo={screenNo}
        />
      </View>
      <AddTempleSteps value={screenNo} />
    </SafeAreaView>
  );
};

export default AddTample;

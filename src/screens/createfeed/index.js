/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Platform,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {allTexts, colors} from '../../common';
import {styles} from './styles';
import {
  BackgroundImage,
  BackHeader,
  InputField,
  PrimaryButton,
} from '../../components';
import {UploadPhoto} from '../../utils/svgs';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import {createFeed} from '../../utils/api';
const CreateFeed = ({route, navigation}) => {
  const {id, title} = route.params || {};
  console.log('id', id);
  const [image, setImage] = useState(null);
  const [imageUpload, setimageUploaded] = useState(false);
  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const Valid = () => {
    if (image === null) {
      alert('please upload a image');
    } else if (titleName === '') {
      alert('name must be entered');
    } else if (description === '') {
      alert('description mast be entered');
    } else if (city === '') {
      alert('city must be entered');
    } else {
      Feed();
    }
  };
  const Feed = () => {
    let img = getImageObj(image);
    let formdata = new FormData();
    formdata.append('itemId', id);
    formdata.append('description', description);
    formdata.append('city', city);
    formdata.append('files', img);
    console.log('img', img);
    createFeed(formdata).then(res => {
      console.log('responce', res);
      if (res) {
        navigation.navigate(allTexts.screenNames.home);
      } else {
        Alert.alert('error', `${'You dont have an access to create feed'}`, [
          {
            text: 'ok',
            onPress: () =>
              navigation.navigate(allTexts.screenNames.home),
          },
        ]);
      }
    });
  };
  const uploadPhoto = () => {
    try {
      launchImageLibrary(
        {mediaType: 'photo', saveToPhotos: true, includeBase64: true},
        res => {
          if (!res.didCancel && !res.errorCode) {
            setImage(res.assets[0]);
            setimageUploaded(false);
          } else {
            console.log(res.errorMessage);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
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
  return (
    <SafeAreaView>
      <BackgroundImage />
      <View style={{marginHorizontal: 20}}>
        <BackHeader
          txt={'Create Feed'}
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <View style={{margin: 30}}>
        <View style={styles.uploadContainer}>
          {image !== null ? (
            <View style={styles.preViewImageContainer}>
              <View style={styles.crossIconContainer}>
                <Icon
                  onPress={() => {
                    setImage(null);
                  }}
                  name="closecircle"
                  color={colors.orangeColor}
                  size={25}
                />
              </View>
              <Image
                resizeMode="cover"
                style={styles.preViewImage}
                source={{uri: image?.uri}}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadPic}
              onPress={() => {
                uploadPhoto();
              }}>
              <UploadPhoto />
            </TouchableOpacity>
          )}
        </View>
        <View>
          <InputField
            value={titleName}
            title={'Name'}
            titleColor={colors.orangeColor}
            placeholder={'feed name'}
            // error={touched.tampleName && errors.tampleName}
            // onBlur={handleBlur('tampleName')}
            setState={e => setTitleName(e)}
          />
          <InputField
            value={description}
            title={'description'}
            titleColor={colors.orangeColor}
            placeholder={'description'}
            // error={touched.tampleName && errors.tampleName}
            // onBlur={handleBlur('tampleName')}
            setState={e => setDescription(e)}
          />
          <InputField
            value={city}
            title={'City'}
            titleColor={colors.orangeColor}
            placeholder={'description'}
            // error={touched.tampleName && errors.tampleName}
            // onBlur={handleBlur('tampleName')}
            setState={e => setCity(e)}
          />
        </View>
        <View style={{marginHorizontal: 90, marginTop: 40}}>
          <PrimaryButton
            text={'submit'}
            bgColor={colors.orangeColor}
            onPress={() => Valid()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreateFeed;

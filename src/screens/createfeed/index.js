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
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';

const CreateFeed = ({route, navigation}) => {
  const {data} = route.params || {};
  // console.log('id', data);
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
      NewFeed();
    }
  };
  const NewFeed = async () => {
    let Token = await getAuthTokenDetails();
    var myHeaders = new Headers();
    let img = getImageObj(image);
    myHeaders.append('Authorization', Token);

    var formdata = new FormData();
    formdata.append('description', description);
    formdata.append('feedType', 'profile ');
    formdata.append('jtProfile', data?.id);
    formdata.append('files', img);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    console.log('formdata', formdata?.files);
    fetch(
      'http://fanfundev.eastasia.cloudapp.azure.com:9094/jtfeed/create',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('uijjij', result);
        if (result?.message === 'Feed created') {
          navigation.navigate(allTexts.screenNames.home);
        } else {
          alert('somet thing went wrong');
        }
      })
      .catch(error => alert(error));
  };
  // const UploadingImage = () => {
  //   ImagePicker.openPicker({
  //     multiple: true,
  //     waitAnimationEnd: false,
  //     includeExif: true,
  //     forceJpg: true,
  //     maxFiles: 10,
  //     compressImageQuality: 0.8,
  //     mediaType: 'photo',
  //   })
  //     .then(images => {
  //       images.map((item, index) => {
  //         imageData.append('doc[]', {
  //           uri: item.path,
  //           type: 'image/jpeg',
  //           name: item.filename || `temp_image_${index}.jpg`,
  //         });
  //       });
  //     })
  //     .catch(e => alert(e));
  // };

  // let imgArray = [];
  // const uploadPhoto = () => {
  //   let options = {
  //     mediaType: 'photo',
  //     saveToPhotos: true,
  //     includeBase64: true,
  //     selectionLimit: 10,
  //   };
  //   launchImageLibrary(options, response => {
  //     response.assets.forEach(function (item, index) {
  //       console.log('item', item);
  //       if (item[index] != null) {
  //         imgArray.push(item[0].uri);
  //         setImageArray(filePathArray => [...filePathArray, imgArray]);
  //         setimageUploaded(false);
  //       }
  //     });
  //     ///Loop through responses
  //     setImage(response.assets[0]);
  //   });
  // };
  const uploadPhoto = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
          selectionLimit: 10,
        },
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
  // console.log('image', image);
  // console.log('array', imageArray);
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

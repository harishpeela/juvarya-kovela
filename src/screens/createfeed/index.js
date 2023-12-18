/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
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
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import {Data} from '../home-feed/formateDetails';
const CreateFeed = ({route, navigation}) => {
  const {data} = route.params || {};
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUpload, setimageUploaded] = useState(false);
  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [trfData, setTrfData] = useState();
  const Valid = id => {
    if (image === null) {
      alert('please upload a image');
    } else if (titleName === '') {
      alert('name must be entered');
    } else if (description === '') {
      alert('description mast be entered');
    } else if (city === '') {
      alert('city must be entered');
    } else {
      NewFeed(id);
    }
  };
  const NewFeed = async id => {
    setLoading(true);
    let Token = await getAuthTokenDetails();
    var myHeaders = new Headers();
    let img = getImageObj(image);
    myHeaders.append('Authorization', Token);

    var formdata = new FormData();
    formdata.append('description', description);
    formdata.append('feedType', 'profile ');
    formdata.append('jtProfile', id);
    img.forEach(element => {
      formdata.append('files', element);
    });
    console.log('formdata', formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://kovela.app/media/jtfeed/create', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.message === 'Feed created') {
          Alert.alert('Success', `${result?.message} successfully`, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.userFeedScreen),
            },
          ]);
        } else {
          alert('somet thing went wrong');
        }
      })
      .catch(error => alert(error));
  };

  const uploadPhoto = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          saveToPhotos: true,
          includeBase64: true,
          selectionLimit: 10,
          quality: 1,
          maxHeight: 2080,
          maxWidth: 2080,
        },
        res => {
          if (!res.didCancel && !res.errorCode) {
            // // console.log('usha', res);
            // const fileSize = res.assets[0].base64.length * (3 / 4) - 2;
            // console.log('usha', res?.assets[0].height);
            // if (fileSize < 3000000) {
            //   // alert('ushshs');
            //   // setFileSizeError(true);
            //   setImage(res.assets);
            //   setimageUploaded(false);
            // } else {
            //   setImage(res.assets);
            //   setimageUploaded(false);
            // }
            setImage(res.assets);
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
    return img.map(oImg => {
      let newUri =
        Platform.OS === 'ios' ? oImg.uri : oImg.uri.replace('file://', 'file:');
      let imageObj = {
        uri: newUri,
        name: `${Date.now()}.jpg`,
        type: 'image/jpeg',
      };
      return imageObj;
    });
  };
  useEffect(() => {
    let result = Data(data);
    if (result) {
      setTrfData(result);
    } else {
      console.log('nope');
    }
  }, [data]);
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
                source={{uri: image[0]?.uri}}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadPic}
              onPress={() => {
                uploadPhoto();
              }}>
              {/* <UploadPhoto /> */}
              <View style={styles.profileImage}>
                  <Icon name="camera" size={70} color={colors.orangeColor} />
                </View>
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
            loading={loading}
            onPress={() => Valid(trfData?.jtProfile)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreateFeed;

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
  BackHeaderNew,
  InputField,
  PrimaryButton,
  TopBarcard,
} from '../../components';
import {Create_Feed} from '../../utils/api';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import {Data} from '../home-feed/formateDetails';
const CreateFeed = ({route, navigation}) => {
  const {data} = route.params || {};
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUpload, setimageUploaded] = useState(false);
  const [imageProp, setImageProp] = useState('');

  console.log('data', data);

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
    let img = getImageObj(image);
    var formdata = new FormData();
    formdata.append('description', description);
    formdata.append('feedType', 'profile');
    formdata.append('jtProfile', id);
    img.forEach(element => {
      formdata.append('files', element);
    });
    console.log('formdata', formdata);
    let result = await Create_Feed(formdata);
    if (result?.data?.message === 'Feed created') {
      Alert.alert('Success', `${result?.data?.message} successfully`, [
        {
          text: 'Ok',
          onPress: () => navigation.navigate(allTexts.screenNames.bottomTab),
        },
      ]);
    } else {
      alert('somet thing went wrong');
      setLoading(false);
    }
    // })
    // .catch(error => alert(error));
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
          didCancel: navigation.navigate(
            allTexts.screenNames.viewtempleprofile,
          ),
          // maxHeight: 2080,
          // maxWidth: 2080,
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
            setImageProp(res.assets);
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
  // useEffect(() => {
  //   let result = Data(data);
  //   if (result) {
  //     setTrfData(result);
  //   } else {
  //     console.log('nope');
  //   }
  // }, [data]);

  useEffect(() => {
    if (image === null) {
      uploadPhoto();
    }
  });

  const imageSending = () => {
    setImageProp(image);
    navigation.navigate(allTexts.screenNames.createFeedDescription, {
      imageProp,
      data,
    });
  };
  console.log('imageProp', image);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{minHeight: '15%'}}>
        <TopBarcard back={true} txt={'Upload Photo'} navigation={navigation} />
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
            <TouchableOpacity style={styles.uploadPic}>
              <View style={styles.profileImage}>
                <Icon name="camera" size={70} color={colors.orangeColor} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{marginHorizontal: 70, marginBottom: 20}}>
          <PrimaryButton
            text={'Next'}
            bgColor={colors.orangeColor}
            loading={loading}
            // onPress={() => Valid(trfData?.jtProfile)}
            onPress={() => imageSending()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreateFeed;

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
  EventInput,
  InputField,
  PrimaryButton,
  TopBarcard,
} from '../../components';
import {Create_Feed} from '../../utils/api';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import {Data} from '../home-feed/formateDetails';
import {TopBarCard2} from '../../components/topBar1/topBarCard';
const CreateFeed = ({route, navigation}) => {
  const {data} = route.params || {};
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUpload, setimageUploaded] = useState(false);
  const [imageProp, setImageProp] = useState('');
  const [description, setDescription] = useState('');

  console.log('data', data);

  const [trfData, setTrfData] = useState();
  const Valid = id => {
    if (image === null) {
      alert('please upload a image');
    } else if (description === '') {
      alert('Enter Description');
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
    console.log('res of feed', result?.data);
    if (result?.data?.message === 'Feed created') {
      Alert.alert('Success', `${result?.data?.message} successfully`, [
        {
          text: 'Ok',
          onPress: () => navigation.navigate(allTexts.tabNames.home),
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
          // didCancel: navigation.navigate(
          //   allTexts.screenNames.viewtempleprofile,
          // ),
          // maxHeight: 2080,
          // maxWidth: 2080,
        },
        res => {
          if (!res.didCancel && !res.errorCode) {
            setImage(res.assets);
            setimageUploaded(false);
            setImageProp(res.assets);
            console.log('jahbjabhs');
          } else {
            navigation.goBack();
            console.log(res.errorMessage, 'erro in image');
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
    uploadPhoto();
    let result = Data(data);
    if (result) {
      setTrfData(result);
    } else {
      console.log('nope');
    }
  }, [data]);

  const imageSending = () => {
    setImageProp(image);
    navigation.navigate(allTexts.screenNames.createFeedDescription, {
      imageProp,
      data,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{minHeight: '15%'}}>
        <TopBarCard2 back={true} txt={'Upload Photo'} navigation={navigation} />
      </View>
      <View style={{margin: 30}}>
        <View style={styles.uploadContainer}>
          {image !== null ? (
            <View style={styles.preViewImageContainer}>
              <View style={styles.crossIconContainer}>
                <Icon
                  onPress={() => {
                    navigation.goBack();
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
        <View style={{bottom: '25%'}}>
          <EventInput
            lable={'Description'}
            value={description}
            height={100}
            placeholder={'Description'}
            onChangeText={e => setDescription(e)}
            onFocus={() => Keyboard.dismiss()}
          />
          <View style={{marginHorizontal: 50, marginTop: 30}}>
            <PrimaryButton
              text={'Submit'}
              bgColor={colors.orangeColor}
              loading={loading}
              onPress={() => Valid(trfData?.jtProfile)}
              onFocus={() => Keyboard.dismiss()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreateFeed;

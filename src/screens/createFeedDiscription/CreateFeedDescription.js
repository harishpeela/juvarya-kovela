import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  EventInput,
  InputField,
  PrimaryButton,
  TopBarcard,
} from '../../components';
import {allTexts, colors} from '../../common';
import {Data} from '../home-feed/formateDetails';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import {ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CreateFeedDescription = ({route, navigation}) => {
  const {imageProp, data} = route.params || {};
  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');

  const [image, setImage] = useState(imageProp);
  const [loading, setLoading] = useState(false);
  const [imageUpload, setimageUploaded] = useState(false);
  const [trfData, setTrfData] = useState();
  console.log('trfdata', trfData);
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
    console.log('id', id);
    setLoading(true);
    let Token = await getAuthTokenDetails();
    var myHeaders = new Headers();
    let img = getImageObj(image);
    console.log('img', img);
    myHeaders.append('Authorization', Token);

    var formdata = new FormData();
    formdata.append('description', description);
    formdata.append('feedType', 'profile');
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
    fetch('https://fanfun.in/media/jtfeed/create', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('resut of create feed', result);
        if (result?.message === 'Feed created') {
          Alert.alert('Success', `${result?.message} successfully`, [
            {
              text: 'Ok',
              onPress: () =>
                navigation.navigate(allTexts.screenNames.bottomTab),
            },
          ]);
        } else {
          alert('somet thing went wrong');
          setLoading(false);
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
    <View>
      <View style={{minHeight: '15%'}}>
        <TopBarcard back={true} navigation={navigation} txt={'Fill Deatils'} />
      </View>
      <Image
        source={{uri: imageProp[0]?.uri}}
        style={{
          marginTop: '5%',
          height: '30%',
          width: '70%',
          alignSelf: 'center',
          resizeMode: 'contain',
        }}
      />
      <View>
        <EventInput
          value={titleName}
          lable={'Name'}
          placeholder={'Enter Name'}
          onChangeText={e => setTitleName(e)}
        />
        <EventInput
          lable={'Description'}
          value={description}
          height={100}
          placeholder={'Description'}
          onChangeText={e => setDescription(e)}
        />
        <EventInput
          lable={'City'}
          value={city}
          placeholder={'City'}
          onChangeText={e => setCity(e)}
        />

        <View style={{marginHorizontal: 50, marginTop: 20}}>
          <PrimaryButton
            text={'Submit'}
            bgColor={colors.orangeColor}
            loading={loading}
            onPress={() => Valid(trfData?.jtProfile)}
          />
        </View>
      </View>
    </View>
  );
};

export default CreateFeedDescription;

const styles = StyleSheet.create({});

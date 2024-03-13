import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  EventInput,
  InputField,
  PrimaryButton,
  TopBarcard,
} from '../../components';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import {allTexts, colors} from '../../common';
import {Data} from '../home-feed/formateDetails';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';
import {ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Create_Feed } from '../../utils/api';
const CreateFeedDescription = ({route, navigation}) => {
  const {imageProp, data} = route.params || {};
  const [titleName, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');

  const [image, setImage] = useState(imageProp);
  const [loading, setLoading] = useState(false);
  const [imageUpload, setimageUploaded] = useState(false);
  const [trfData, setTrfData] = useState();
  // console.log('trfdata', trfData);
  const Valid = id => {
    if (image === null) {
      alert('please upload a image');
    } else if (titleName === '') {
      alert('Enter Name');
    } else if (description === '') {
      alert('Enter Description');
    } else if (city === '') {
      alert('Enter City');
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
    if (result?.data?.message === 'Feed Created') {
      Alert.alert('Success', `${result?.data?.message} Successfully`, [
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
          // maxHeight: 2080,
          // maxWidth: 2080,
        },
        res => {
          if (!res.didCancel && !res.errorCode) {
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
      <View style={{minHeight: 70, marginTop: '3%'}}>
        <TopBarCard2
          txt={'Create Feed'}
          back={true}
          navigation={navigation}
          >
        </TopBarCard2>
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
      <KeyboardAwareScrollView>
      <View>
        <EventInput
          value={titleName}
          lable={'Name'}
          placeholder={'Enter Name'}
          onChangeText={e => setTitleName(e)}
          onFocus={() => Keyboard.dismiss()}
        />
        <EventInput
          lable={'Description'}
          value={description}
          height={100}
          placeholder={'Description'}
          onChangeText={e => setDescription(e)}
          onFocus={() => Keyboard.dismiss()}
        />
        <EventInput
          lable={'City'}
          value={city}
          placeholder={'City'}
          onChangeText={e => setCity(e)}
          onFocus={() => Keyboard.dismiss()}
        />

        <View style={{marginHorizontal: 50, marginTop: 60}}>
          <PrimaryButton
            text={'Submit'}
            bgColor={colors.orangeColor}
            loading={loading}
            onPress={() => Valid(trfData?.jtProfile)}
            onFocus={() => Keyboard.dismiss()}
          />
        </View>
      </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateFeedDescription;

const styles = StyleSheet.create({});

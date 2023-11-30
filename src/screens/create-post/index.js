import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  ImageLoader,
  InputField,
  PrimaryButton,
} from '../../components';
import {styles} from './style';
import {Formik} from 'formik';
import {createPostScheme} from '../../common/schemas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../common';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {createFeedPost} from '../../utils/api';

const CreatePost = ({navigation, route}) => {
  const {
    params: {id},
  } = route || {};
  const [imageUploaded, setimageUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [isImageAvailable, setisImageAvailable] = useState(false);

  const uploadPhoto = () => {
    // setImageLoading(true);
    try {
      launchImageLibrary(
        {mediaType: 'photo', saveToPhotos: true, includeBase64: true},
        res => {
          if (!res.didCancel && !res.errorCode) {
            setImage(res.assets[0]);
            setimageUploaded(false);
            setisImageAvailable(true);
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
  const createPostHandler = async (description, formikActions) => {
    let formData = new FormData();
    const imageObj = getImageObj(image);
    formData.append('itemId', id);
    formData.append('city', 'IN-AP');
    formData.append('description', description);
    formData.append('files', imageObj);
    try {
      let response = await createFeedPost(formData);
      formikActions.setSubmitting(false);
      if (response && response.status === 200) {
        navigation.goBack();
        ToastAndroid.show('Post Created Successfully!', 1000);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <BackHeader
          onBackPress={() => {
            navigation.goBack();
          }}
          txt={'New Post'}
        />
        <Formik
          onSubmit={(values, formikActions) => {
            const {caption} = values;
            if (image === null) {
              setisImageAvailable(true);
              formikActions.setSubmitting(false);
            } else {
              createPostHandler(caption, formikActions);
            }
          }}
          validationSchema={createPostScheme}
          initialValues={{
            caption: '',
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            return (
              <>
                <View style={styles.inputContainer}>
                  <InputField
                    error={touched.caption && errors.caption}
                    onBlur={handleBlur('caption')}
                    setState={handleChange('caption')}
                    title={'Write Caption'}
                  />
                </View>
                <View style={styles.imgUplodWraper}>
                  {image === null ? (
                    <>
                      <TouchableOpacity
                        onPress={uploadPhoto}
                        style={styles.imgUpload}>
                        <FontAwesome
                          color={colors.gray2}
                          name="image"
                          size={50}
                        />
                        <Text style={styles.uploadTxt}>
                          {'Select Photo From Gallery'}
                        </Text>
                      </TouchableOpacity>
                      {isImageAvailable && (
                        <Text style={styles.imgError}>{'Image Required'}</Text>
                      )}
                    </>
                  ) : (
                    <View style={styles.imgContainer}>
                      <View style={styles.crossIconContainer}>
                        <Icon
                          onPress={() => {
                            setImage(null);
                          }}
                          name="closecircle"
                          color={colors.red2}
                          size={25}
                        />
                      </View>
                      <ImageLoader
                        imageStyle={styles.orgainserimg}
                        resizeMode={'contain'}
                        url={image?.uri}
                      />
                    </View>
                  )}
                </View>

                <View style={styles.btnContainer}>
                  <PrimaryButton
                    bgColor={colors.blue3}
                    radius={25}
                    text={'Create Post'}
                    onPress={handleSubmit}
                    loading={isSubmitting}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;

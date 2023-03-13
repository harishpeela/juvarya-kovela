/* eslint-disable react-native/no-inline-styles */
import {View, Image, TouchableOpacity, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {AddTampleSchema} from '../../common/schemas';
import {styles} from './styles';
import RadioForm from 'react-native-simple-radio-button';
import {UploadPhoto} from '../../utils/svgs';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {getAuthTokenDetails} from '../../utils/preferences/localStorage';

export const AddTampleStep1 = ({onNextBtnPress, data, image, setImage}) => {
  const {
    buttonTexts: {next},
    placeHolders: {tampleNameP, descriptionP, communityP},
    headings: {
      inputTitles: {tName, tDescription, tCommunity},
    },
  } = allTexts;

  const uploadPhoto = () => {
    // setImageLoading(true);
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
          // setImageLoading(false);
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  var radio_props = [
    {label: 'Regular', value: 0},
    {label: 'Seasonal', value: 1},
  ];
  const [isRegular, setIsRegular] = useState(data.type);
  const [imageUploaded, setimageUploaded] = useState(false);
  const [filterdData, setFilterdData] = useState([]);
  const [apiSearch, setApiSearch] = useState([]);
  const [search, setSearch] = useState('');
  const [mappingData, setMappingData] = useState();

  const CommunityGetApi = async () => {
    var myHeaders = new Headers();
    let token = await getAuthTokenDetails();
    myHeaders.append('Authorization', token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(
      'http://20.255.59.150:8082/api/v1/community/list?query&page=0&pageSize=10',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('api filter', result);

        setFilterdData(result.communities);
        setApiSearch(result.communities);
        let filteredCommunityData = filterdData
          .filter(item => item.name)
          .map(({id, name}) => ({id, name}));
        // console.log('filteredCommunityData', filteredCommunityData);
        if (filteredCommunityData) {
          setMappingData(filteredCommunityData);
        } else {
          setMappingData(null);
        }
      })
      .catch(error => console.log('error in get', error));
  };

  const searchFilter = text => {
    const newData = apiSearch?.filter(item =>
      item.name?.toUpperCase()?.includes(text?.toUpperCase()),
    );
    setFilterdData(newData);
    setSearch(text);
  };
  const ItemView = ({item, onPress}) => {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Text style={{padding: 10, color: 'black', fontWeight: '600'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const CommunityData = text => {
    setSearch(text);
    setFilterdData([]);
  };
  // const CommunityPostApi = async () => {
  //   var myHeaders = new Headers();
  //   let token = await getAuthTokenDetails();
  //   myHeaders.append('Authorization', token);
  //   myHeaders.append('Content-Type', 'application/json');
  //   myHeaders.append('Accept', 'application/json');

  //   var raw = JSON.stringify({
  //     name: search,
  //   });
  //   console.log('raw', raw);
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow',
  //   };
  //   let Access_Token = token.replace('bearer ', '');
  //   console.log('acess_Tocken------', Access_Token);
  //   fetch(
  //     `http://20.255.59.150:8082/api/v1/community/save?access_token=${Access_Token}`,
  //     requestOptions,
  //   )
  //     .then(response => console.log('222222222222', response))
  //     .then(result => {
  //       if (result?.status === 200) {
  //         console.log('78888888888');
  //       } else {
  //         console.log('jmbb');
  //       }
  //     })
  //     .catch(error => console.log('error in post api', error));
  // };
  useEffect(() => {
    CommunityGetApi();
  }, []);
  return (
    <View style={styles.wrapper}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.uploadContainer}>
          {image !== null ? (
            <View style={styles.preViewImageContainer}>
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
              {imageUploaded && (
                <Text style={styles.noimageText}>
                  {'Please upload a photo'}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
        <Formik
          onSubmit={(values, formikActions) => {
            if (image === null) {
              setimageUploaded(true);
              return;
            }
            onNextBtnPress(values, isRegular);
            CommunityGetApi();
            // CommunityPostApi();
            // console.log('commite', values);
          }}
          validationSchema={AddTampleSchema}
          initialValues={{
            tampleName: data.tampleName,
            description: data.description,
            community: search,
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
          }) => {
            return (
              <View style={styles.fieldContainer}>
                <InputField
                  value={values.tampleName}
                  title={tName}
                  titleColor={colors.green2}
                  placeholder={tampleNameP}
                  error={touched.tampleName && errors.tampleName}
                  onBlur={handleBlur('tampleName')}
                  setState={handleChange('tampleName')}
                />
                <View style={{height: 20}} />
                <InputField
                  value={values.description}
                  title={tDescription}
                  titleColor={colors.green2}
                  placeholder={descriptionP}
                  error={touched.description && errors.description}
                  onBlur={handleBlur('description')}
                  setState={handleChange('description')}
                />
                <View style={{height: 20}} />
                <InputField
                  value={search}
                  title={tCommunity}
                  titleColor={colors.green2}
                  placeholder={communityP}
                  onChangeText={text => searchFilter(text)}
                  error={touched.community && errors.community}
                  onBlur={handleBlur('community')}
                  setState={handleChange('community')}
                />
                {filterdData?.length > 1 && search?.length > 1 && (
                  <FlatList
                    data={filterdData}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <ItemView
                        item={item.name.toUpperCase()}
                        onPress={CommunityData}
                      />
                    )}
                  />
                )}
                <View style={styles.radioContainer}>
                  <RadioForm
                    radio_props={radio_props}
                    initial={isRegular}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={colors.blue3}
                    selectedButtonColor={colors.blue3}
                    animation={false}
                    buttonSize={8}
                    buttonOuterSize={20}
                    labelStyle={styles.radioLabelStyle}
                    onPress={value => {
                      setIsRegular(value);
                    }}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    bgColor={colors.blue3}
                    onPress={handleSubmit}
                    text={next}
                    radius={8}
                    fontsize={10}
                    padding={8}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

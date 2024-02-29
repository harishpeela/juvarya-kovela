import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { ReelsComponent, Loader } from '../../components';
import { GetReels, saveReels } from '../../utils/api';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
const KovelaReels = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [videoData, setVideoData] = useState();
  const [loader, setLoader] = useState(false)
  const [pgNo, setPgNo] = useState(0);
  const [pgSz, setPgSz] = useState(30);
  const [refreshing, setRefreshing] = useState(true);
  const [videoRes, setVideoRes] = useState(null);
  const reelsData = async (pgNo, pgSz) => {
    setLoader(true)
    let result = await GetReels(pgNo, pgSz);
    console.log('reels', result?.data);
    if (result?.status === 200) {
      setVideoData(result?.data?.data)
      setLoader(false);
    } else {
      setLoader(false)
    }
  }
  async function requestCameraPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.GALLERY,
      {
        title: 'Camera Permission',
        message: 'App needs camera access to take pictures.',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted');
      uploadVideo(); // Call your function to launch the camera
    } else {
      console.log('Camera permission denied');
    }
  }
  const uploadVideo = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'video',
          // saveToPhotos: true,
          require: 'video',
          includeBase64: true,
          // maxHeight: 1080,
          // maxWidth: 1080,
        },
        res => {
          if (!res?.didCancel) {
            console.log('Image URI:', res?.assets[0]?.uri);
            uploadVideoToServer(res?.assets[0]?.uri)
            // setImage(res?.assets[0]);
            // setimageUploaded(false);
            // setIsModal(true);
          } else {
            console.log(res?.errorMessage);
          }
        },
      );
    } catch (error) {
      console.error(error);
    }
  };


  const takePicture = async () => {
    const options = {
      mediaType: 'video',
      require: 'video',
      quality: 1, // Adjust image quality (0-1)
    };

    try {
      const result = await launchCamera(options);
      if (!result.didCancel) {
        // Handle the captured image data
        console.log('Image URI:', res.uri);
      } else {
        console.log('else')
      }
    } catch (error) {
      console.error('Error launching camera:', error);
    }
  };

  const uploadVideoToServer = async (videoUri) => {
    console.log('videourl', videoUri);
    let video = getImageObj(videoUri);
    console.log('vidgbajhhhjjakaka', video);
    const formdata = new FormData();
    formdata.append("description", "feels lik");
    formdata.append("jtProfile", "1");
    formdata.append('files', video);
    console.log('formdata', formdata?._parts);
    let responce = await saveReels(formdata)
    console.log('responce', responce?.data);
  };

  const getImageObj = video => {
    console.log('--=====---', video);
    let newUri =
      Platform.OS === 'ios' ? video : video.replace('file://', 'file:');
    let imageObj = {
      uri: video,
      name: 'myvideo.mp4',
      type: 'video/mp4',
    };
    return imageObj;
  };


  useFocusEffect(
    useCallback(() => {
      if (pgNo >= 0) {
        reelsData(pgNo, pgSz);
      }
      return () => { };
    }, [])
  );

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'white',
        position: 'relative',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 30,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 10,
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
          Reels
        </Text>
        <TouchableOpacity onPress={() => requestCameraPermission()}>
          <Feather name="camera" style={{ fontSize: 25, color: 'white' }} />
        </TouchableOpacity>
      </View>
      {loader ? (
        <Loader />
      ) : (
        <ReelsComponent videoData={videoData} />
      )}
    </View>
  );
};

export default KovelaReels;
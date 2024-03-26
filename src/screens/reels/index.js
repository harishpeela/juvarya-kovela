// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, Dimensions, PermissionsAndroid, Platform } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import Feather from 'react-native-vector-icons/Feather';
// import { ReelsComponent, Loader } from '../../components';
// import { GetReels, saveReels } from '../../utils/api';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { allTexts, colors } from '../../common';
// const KovelaReels = ({ navigation }) => {
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   const [videoData, setVideoData] = useState();
//   const [loader, setLoader] = useState(false)
//   const [pgNo, setPgNo] = useState(0);
//   const [pgSz, setPgSz] = useState(30);

//   const reelsData = async (pgNo, pgSz) => {
//     setLoader(true)
//     let result = await GetReels(pgNo, pgSz);
//     console.log('reels', result?.data);
//     if (result?.status === 200) {
//       setVideoData(result?.data?.data)
//       setLoader(false);
//     } else {
//       setLoader(false)
//     }
//   }

//   useFocusEffect(
//     useCallback(() => {
//       if (pgNo >= 0) {
//         reelsData(pgNo, pgSz);
//       }
//       return () => { };
//     }, [])
//   );

//   return (
//     <View
//       style={{
//         width: windowWidth,
//         height: windowHeight,
//         backgroundColor: 'white',
//         position: 'relative',
//         backgroundColor: 'black',
//       }}>
//       <View
//         style={{
//           position: 'absolute',
//           top: 30,
//           left: 0,
//           right: 0,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           zIndex: 1,
//           padding: 10,
//         }}>
//         <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
//           Spirituals
//         </Text>
//         <TouchableOpacity onPress={() => navigation.navigate(allTexts.screenNames.reelupload)}>
//           <Feather name="camera" style={{ fontSize: 25, color: 'white' }} />
//         </TouchableOpacity>
//       </View>
//       {loader ? (
//         <View style={{flex: 1, alignItems: 'center' }}>
//           <Loader size={'large'} color={colors.orangeColor} />
//         </View>
//       ) : (
//         <ReelsComponent videoData={videoData} />
//       )}
//     </View>
//   );
// };

// export default KovelaReels;

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {ReelsComponent, Loader} from '../../components';
import {GetReels, saveReels} from '../../utils/api';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {allTexts, colors} from '../../common';
import RNFS from 'react-native-fs';
import {useAppSelector} from '../../redux/reduxHooks';

const KovelaReels = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [videoData, setVideoData] = useState();
  const [loader, setLoader] = useState(false);
  const [pgNo, setPgNo] = useState(0);
  const [pgSz, setPgSz] = useState(30);

  const addLocalVideoStoragePath = async video => {
    try {
      const timestamp = new Date().getTime();
      const cachedVideoPath = `${RNFS.CachesDirectoryPath}/${video.id}_${timestamp}.mp4`;
      const options = {
        fromUrl: video.mediaList[0].url,
        toFile: cachedVideoPath,
        background: true,
        progressDivider: 1,
      };
      const download = RNFS.downloadFile(options);
      const res = await download.promise;
      if (res.statusCode === 200) {
        video.localVideoStoragePath = cachedVideoPath;
      }
    } catch (error) {
      console.log('Error prefetching next video:', error.message);
    }
  };

  const reelsData = async (pgNo, pgSz) => {
    setLoader(true);
    let result = await GetReels(pgNo, pgSz);
    if (result?.status === 200) {
      const videos = result.data.data;
      await Promise.all(videos.map(addLocalVideoStoragePath));
      setVideoData(videos);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  //Redux hooks
  const reels = useAppSelector(state => state.reelsFeed);

  useEffect(() => {
    if (pgNo >= 0) {
      if (reels && reels?.reelsFeedData) {
        setVideoData(reels?.reelsFeedData);
      } else {
        reelsData(pgNo, pgSz);
      }
    }
  }, [reels]);

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
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          Spirituals
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(allTexts.screenNames.reelupload)}>
          <Feather name="camera" style={{fontSize: 25, color: 'white'}} />
        </TouchableOpacity>
      </View>
      {loader ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Loader size={'large'} color={colors.orangeColor} />
        </View>
      ) : (
        <ReelsComponent videoData={videoData} />
      )}
    </View>
  );
};

export default KovelaReels;

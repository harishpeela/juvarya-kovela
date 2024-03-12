
// import React, { useState, useEffect, useCallback } from 'react';
// import SwiperFlatList from 'react-native-swiper-flatlist';
// import SingleReel from './singleReel';
// import RNFS from 'react-native-fs';
// import { createThumbnail } from 'react-native-create-thumbnail';

// const ReelsComponent = ({ videoData }) => {


//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [mute, setMute] = useState(false);
//   const [nextVideoIndex, setNextVideoIndex] = useState(1);
//   const [nextVideoUrl, setNextVideoUrl] = useState(null);
//   const [nextDownloadedVideoURL, setNextDownloadedVideoURL] = useState(null);
//   const [ tempURL , setTempURL] = useState(null);
//   const [thumbnails, setThumbnails] = useState(null);
//   console.log('videoData------->', videoData,currentIndex,nextVideoIndex,nextDownloadedVideoURL,nextVideoUrl)
//   useEffect(() => {
//     if (nextVideoIndex < videoData?.length) {
//       const url = videoData[nextVideoIndex]?.mediaList ? videoData[nextVideoIndex]?.mediaList[0]?.url : '';
//       if (url) {
//         setNextVideoUrl(url);
//       }
//     }
//     setNextDownloadedVideoURL(tempURL);
//   }, [currentIndex]);

//   useEffect(() => {
//     const prefetchNextVideo = async () => { 
//       if (currentIndex >= 0) {
//         console.log('nextVIdoIndex--------->',currentIndex, nextVideoIndex, )
//         try {
//           const timestamp = new Date().getTime(); 
//           const cachedVideoPath = `${RNFS.CachesDirectoryPath}/nextVideo_${nextVideoIndex}_${timestamp}.mp4`;
//           const options = {
//             fromUrl: currentIndex == 0 ? videoData[1]?.mediaList[0]?.url :nextVideoUrl,
//             toFile: cachedVideoPath,
//             background: true,
//             progressDivider: 1,
//           };
//           const download = RNFS.downloadFile(options);
//           download.promise.then(res => {
//             if (res.statusCode === 200) {
//               setTempURL(cachedVideoPath);
//             }
//           }).catch(error => {
//             console.log('Download error:', error);
//           });
//         } catch (error) {
//           console.log('Error prefetching next video:', error.message);
//         }

//       }
//     };
//     prefetchNextVideo();
//   }, [currentIndex]);

//   const handleChangeIndexValue = useCallback(({ index }) => {
//     console.log('index---------->', index)
//     setCurrentIndex(index);
//     setNextVideoIndex(index + 1);
//   }, []);

//   const renderItem = ({ item, index }) => {
//     return videoData && videoData?.length === 1 && item && item?.mediaList ? 
//       <SingleReel
//         item={item}
//         index={index}
//         mute={mute}
//         currentIndex={currentIndex}
//         thumbnail={thumbnails}
//       />
//     : 
//       <SingleReel
//         item={item}
//         index={index}
//         mute={mute}
//         currentIndex={currentIndex}
//         nextVideoUrl={videoData[nextVideoIndex]?.mediaList ? videoData[nextVideoIndex]?.mediaList[0]?.url : ''}
//         nextDownloadedVideoPlayURL={nextDownloadedVideoURL}
//         thumbnail={thumbnails}
//       />
//   };

//   return (
//     <SwiperFlatList
//       vertical={true}
//       onChangeIndex={handleChangeIndexValue}
//       data={videoData}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => index.toString()}
//     />
//   );
// };

// export default ReelsComponent;


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Text, View, Dimensions, ActivityIndicator } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Video from 'react-native-video';

const ReelsComponent = ({ videoData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mute, setMute] = useState(false);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const videoRef = useRef(null);

  console.log('videoData--->', videoData)
  const handleChangeIndexValue = useCallback(({ index }) => {
    setCurrentIndex(index);
    setLoading(true);
  }, []);

  const onLoad = () => {
    setLoading(false);
  };

  const renderVideoItem = (item, index) => {
    const videoURL = item?.localVideoStoragePath || item?.mediaList[0]?.url;
    return (
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        {currentIndex === index &&
          <>
            <Video
              ref={videoRef}
              repeat={false}
              resizeMode="cover"
              source={{ uri: videoURL }}
              muted={mute}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
              onLoad={onLoad}
              key={index}
            />
          </>
        }
        {loading && <ActivityIndicator style={{ position: 'absolute' }} size="large" color="white" />}
      </View>
    );
  };

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videoData}
      renderItem={({ item, index }) => renderVideoItem(item, index)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ReelsComponent;
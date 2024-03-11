// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import SwiperFlatList from 'react-native-swiper-flatlist';
// import SingleReel from './singleReel';

// const ReelsComponent = ({ videoData }) => {
//   console.log('video data', videoData?.length, videoData);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [mute, setMute] = useState(false);
//   const [nextVideoIndex, setNextVideoIndex] = useState(1);

//   const nextVideoUrl = useMemo(() => {
//     if (nextVideoIndex < videoData?.length) {
//       const url = videoData[nextVideoIndex]?.mediaList ? videoData[nextVideoIndex]?.mediaList[0]?.url : '';
//       return url || null;
//     }
//     return null;
//   }, [nextVideoIndex, videoData, currentIndex]);

//   console.log('nextVideoUrl---->', nextVideoUrl)
//   const handleChangeIndexValue = useCallback(({ index }) => {
//     setCurrentIndex(index);
//     setNextVideoIndex(index + 1);
//   }, []);
//   const renderItem = ({ item, index }) => {
//     console.log('item, index----->', currentIndex, index);
//     return videoData && videoData?.length === 1 && item && item?.mediaList ? (
//       <SingleReel
//         item={item}
//         index={index}
//         mute={mute}
//         currentIndex={currentIndex}
//       />
//     ) : (
//       <SingleReel
//         item={item}
//         index={index}
//         mute={mute}
//         currentIndex={currentIndex}
//         nextVideoUrl={index === nextVideoIndex ? nextVideoUrl : null}
//       />
//     );
//   };

//   return (
//     <SwiperFlatList
//       vertical={true}
//       onChangeIndex={handleChangeIndexValue}
//       data={videoData}
//       renderItem={renderItem}
//       keyExtractor={(index) => index.toString()}
//     />
//   );
// };

// export default ReelsComponent;

import React, { useState, useEffect, useCallback } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SingleReel from './singleReel';

const ReelsComponent = ({ videoData }) => {


  const [currentIndex, setCurrentIndex] = useState(0);
  const [mute, setMute] = useState(false);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [nextVideoUrl, setNextVideoUrl] = useState(null);
  console.log('video data', videoData);
  useEffect(() => {
    if (nextVideoIndex < videoData?.length) {
      const url = videoData[nextVideoIndex]?.mediaList ? videoData[nextVideoIndex]?.mediaList[0]?.url : '';
      if (url) {
        setNextVideoUrl(url);
      }
    }
  }, [currentIndex]);

  const handleChangeIndexValue = useCallback(({ index }) => {
    setCurrentIndex(index);
    setNextVideoIndex(index + 1);
  }, []);

  const renderItem = ({ item, index }) => {
    return videoData && videoData?.length === 1 && item && item?.mediaList ? (
      <SingleReel
        item={item}
        index={index}
        mute={mute}
        currentIndex={currentIndex}
      />
    ) : <>
        <SingleReel
          item={item}
          index={index}
          mute={mute}
          currentIndex={currentIndex}
          nextVideoUrl={videoData[nextVideoIndex]?.mediaList ? videoData[nextVideoIndex]?.mediaList[0]?.url : ''}
        />
    </>
  };

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videoData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ReelsComponent;
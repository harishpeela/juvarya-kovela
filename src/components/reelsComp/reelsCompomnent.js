
// import React, {useState} from 'react';
// import SwiperFlatList from 'react-native-swiper-flatlist';
// // import { videoData } from './Database';
// import SingleReel from './singleReel';
// const ReelsComponent = ({videoData}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [mute, setMute] = useState(false);
//   const handleChangeIndexValue = ({index}) => {
//     setCurrentIndex(index);
//   };

//   return (
//         <SwiperFlatList
//       vertical={true}
//       onChangeIndex={handleChangeIndexValue}
//       data={videoData}
//       renderItem={({item, index}) => (
//         <SingleReel item={item} index={index} onPress={() =>setMute(!mute) } mute={mute} currentIndex={currentIndex} />
//       )}
//       keyExtractor={(item, index) => index}
//     />
//   );
// };

// export default ReelsComponent;



// import React, { useRef, useState } from 'react';

// import SwiperFlatList from 'react-native-swiper-flatlist';

// import SingleReel from './singleReel';
 
// const ReelsComponent = ({ videoData }) => {

//   const swiperRef = useRef(null);

//   const [autoplayIndex, setAutoplayIndex] = useState(0);
 
//   const handleMomentumScrollEnd = (event, state, context) => {

//     if (state.index === autoplayIndex) {

//       setAutoplayIndex(state.index + 1);

//       swiperRef.current.scrollToIndex({ index: state.index + 1 });

//     }

//   };
 
//   return (

//     <SwiperFlatList

//       ref={swiperRef}

//       vertical={true}

//       data={videoData}

//       renderItem={({ item }) => <SingleReel item={item} />}

//       keyExtractor={(item, index) => index.toString()}

//       index={0} 

//       autoplayDelay={0}

//       autoplayLoop={false} 

//       autoplay={true} 

//       autoplayInterval={5000} 

//       onMomentumScrollEnd={handleMomentumScrollEnd}

//     />

//   );

// };
 
// export default ReelsComponent;

import React, { useState, useEffect } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SingleReel from './singleReel';

const ReelsComponent = ({ videoData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mute, setMute] = useState(false);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [nextVideoUrl, setNextVideoUrl] = useState(null);

  useEffect(() => {
    if (nextVideoIndex < videoData?.length) {
      const url = videoData[nextVideoIndex]?.mediaList[0]?.url;
      if (url) {
        setNextVideoUrl(url);
      }
    }
  }, [currentIndex]);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
    setNextVideoIndex(index + 1);
  };

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videoData}
      renderItem={({ item, index }) => (
        <SingleReel
          item={item}
          index={index}
          mute={mute}
          currentIndex={currentIndex}
          nextVideoUrl={index === nextVideoIndex ? nextVideoUrl : null}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ReelsComponent;

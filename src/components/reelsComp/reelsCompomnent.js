
import React, {useState} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
// import { videoData } from './Database';
import SingleReel from './singleReel';
const ReelsComponent = ({videoData}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mute, setMute] = useState(false);
  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };

  return (
        <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videoData}
      renderItem={({item, index}) => (
        <SingleReel item={item} index={index} onPress={() =>setMute(!mute) } mute={mute} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;
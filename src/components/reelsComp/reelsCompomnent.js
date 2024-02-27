import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Loader } from '../loader';
// import { videoData } from './Database';
import SingleReel from './singleReel';
import { GetReels } from '../../utils/api';
const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoData, setVideoData] = useState();
  const [loader, setLoader] = useState(false)
  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };

const reelsData = async () => {
  setLoader(true)
let result = await GetReels(0, 30);
console.log('reels', result?.data);
if(result?.status === 200){
  setVideoData(result?.data?.data)
  setLoader(false);
} else{
  setLoader(false)
}
}

useEffect(() => {
  reelsData();
},[]);
  return (
    <View>
      {loader ? (
        <Loader />
      ) : videoData ? (
        <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videoData}
      
      renderItem={({item, index}) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
      ) : (
        <Text> no data</Text>
      )}
    </View>
  );
};

export default ReelsComponent;
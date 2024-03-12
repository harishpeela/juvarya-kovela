
import React, { useState, useEffect, useCallback } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import SingleReel from './singleReel';
import RNFS from 'react-native-fs';
import { createThumbnail } from 'react-native-create-thumbnail';

const ReelsComponent = ({ videoData }) => {

  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mute, setMute] = useState(false);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [nextVideoUrl, setNextVideoUrl] = useState(null);
  const [nextDownloadedVideoURL, setNextDownloadedVideoURL] = useState(null);
  const [ tempURL , setTempURL] = useState(null);
  const [ tempThumbnailURL , setTempThumbnailURL] = useState(null);
  const [thumbnails, setThumbnails] = useState(null);
  console.log('videoData------->', videoData,currentIndex,nextVideoIndex,nextDownloadedVideoURL,nextVideoUrl)
  useEffect(() => {
    if (nextVideoIndex < videoData?.length) {
      const url = videoData[nextVideoIndex]?.mediaList ? videoData[nextVideoIndex]?.mediaList[0]?.url : '';
      if (url) {
        setNextVideoUrl(url);
      }
    }
    setNextDownloadedVideoURL(tempURL);
    // setThumbnails(tempThumbnailURL && tempThumbnailURL.path)
  }, [currentIndex]);

  useEffect(() => {
    const prefetchNextVideo = async () => { 
      if (currentIndex >= 0) {
        console.log('nextVIdoIndex--------->',currentIndex, nextVideoIndex, )
        try {
          const timestamp = new Date().getTime(); 
          const cachedVideoPath = `${RNFS.CachesDirectoryPath}/nextVideo_${nextVideoIndex}_${timestamp}.mp4`;
          const options = {
            fromUrl: currentIndex == 0 ? videoData[1]?.mediaList[0]?.url :nextVideoUrl,
            toFile: cachedVideoPath,
            background: true,
            progressDivider: 1,
          };
          const download = RNFS.downloadFile(options);
          download.promise.then(res => {
            if (res.statusCode === 200) {
              setTempURL(cachedVideoPath);
            }
          }).catch(error => {
            console.log('Download error:', error);
          });

          // // ThumbNail
          //   const thumbnail = await createThumbnail({
          //     url: currentIndex == 0 ? videoData[1]?.mediaList[0]?.url :nextVideoUrl,
          //     timeStamp: 500,
          //   });
          //   const thumbnailData = { path: thumbnail.path, loaded: false };
          //   setTempThumbnailURL(thumbnailData || null)
        } catch (error) {
          console.log('Error prefetching next video:', error.message)
        }

      }
    };
    prefetchNextVideo();
  }, [currentIndex]);

  const handleChangeIndexValue = useCallback(({ index }) => {
    setCurrentIndex(index);
    setNextVideoIndex(index + 1);
  }, []);

  const renderItem = ({ item, index }) => {
    return videoData && videoData?.length === 1 && item && item?.mediaList ? 
      <SingleReel
        item={item}
        index={index}
        mute={mute}
        currentIndex={currentIndex}
        thumbnail={thumbnails}
      />
    : 
      <SingleReel
        item={item}
        index={index}
        mute={mute}
        currentIndex={currentIndex}
        nextVideoUrl={videoData[nextVideoIndex]?.mediaList ? videoData[nextVideoIndex]?.mediaList[0]?.url : ''}
        nextDownloadedVideoPlayURL={nextDownloadedVideoURL}
        thumbnail={thumbnails}
      />
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

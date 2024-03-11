import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator, Text } from 'react-native';
import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

const SingleReel = ({ item, index, currentIndex, mute, nextVideoUrl }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [tempVideoPath, setTempVideoPath] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    const prefetchNextVideo = async () => {
      if (index === currentIndex && nextVideoUrl) {
        try {
          const cachedVideoPath = `${RNFS.CachesDirectoryPath}/nextVideo.mp4`;

          const options = {
            fromUrl: nextVideoUrl,
            toFile: cachedVideoPath,
            background: true,
            progressDivider: 1,
          };

          const download = RNFS.downloadFile(options);

          download.promise.then(res => {
            if (res.statusCode === 200) {
              console.log('Download completed!----->', cachedVideoPath,res);
              setTempVideoPath(cachedVideoPath);
              setIsLoading(false);
            } else {
              console.log('Download failed!');
              setIsLoading(false);
            }
          }).catch(error => {
            console.log('Download error:', error);
            setIsLoading(false);
          });
        } catch (error) {
          console.log('Error prefetching next video:', error.message);
          setIsLoading(false);
        }
      }
    };
    prefetchNextVideo();
  }, [index, currentIndex, nextVideoUrl]);
  
  const onBuffer = buffer => {
    setIsBuffering(buffer.isBuffering);
  };

  const onError = error => {
    console.log('Error loading video:', error);
    setIsBuffering(false);
  };

  const onLoad = () => {
    setIsBuffering(false);
  };

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={{
            position: 'absolute',
            zIndex: 1,
          }}
        />
      )}
      {!tempVideoPath && currentIndex === index &&
        <>
          <Text style={{ color: 'yellow' }}>AAAAAAAAAA</Text>
          <Video
            ref={videoRef}
            onBuffer={onBuffer}
            onError={onError}
            onLoad={onLoad}
            repeat={false}
            resizeMode="cover"
            source={{ uri: item?.mediaList[0]?.url }}
            muted={mute}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
        </>
      }
      {tempVideoPath && currentIndex === index &&
        <>
          <Text style={{ color: 'yellow' }}>BBBBBBBBBBB</Text>
          <Video
            ref={videoRef}
            onBuffer={onBuffer}
            onError={onError}
            onLoad={onLoad}
            repeat={false}
            resizeMode="cover"
            source={{ uri: tempVideoPath }}
            muted={mute}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
          />
        </>
      }
      <Ionic
        name="volume-mute"
        style={{
          fontSize: mute ? 20 : 0,
          color: 'white',
          position: 'absolute',
          backgroundColor: 'rgba(52,52,52,0.6)',
          borderRadius: 100,
          padding: mute ? 20 : 0,
        }}
      />
    </View>
  );
};

export default SingleReel;

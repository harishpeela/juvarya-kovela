import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator, Image, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import Ionic from 'react-native-vector-icons/Ionicons';


const SingleReel = ({ item, index, currentIndex, mute, nextDownloadedVideoPlayURL, thumbnail }) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const videoRef = useRef(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);
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
        <>
          <ActivityIndicator
            size="large"
            color="white"
            style={{
              position: 'absolute',
              zIndex: 1,
            }}
          />
          {thumbnail && <ImageBackground
            source={{ uri: thumbnail }}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          />}
        </>
      )}
      {!nextDownloadedVideoPlayURL && currentIndex === index &&
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
      }
      {nextDownloadedVideoPlayURL && currentIndex === index &&
        <Video
          ref={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          onLoad={onLoad}
          repeat={false}
          resizeMode="cover"
          source={{ uri: nextDownloadedVideoPlayURL }}
          muted={mute}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
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
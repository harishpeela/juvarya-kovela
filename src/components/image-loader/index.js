import FastImage from 'react-native-fast-image';
import React, {useState} from 'react';
import {Loader} from '..';
import {styles} from './style';

export const ImageLoader = ({imageStyle, url, resizeMode}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const getURl = params => {
    if (url === null || url === '' || url === undefined) {
      return require('../../../assets/images/bigTamle.png');
    } else if (isValid) {
      return {
        uri: url,
      };
    } else {
      return require('../../../assets/images/bigTamle.png');
    }
  };

  return (
    <>
      <FastImage
        resizeMode={resizeMode}
        style={imageStyle}
        onError={() => {
          setIsValid(false);
          setImageLoading(false);
        }}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        source={getURl()}
      />
      {imageLoading && <Loader size={'small'} dynmicStyle={styles.loader} />}
    </>
  );
};

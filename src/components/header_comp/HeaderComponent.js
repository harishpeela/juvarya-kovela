import React from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { StyleHeaderComponent } from './StyleHeaderComponent';
import { colors } from '../../common';

const HeaderComponent = ({
  titleName,
  rightFirstImage,
  rightSecondImage,
  onRightFirstImagePress,
  onRightSecondImagePress,
  containerStyle,
  subContainerStyle,
  titleNameStyle,
}) => {
  if (
    subContainerStyle?.backgroundColor == '#FFFFFF' ||
    subContainerStyle?.backgroundColor == '#ffffff'
  ) {
    subContainerStyle = {
      paddingBottom: '0.5%',
      backgroundColor: colors.white,
    };
  }

  return (
    <View style={[StyleHeaderComponent.innerContainerStyle, containerStyle]}>
      <View style={[StyleHeaderComponent.subContainerStyle, subContainerStyle]}>
        <View style={StyleHeaderComponent.titleViewStyle}>
          <Text
            style={[StyleHeaderComponent.titleTextStyle, titleNameStyle]}
            numberOfLines={1}
          >
            {titleName}
          </Text>
        </View>

        <View style={StyleHeaderComponent.rightContainer}>
          <TouchableOpacity
            onPress={onRightFirstImagePress}
            activeOpacity={0.5}
            style={StyleHeaderComponent.imageRightContainer}
          >
            <Image
              style={StyleHeaderComponent.imageStyleRightSub}
              source={rightFirstImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRightSecondImagePress}
            activeOpacity={0.5}
            style={StyleHeaderComponent.imageRightContainer}
          >
            <Image
              style={StyleHeaderComponent.imageStyleRightSub}
              source={rightSecondImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export { HeaderComponent };

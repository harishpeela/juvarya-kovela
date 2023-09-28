import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  followersView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '30%',
  },
  voidButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.gray4,
    // borderWidth: 1,
    marginRight: 7,
    width: 90,
    alignItems: 'center',
    text: {
      fontSize: 13,
      fontWeight: fontFamily.popinBold,
      color: 'black',
    },
  },
  followLoader: {
    width: 105,
    padding: 10,
    height: 38,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 4,
  },
  postText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 18,
  },
});

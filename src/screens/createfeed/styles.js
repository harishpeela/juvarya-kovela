import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  uploadContainer: {
    marginBottom: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  preViewImageContainer: {
    // borderWidth: 0.5,
    height: '70%',
    width: '100%',
  },
  crossIconContainer: {position: 'absolute', right: 5, zIndex: 100},
  preViewImage: {
    height: '40%',
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
  uploadPic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.orangeColor,
  },
});

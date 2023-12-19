import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  uploadContainer: {
    marginBottom: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  preViewImageContainer: {
    borderWidth: 0.5,
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  crossIconContainer: {position: 'absolute', right: 20, zIndex: 100},
  preViewImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 75,
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

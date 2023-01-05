import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.gray3,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  background: {
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: fontFamily.popinMedium,
    color: colors.green,
    textAlign: 'center',
  },
  flatListStyle: {
    // borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

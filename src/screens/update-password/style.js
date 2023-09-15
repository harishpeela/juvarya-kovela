import {StyleSheet, useColorScheme} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerContainer: {
    padding: 10,
    marginTop: 45
  },
  keyBoardStyle: {
    margin: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  },
  fieldContainer: {
    marginTop: -30,
  },
  buttonContainer: {
    marginTop: 15,
    width: '70%',
    alignSelf: 'center',
  },

  isLogin: {
    fontFamily: fontFamily.popinBold,
    color: colors.red3,
    paddingLeft: 50,
  },
});

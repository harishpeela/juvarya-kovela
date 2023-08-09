import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  inputTextStyle: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#F0EFF4',
    backgroundColor: '#F0EFF4',
    borderStyle: 'solid',
    fontSize: 15,
    borderRadius: 9,
    fontFamily: fontFamily.medium,
  },
  login: {
    fontFamily: fontFamily.medium,
    color: colors.white,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FD8C00',
    backgroundColor: '#FD8C00',
    borderStyle: 'solid',
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 11,
  },
});

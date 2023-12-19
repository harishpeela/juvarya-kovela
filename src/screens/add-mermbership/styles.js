import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';
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
    textTransform: 'uppercase',
  },
  loginText: {
    fontFamily: fontFamily.medium,
    color: colors.white,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
  DTextStyle: {
    fontFamily: fontFamily.popinRegular,
    fontSize: 15,
    color: colors.gray,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  DbuttonStyle: {
    height: 45,
    width: '92%',
    borderRadius: 5,
    backgroundColor: colors.gray4,
    alignSelf: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    borderWidth: 2,
    backgroundColor: '#FD8C00',
    height: 40,
    borderColor: '#FD8C00',
    borderStyle: 'solid',
    borderRadius: 12,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
});

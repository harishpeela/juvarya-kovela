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
  },
  loginText: {
    fontFamily: fontFamily.medium,
    color: colors.white,
    fontSize: 15,
    textAlign: 'center',
    fontSize:fontSize.large,
    fontWeight:'700'
  },
  btnContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:'85%',
    borderWidth:2,
    backgroundColor: '#FD8C00',
    height: 40,
    borderColor: '#FD8C00',
    borderStyle: 'solid',
    borderRadius:12,
    alignContent:'center',
    alignSelf:'center',
    marginTop:'5%',
  }
});

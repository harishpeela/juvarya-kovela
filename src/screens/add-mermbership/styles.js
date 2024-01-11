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
    textAlign: 'center'
  },
  headerContainer: {
    padding:10,
    backgroundColor:'#FFAB0F',
    height:100,
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  headingText:{
   marginRight:120,
   fontWeight:'bold',
   color:'#ffffff',
   fontSize:20
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
    fontWeight: '700',
  },
  DTextStyle: {
    fontFamily: fontFamily.popinRegular,
    fontSize: 15,
    color: colors.black,
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
  loginText: {
    fontWeight: 'bold',
    color: colors.white
  }
});

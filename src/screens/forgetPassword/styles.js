import {StyleSheet} from 'react-native';
import {colors, fontSize,fontFamily} from '../../common';

export const styles = StyleSheet.create({
  logoStyle: {
    height: 60,
    width: 20,
    backgroundColor: '#e4007c',
    marginTop: 10,
    borderRadius: 30,
    marginLeft: -10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    fontSize: 35,
    // fontFamily:'SedgwickAve-Regular',
    color: 'black',
    marginLeft: 15,
    marginTop: 10,
    height: 60,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  signupContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: '40%',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  Alrdmember: {
    fontSize: 15,
  },
  alrdContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  loginLink: {
    color: '#e4007c',
    marginLeft: 5,
    fontSize: 18,
    marginBottom: 20,
  },
  textinputContainer: {
    // borderWidth:0.3,
    borderRadius: 50,
    // height:responsiveScreenHeight(5),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 20,
    shadowColor: '#FFFFFF',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    backgroundColor: '#E5E4E2',
  },
  line: {
    borderWidth: 0.5,
    height: 30,
    marginLeft: 25,
  },
  textinput: {
    marginLeft: 20,
    fontSize: 14,
  },
  userIcon: {
    left: 10,
  },
  signupButton: {
    marginTop: 30,
    borderRadius: 20,
    height: 45,
    backgroundColor: 'orange',
    justifyContent: 'center',
    fontSize: 14,
  },
  signupText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
  emailIcon: {
    left: 10,
  },

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    marginBottom: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: '3%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loginTextLine: {
    borderTopWidth: 0.2,
    width: '90%',
    marginTop: '30%',
  },
  backButton: {
    marginTop: '2%',
    marginLeft: '2%',
  },
  emailContainer: {
    borderWidth: 2,
  },
  errorContainer: {
    borderColor: 'red',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: '500',
    fontSize: fontSize.small,
  },
  overlay: {
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'red',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // semi-transparent background
  },
  centeredView: {
    // borderWidth:2,
    // borderColor:'green',
    width:'85%',
    minHeight:'35%',
    borderRadius:10,
    backgroundColor: 'white',
    paddingHorizontal:5,
    justifyContent:'space-around',
    paddingVertical:20

  },
  otpContainer: {
    // borderWidth:2,
    // borderColor:'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color:colors.gray,
    fontSize:fontSize.small
  },
  otpTextInput:{
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    height: 40,
    width: 40,
    fontSize: 14,
    margin: 5,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
  },
  emailText:{
    color:colors.black,
    marginHorizontal:5
  },
  btnContainer: {

  },
  expectOtp: {
    color: colors.green2,
    fontFamily: fontFamily.popinRegular,
    fontSize: 10,
    marginHorizontal:5

  },
  black: {
    color: colors.black,
  },
  buttonContainer:{
    marginTop:10
  },
  timeContainer:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});

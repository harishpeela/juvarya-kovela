import {StyleSheet, useColorScheme} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor:'white'
  },
  topBarCard: {
    minHeight: '20%',
  },
  headerContainer: {
    padding: 10,
  },
  preViewImageContainer: {
    height: 50,
    width: 50,
    borderRadius: '50%',
  },
  preViewImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: colors.orangeColor,
  },
  profileContainer: {
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'auto',
    height: '10%',
    alignContent: 'center',
    paddingTop: '10%',
    width: '20%',
    borderRadius: 50,
    bottom: '5%',
    marginLeft: '40%',
  },
  // uploadPic: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 3,
  //   borderColor: colors.orangeColor,
  //   borderRadius: 120 / 2,
  //   padding: 1,
  // },
  profileImage: {
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    bottom: '30%',
  },
  editProfile: {
    bottom: '50%',
    left: '62%',
    // position: 'absolute',
  },
  keyBoardStyle: {
    margin: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    margin: 10,
    flex: 1,
    marginTop: '0%',
    justifyContent: 'center',
  },
  fieldContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  TextStyle: {
    fontSize: 10,
  },
  buttonStyle: {
    color: colors.black,
    height: 30,
  },
  genderText: {
    marginRight: 325,
    color: colors.orangeColor,
    fontWeight: 'normal',
    marginBottom: 8,
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
  centeredButtonContainer: {
    marginTop: '10%',
  },
  pickerContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.orangeColor,
  },
  pickerStyle: {
    height: 40,
    width: '100%',
    color: colors.orangeColor,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 45,
    width: '80%',
    marginHorizontal: '10%',
    marginTop: '10%',
  },
  dropdownStyle: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  textStyle: {
    fontSize: 12,
    marginRight: '40%',
    color: colors.gray,
  },
  errors: {
    color: 'red',
    marginLeft: '10%',
    marginTop: 2,
  },
});

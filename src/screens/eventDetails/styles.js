import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize } from '../../common';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.white,
    // borderWidth:3,
    // borderColor:'red'
  },
  header: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '2%',
    justifyContent: 'space-between'
  },
  secondContainer: {
    marginTop: 150,
    flexDirection: 'column',
    width: '100%',
    paddingTop: '5%',
    shadowColor: colors.black,
    // borderWidth:5,
    // borderColor:'red',
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 5,
    height: '68%'
  },
  locationIcon: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  festivalText: {
    color: colors.black,
    fontSize: fontSize.h3,
    fontWeight: '700',
    marginVertical: '1%',
  },
  dateText: {
    color: colors.orangeColor,
    fontSize: fontSize.medium,
    fontWeight: '700',
  },
  buttonContainer: {
    height: '6%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',
    marginBottom: 5,
  },
  button: {
    width: '95%',
    height: '90%',
    backgroundColor: colors.orangeColor,
    alignSelf: 'center',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  btnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: fontSize.h6,
  },
  dateAndLocation: {
    flexDirection: 'row',
    // borderWidth:2,
    // borderColor:'red',
    // marginHorizontal: '1%',
  },
  secondContainer2: {
    marginHorizontal: '3%',
    // borderWidth:2,
  },
  locText: {
    color: colors.gray,
    fontSize: fontSize.small,
    fontWeight: '500',
  },
  round: {
    backgroundColor: colors.white,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2
  },
  round2: {
    backgroundColor: colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 3,
  },
  toggleContainer: {
    width: '100%',
    flexDirection: 'column',
    marginTop: '6%',
    height: '80%',
    // borderWidth:2,
    // borderColor:'blue'
  },
  separateContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  separateContainerText: {
    textAlign: 'center',
    color: colors.gray2,
    fontSize: fontSize.large,
    fontWeight: '600',
    paddingVertical: 2,
  },
  toggleHead: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // borderWidth:2,
    // marginHorizontal:'4%'
  },
  orangeColor: {
    borderBottomWidth: 1.5,
    borderColor: colors.orangeColor,
    color: colors.black,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  desContainer: {
    marginHorizontal: '5%',
  },
  des: {
    color: colors.black,
    fontSize: fontSize.h5,
    fontWeight: '700',
    paddingVertical: 5,
  },
  desData: {
    color: colors.black,
    fontStyle: fontFamily.PoetsenOneRegular,
  },
  formContainer: {
    // borderWidth:1,
  },
  registrationText: {
    color: colors.black,
    textAlign: 'center',
    fontSize: fontSize.h4,
    fontWeight: '600',
    marginVertical: '5%',
  },
  formik: {
    paddingHorizontal: '10%',
  },
  inputAndBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  toggleData: {
    marginBottom: 200,
    // borderWidth:5
  },
  subBtn: {
    backgroundColor: colors.orangeColor,
    elevation: 2,
    marginTop: '8%',
    paddingVertical: 10,
    borderRadius: 25,
    width: '90%',
    alignSelf: 'center',
  },
  subBtnText: {
    color: colors.white,
    fontWeight: '900',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fontSize.h6,
  },
  locationContainer: {
    // borderWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  locationText: {
    color: colors.black,
    fontSize: fontSize.h4,
  },
  intButton: {
    backgroundColor: colors.orangeColor,
    width: '95%',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    paddingHorizontal: '2%',
    paddingVertical: '1.5%',
    elevation: 2,
    shadowColor: colors.black,
    alignItems:'center',
    justifyContent:'center',
    marginTop:5
  },
  locationText:{
    textAlign:'center',
    marginTop:100
  },
  intButtonText:{
    color:colors.white,
    fontWeight:'700',
    fontSize:fontSize.h6
  },
  favoriteContainer:{
    flexDirection:'column',
    alignItems:'center',
    // justifyContent:'space-around',
    marginHorizontal:10,
    // borderWidth:2,
    // borderColor:'red'
  },
  eventNameContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  interestedText:{
    color:colors.black,
    textAlign:'center',
    fontWeight:'700',
    fontSize:fontSize.large
  }
});

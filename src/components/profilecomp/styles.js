import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileView: {
    width: 80,
    height: 80,
    borderColor: '#FFA001',
    borderWidth: 2,
    borderRadius: 40,
  },
  footerHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    // textTransform: 'capitalize',
  },
  ratingText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
  },
  subFooterHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // marginTop: 10,
  },
  footerBody: {
    // paddingTop: 20,
  },
  desciption: {
    fontSize: 16,
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  footerAction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
  },
  Icon: {
    // borderWidth:2,
    borderColor: 'red',
    alignContent: 'center',
    alignSelf: 'center',
    color: colors.gray2,
  },
  followLoader: {
    width: 105,
    padding: 10,
    height: 38,
    backgroundColor: '#FFA001',
    borderRadius: 10,
    marginRight: 4,
  },
  voidButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderColor: '#585858',
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000',
    },
  },
  controlPanelContainer:{
    // borderWidth:1,
  },
  controlPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '2%',
    width: '100%',
    // borderBottomWidth: 0.5,
    marginBottom: '0.5%',
    justifyContent: 'space-between',
    padding: '1%',
    // alignItems: 'center',
    item: {
      width: '22%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth:1,
      paddingVertical: 4,
      text: {
        fontSize: 18,
      },
      postText: {
        fontSize: 16,
        marginLeft: '10%',
      },
    },
  },
});

export const style = (bgColor, radius, paddidng, width, borderWidth) =>
  StyleSheet.create({
    wrapper: {
      width: width || '27%',
      padding: paddidng || 15,
      borderRadius: radius || 10,
      backgroundColor: bgColor || '',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
      borderWidth: borderWidth || 0,
    },
    profileView: {
      width: 80,
      height: 80,
      borderColor: '#FFA001',
      borderWidth: 2,
      borderRadius: 40,
    },
  });
export const textStyles = (textColor, fontSize) =>
  StyleSheet.create({
    textTitle: {
      fontSize: fontSize || 11,
      color: textColor || colors.white,
      fontFamily: fontFamily.popinBold,
      textTransform: 'uppercase',
    },
  });

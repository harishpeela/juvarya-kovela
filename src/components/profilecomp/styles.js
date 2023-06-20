import {StyleSheet} from 'react-native';
import { colors, fontFamily } from '../../common';
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
    fontSize: 24,
    fontWeight: '600',
  },
  ratingText: {
    fontSize: 20,
  },
  subFooterHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  footerBody: {
    paddingTop: 20,
  },
  desciption: {
    fontSize: 14,
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  footerAction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
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
    borderWidth: 1,
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000',
    },
  },
  controlPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    item: {
      alignItems: 'center',
      text: {
        paddingVertical: 5,
      },
      selectedText: {
        paddingVertical: 5,
      },
    },
  },

});

export const style = (bgColor, radius, paddidng, width) =>
  StyleSheet.create({
    wrapper: {
      width: width || '30%',
      padding: paddidng || 15,
      borderRadius: radius || 10,
      backgroundColor: bgColor || colors.blue,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 6,
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
      fontSize: fontSize || 14,
      color: textColor || colors.white,
      fontFamily: fontFamily.popinBold,
      textTransform: 'uppercase',
    },
  });
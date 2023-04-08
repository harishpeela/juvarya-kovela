import {StyleSheet, Dimensions} from 'react-native';
import {colors, fontFamily} from '../../common';
const windowWidth = Dimensions.get('window').width;
export const textStyles = (textColor, fontSize) =>
  StyleSheet.create({
    textTitle: {
      fontSize: fontSize || 14,
      color: textColor || colors.white,
      fontFamily: fontFamily.popinBold,
      textTransform: 'uppercase',
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
  });
export const styles = StyleSheet.create({
  backgroundImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  imagePanel: {
    backgroundColor: 'rgba(88, 88, 88, 0.8)',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    item: {
      marginHorizontal: 4,
    },
  },
  boldText: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingText: {
    fontSize: 14,
  },
  footerBackground: {
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  footerContainer: {
    paddingHorizontal: 30,
  },
  sliderTooltip: {
    borderWidth: 8 * StyleSheet.hairlineWidth,
    borderRadius: 10 * StyleSheet.hairlineWidth,
    // marginHorizontal: 0.43 * windowWidth,
    marginVertical: 17,
    width: 50,
    marginLeft: '40%',
  },
  circularButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFA001',
    text: {
      fontSize: 13,
      fontWeight: '400',
      color: 'white',
    },
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFA001',
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: 'white',
    },
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
  footerHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerBody: {
    paddingTop: 20,
  },
  subFooterHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  footerAction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
  },
  controlPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderBottomColor: '#585858',
    borderBottomWidth: 0.5,
    item: {
      alignItems: 'center',
      text: {
        paddingVertical: 5,
        color: '#585858',
      },
    },
  },
  contentDisplay: {
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 15,
      col: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(88, 88, 88, 0.2)',
        borderRadius: 20,
      },
    },
  },
});

import {StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {Dimensions} from 'react-native';
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
  noposttext: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  backgroundImage: {
    flex: 1,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 24,
    fontWeight: '600',
  },
  ratingText: {
    fontSize: 20,
  },
  footerBackground: {
    backgroundColor: '#fff',
    borderRadius: 25,
    flex: 1,
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    marginTop: '5%',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contentDisplay: {
    paddingVertical: 10,
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
      col: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(88, 88, 88, 0.2)',
        borderRadius: 20,
      },
    },
  },
  sliderTooltip: {
    borderColor: '#FFA001',
    borderWidth: 8 * StyleSheet.hairlineWidth,
    borderRadius: 10 * StyleSheet.hairlineWidth,
    marginHorizontal: 0.43 * windowWidth,
    marginVertical: 17,
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
    width: 90,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFA001',
    alignItems: 'center',
    marginRight: 7,
    text: {
      fontSize: 12,
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
    marginTop: 10,
  },
  footerBody: {
    paddingTop: 20,
  },
  subFooterHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
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
  desciption: {
    fontSize: 14,
    lineHeight: 18,
    textTransform: 'capitalize',
  },
  controlPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    // borderBottomWidth: 0.5,
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
    profileView: {
      width: 80,
      height: 80,
      borderColor: '#FFA001',
      borderWidth: 2,
      borderRadius: 40,
    },
  });

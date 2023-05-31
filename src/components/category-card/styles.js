import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    marginVertical: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 0.62,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // borderWidth: 2,
  },
  img: {
    width: '100%',
    height: undefined,
    flex: 1,
    justifyContent: 'center',
    // borderRadius: 10,
  },
  imgContainer: {
    height: 220,
    // borderWidth: 2,
    width: '100%',
  },
  borderRadiusIcon: {
    borderRadius: 25,
  },
  borderRadiusImg: {
    // borderRadius: 10,
  },
  date: {
    fontFamily: fontFamily.popinRegular,
    color: colors.gray,
    fontSize: 10,
  },
  topTittleContainer: {
    flex: 0.75,
  },
  followContainer: {
    flex: 0.25,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  contentItem1: {
    paddingVertical: 12,
    // borderWidth: 2,
  },
  headerItem2: {
    marginLeft: 16,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  footerContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    // borderWidth: 2,
  },
  footerItem: {
    // flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerItemMarginLeft: {
    marginLeft: 28,
  },
  colorBlack: {
    color: colors.black,
  },
  iconText: {
    color: colors.black,
    fontFamily: fontFamily.popinRegular,
    fontSize: 12,
    marginLeft: 3,
  },
  flex1: {
    flex: 1,
  },
  boldText: {
    fontFamily: fontFamily.popinMedium,
  },
  greenColor: {
    color: colors.green,
  },
  colorBlue: {
    color: colors.blue,
  },
  iconSize: {
    height: 40,
    width: 40,
  },
  postContainer: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },

  //  button Container of navbar
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 50,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 11,
    paddingHorizontal: 4,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: '400',
  },

  // side bar icon styling
  sidebarIcon: {
    width: 24,
    height: 13,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bar: {
    height: 2,
    backgroundColor: '#000',
  },
  shortestBar: {
    width: 12,
  },
  mediumBar: {
    width: 16,
  },
  longestBar: {
    width: 20,
  },

  underline: {
    backgroundColor: 'red',
    height: 2,
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 21,
    fontWeight: '600',
    color: '#000',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 15,
  },
  bellIcon: {
    alignSelf: 'center',
  },
  // post styling
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  postMenuButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  sponsorNameText: {
    fontWeight: '500',
    color: '#919191',
    fontSize: 11,
  },
  mediaContainer: {
    width: '100%',
    height: 300,
    marginTop: 10,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  image1: {
    width: '70%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  postFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 12,
  },
  caption: {
    marginTop: 1,
    fontSize: 10,
  },
});

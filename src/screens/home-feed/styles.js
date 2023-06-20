import {StyleSheet, Platform} from 'react-native';
import { colors } from '../../common';

const styles = StyleSheet.create({
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
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 11,
    paddingHorizontal: 4,
    marginLeft: 5
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
    marginLeft: 10,
  },
  bar: {
    height: 2,
    backgroundColor: colors.orangeColor,
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
  circle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 25,
    borderColor: colors.orangeColor,
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
    right: 10,
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
    // marginBottom: 10,
  },
  image: {
    width: '100%',
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
    paddingHorizontal: 10,
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
  nodataView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  nodatatext: {
    fontSize: 24,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  }
});

export default styles;

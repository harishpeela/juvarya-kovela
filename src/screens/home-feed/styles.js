import {StyleSheet} from 'react-native';
import {colors} from '../../common';

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  flatListStyle: {backgroundColor: 'white'},
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-5%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginHorizontal: '3%',
  },
  button: {
    paddingVertical: 11,
    paddingHorizontal: 4,
    marginLeft: 5,
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: '400',
  },
  sidebarIcon: {
    width: 24,
    height: 13,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bar: {
    height: 2,
    backgroundColor: colors.white,
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
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
    borderColor: colors.black2,
    backgroundColor: '#ffffff',
    borderRadius: 35 / 2,
  },
  bellIcon: {
    alignSelf: 'center',
  },
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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.orangeColor,
  },
  notificationDot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: colors.orangeColor,
    position: 'absolute',
    top: 4,
    left: 20,
  },
  flatListStyle: {
  },
  homeCard: {
    // borderWidth:10,
    // borderColor:'red'
  },
  userIcon: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 1,
    backgroundColor: 'white',
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 1,
    backgroundColor: 'white',
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    left: 18,
    padding: 1,
  }
});

export default styles;

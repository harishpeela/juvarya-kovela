/* eslint-disable react-hooks/rules-of-hooks */
import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  container: {
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
  postContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  button: {
    paddingVertical: 11,
    paddingHorizontal: 4,
  },
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
    marginLeft: '3%',
    marginTop: 5,
    fontSize: 14,
    textTransform: 'capitalize',
    color: 'black',
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
    alignItems: 'center',
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

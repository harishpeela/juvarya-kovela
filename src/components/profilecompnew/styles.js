import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  followersView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '30%',
  },
  voidButton: {
    flexDirection: 'row',
    height: 40,
    width: 100,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voidButton2: {
    flexDirection: 'row',
    height: 40,
    width: 140,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voidButtonText: {
    color: '#CC4501',
    fontSize: 14,
    fontWeight: '600',
  },

  voidButton1: {
    flexDirection: 'row',
    height: 40,
    width: 130,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  voidButton1Text: {
    color: '#CC4501',
    marginLeft: '24%',
    fontSize: 12,
    fontWeight: '600',
  },
  followLoader: {
    width: 105,
    padding: 10,
    height: 38,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 4,
  },
  postText: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 18,
  },
  postText1: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  button: {
    elevation: 2,
    backgroundColor: 'white',
    shadowColor: 'black', // Shadow color
    shadowOffset: {width: 2, height: 2}, // Shadow offset
    marginBottom: '1%',
    marginTop: '1%',
  },
  feedContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  followingContainer: {
    alignSelf: 'center',
  },
});

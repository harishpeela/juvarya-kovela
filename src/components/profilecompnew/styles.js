import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
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
    borderWidth: 0.5,
    alignItems: 'center'
  },
  voidButton1: {
    flexDirection: 'row',
    height: 40,
    width: 170,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 0.5,
    alignItems: 'center',
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
    lineHeight: 18,
    fontWeight: 'bold',
  },
});

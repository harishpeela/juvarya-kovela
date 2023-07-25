import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  profileContainer: {
    marginTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    textTransform: 'capitalize',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoutbtnContainer: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
  },
  iconContainer: {flex: 0.15},
  textContainer: {flex: 0.85},
  profileItemsContainer: {
    marginTop: 20,
  },
  itemText1: {
    fontSize: 18,
    fontFamily: fontFamily.popinMedium,
    color: colors.black,
    textTransform: 'capitalize',
    marginLeft: '10%'
  },
  preViewImageContainer: {
    borderWidth: 0.5,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  crossIconContainer: {position: 'absolute', right: 10, zIndex: 100},
  preViewImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 75,
  },
  uploadPic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editPic: {
    backgroundColor: colors.orangeColor,
    height: '8%',
    width: '50%',
    position: 'absolute',
    left: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

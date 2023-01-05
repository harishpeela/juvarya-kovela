import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: 'white',
    // margin: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imgContainer: {
    height: 200,
    width: '100%',
    // borderWidth: 1,
  },
  img: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.gray2,
  },
  titleContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    // borderWidth: 1,
  },
  locationWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    // borderWidth: 1,
  },
  heartContainer: {
    // height: 20,
    // width: 25,
    // marginLeft: 5,
    // borderWidth: 1,
    flex: 0.1,
  },
  nameContainer: {
    // borderWidth: 1,
    flex: 0.9,
  },
  locationContainer: {
    height: 20,
    width: 20,
    marginRight: 2,
  },
  icon: {
    flex: 1,
    height: undefined,
    width: '100%',
  },
  title: {
    flex: 2,
    fontFamily: fontFamily.popinBold,
    color: colors.black,
    fontSize: 12,
  },
  flex2: {
    flex: 2,
    fontFamily: fontFamily.popinRegular,
    color: colors.gray,
    fontSize: 10,
  },
  starContainer: {
    margin: 10,
    zIndex: 100,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    // width: 80,
    backgroundColor: colors.white,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 25,
  },
  reviewText: {
    marginLeft: 5,
    fontFamily: fontFamily.popinRegular,
    color: colors.black,
  },
});

import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent:'space-between',
    alignContent: 'center',
    alignItems: 'center',
    // borderWidth:2,
  },
  followersListCard: {
    // borderWidth: 2,
  },
  listItemContainer: {
    borderRadius: 10,
    padding: 12,
    borderColor: 'lightgray',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    // borderBottomColor: 'black',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imageContainer: {
    display: 'flex',
    height: 70,
    width: 70,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.orangeColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listFirstItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '75%',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 70 / 2,
    borderWidth: 2,
    borderColor: colors.orangeColor,
  },
  firstName: {
    fontSize: fontSize.small,
    color: colors.black,
    marginBottom: '3%',
  },
  textContainer: {
    width:'auto',
    height: 'auto',
    display: 'flex',
    // borderWidth:2
  },
  donationText: {
    color: 'black'
  }
});

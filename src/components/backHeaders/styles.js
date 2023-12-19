import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  header: {
    // borderWidth:2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 7,
    borderRadius: 100,
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.orangeColor,
    marginLeft: 5,
    elevation: 3,
    shadowColor: colors.black,
    marginHorizontal: 15,
  },
});

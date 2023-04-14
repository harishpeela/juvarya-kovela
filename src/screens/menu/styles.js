import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
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
    color: colors.orangeColor,
  },
  mediumBar: {
    width: 16,
  },
  longestBar: {
    width: 20,
  },

  footerBackground: {
    backgroundColor: '#fff',
    borderRadius: 25,
    flex: 1,
  },
  tabs: {
    fontSize: 24,
    color: 'black',
    marginVertical: 10,
  },
});

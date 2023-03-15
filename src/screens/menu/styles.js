import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
    fontSize: 28,
    color: 'black',
    marginVertical: 10,
  },
});

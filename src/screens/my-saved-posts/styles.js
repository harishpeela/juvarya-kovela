import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  footerBackground: {
    backgroundColor: '#fff',
    borderRadius: 25,
    flex: 1,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 30
  },
});

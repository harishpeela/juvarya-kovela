import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  tabView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  tabtext: {
    textTransform: 'capitalize',
    fontSize: 18,
  },
  backArrow: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: -5,
    marginLeft: '6%',
  },
});

import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '2%',
    justifyContent: 'space-between'
  },
});
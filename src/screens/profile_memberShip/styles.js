import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 20,
    borderColor: colors.orangeColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  nomemship: {
    alignSelf: 'center',
    marginTop: '40%',
  },
  type: {fontSize: 18},
});

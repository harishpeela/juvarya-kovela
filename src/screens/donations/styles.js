import {StyleSheet} from 'react-native';
import { colors } from '../../common';
export const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1},
  header: {he: '10%', marginTop: '3%'},
  secondTab: {
    backgroundColor: '#FFF3E5',
    margin: 10,
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 20,
    padding: 15,
    width: '90%',
    borderRadius: 10,
    backgroundColor: colors.orangeColor,
    alignItems: 'center',
    marginBottom: 30,
  },
  butText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

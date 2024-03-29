import {StyleSheet} from 'react-native';
import {windowHeight} from '../../utils/config/config';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    marginHorizontal: 5,
  },
  subFormContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  subFormHeading: {
    fontSize: 18,
    fontWeight: '500',
  },
  subFormElement: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 25,
  },
  choiceText: {
    fontSize: 18,
    color: '#7995AA',
  },
  mapContainer: {
    marginVertical: 10,
    backgroundColor: 'rgba(88, 88, 88, 0.3)',
    height: 150,
    borderRadius: 20,
  },
});

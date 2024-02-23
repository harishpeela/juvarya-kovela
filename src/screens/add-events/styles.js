import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    backgroundColor:'white'
  },

  imgCard: {
    height: 120,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  camera: {
    height: 20,
    width: 20,
  },
  calenderView: {
    borderWidth: 0.5,
    padding: 15,
    marginHorizontal: '10%',
    marginTop: '2%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  keyBoardStyle: {
    width: '100%',
    flex: 1,
    backgroundColor: 'green',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconContainer: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
});

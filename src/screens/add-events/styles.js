import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '32%',
    width: '100%',
  },
  imgCard: {
    position: 'absolute',
    height: '20%', width: '90%',
    top: '10%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    
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
    backgroundColor: 'green'
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

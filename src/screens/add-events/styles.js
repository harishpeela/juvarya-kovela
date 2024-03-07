import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    backgroundColor:'white'
  },

  imgCard: {
    height: 110,
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
    height: 60,
    width: 60,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  DTextStyle: {
    fontFamily: fontFamily.popinRegular,
    fontSize: 15,
    color: colors.black,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  DbuttonStyle: {
    height: 45,
    width: '85%',
    borderRadius: 5,
    backgroundColor: colors.gray4,
    alignSelf: 'center',
  },
});

import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  overlay: {
    // borderWidth:2,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // semi-transparent background
  },
  centeredView: {
    // padding:'10%',
    alignItems: 'center',
    marginTop:'16%',
    marginHorizontal: '7%', 
  },
  modalView: {
    // borderWidth:1,
    // borderColor:colors.gray,
    borderRadius:1,
    padding:'5%',
    backgroundColor: 'white',
    // width: '100%',
    // height: '20%', // alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    justifyContent:'flex-end',
    alignContent:'flex-end',
    alignSelf:'flex-end',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color:colors.gray,
    fontSize:fontSize.small
  },
});

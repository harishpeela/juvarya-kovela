import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    // paddingVertical: 10,
    // paddingHorizontal: 10,
  },
  // noAvailable: {
  //   fontFamily: fontFamily.popinBold,
  // },
  searchbarContainer: {
    
    bottom:'45%',
    width:1,
    // backgroundColor:'black',
    marginLeft:'10%'
    
  },
  
  loaderContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:'-15%'
  },
  bellContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    margin: 8,
    marginTop: '5%',
  },
  bell: {marginLeft: 10, marginTop: 10},
  flatListStyle: {
    paddingBottom: 200,
  },
  loaderContainer1: {
    height: '50%',
    position: 'absolute',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop:'-15%'
    left: '28%',
    top: '100%'
  },
});

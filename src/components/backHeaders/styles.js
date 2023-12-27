import {StyleSheet} from 'react-native';
import {colors} from '../../common';
import { color } from 'react-native-reanimated';
export const styles = StyleSheet.create({
  header: {
    // borderWidth:2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:-80,
    padding:24,
    backgroundColor:colors.orangeColor,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    color:colors.white

    },
  iconContainer: {
    padding:2,
    borderRadius: 100,
    alignContent: 'center',
    alignSelf: 'center',
    
  
    // elevation:3,
    // shadowOffset:{
    //   width:1,
    //   height:1
    // },
    // shadowColor:colors.black,
    // backgroundColor:colors.white,
  },
  notificationContainer:{
  
  },
  notificationText:{
              fontSize: 20,
              fontWeight: '500',
              marginHorizontal: 100,
              color:'black',
              justifyContent:'center',     
  }
});

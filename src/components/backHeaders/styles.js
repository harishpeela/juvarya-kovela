import {StyleSheet} from 'react-native';
import {colors} from '../../common';
import { color } from 'react-native-reanimated';
export const styles = StyleSheet.create({
  header: {
    // borderWidth:2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    },
    backheader: {
      backgroundColor: colors.orangeColor,
      borderRadius: 100,
      padding:10,

    },
  iconContainer: {
    padding:2,
    borderRadius: 100,
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor:colors.orangeColor,
  },
  notificationText:{
              fontSize: 20,
              fontWeight: '500',
              marginHorizontal: 100,
              color:'black',
              justifyContent:'center',     
  },
});

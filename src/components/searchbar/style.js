import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,    
    
  },

  field: {
    flex: 1,
    color: colors.black,
    fontFamily: fontFamily.popinRegular,
    fontSize: 14,
    padding: 8,
    height: 40,
  },
  iconContainer: {
    paddingLeft:8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },
});

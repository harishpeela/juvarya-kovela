import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent:'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  followersListCard: {
    // borderWidth: 2,
  },
  listItemContainer: {
    borderRadius: 10,
    padding: 12,
    borderColor: 'lightgray',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    width: '15%',
  },
  listFirstItem: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    width: '76%',
    borderBottomWidth: 0.8,
    borderBottomColor: colors.gray2,
    // borderWidth:1,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 70 / 2,
    borderWidth: 2,
    borderColor: colors.orangeColor,
  },
  firstName: {
    fontSize: fontSize.large,
    color: colors.black,
    marginBottom:5
    
  },
  textContainer: {
    width:'auto',
    height: 'auto',
    display: 'flex',
    // borderWidth:2
  },
  donationText:{
    color:colors.black,
    fontSize:fontSize.small
  },
  premiumText:{
    fontSize:fontSize.small,
    color:colors.green,
    fontWeight:'900'
  },
  textContainer2:{
    flexDirection:'row',
    alignItems:'center'
  }
});

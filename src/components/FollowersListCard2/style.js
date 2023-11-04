import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent:"space-between",
    alignContent:'center',
    alignItems:'center'
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
    alignItems:'center',
  },
  imageContainer:{
    display:'flex',
    width:'15%'
  },
  listFirstItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:"100%",
    width:'75%',
    borderBottomWidth:.8,
    borderBottomColor:colors.gray2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 70 / 2,
    borderWidth: 2,
    borderColor: colors.orangeColor,
  },
  firstName:{
    fontSize:fontSize.small,
    color:colors.black,
    marginBottom:'3%',
  },
  donationText:{
    fontSize:fontSize.xxsmall,
    color:colors.gray2
  },
  textContainer:{
    width:"60%",
    height:'auto',
    display:'flex',
  },


});

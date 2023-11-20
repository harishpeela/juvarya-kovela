import {StyleSheet} from 'react-native';
import {colors, fontFamily, fontSize} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignContent:'center',
    alignSelf:'center',
    width:'100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingHorizontal:'3%'
  },
  profileContainer: {
    // borderWidth:2,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight:'auto',
    height:'30%',
    alignContent:'center',
    paddingTop:"10%"
  },
  logoutbtnContainer: {
    marginTop:"45%",
    width: '50%',
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:"center",
    // borderWidth:2,
  },
  versionText:{
    color:colors.gray2,
    // borderWidth:2,
    fontSize:fontSize.small

  },
  profileItemsHeader:{
    alignItems:'center',
    justifyContent:'center',
    // borderWidth:2,

  },
  iconContainer: {flex: 0.15},
  profileItemsContainer: {
    width:'60%',
    borderColor:'red',
  },
  preViewImageContainer: {
    height: 80,
    width: 80,
    borderRadius: "50%",
  },
  profileImage:{
    alignContent: 'center',
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
  crossIconContainer: {position: 'absolute', right: 10, zIndex: 100},
  preViewImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 75,
  },
  uploadPic: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:3,
    borderColor:colors.orangeColor,
    borderRadius:(100+20)/2,
    padding:1

  },
  editPic: {
    backgroundColor: colors.orangeColor,
    height: '8%',
    width: '50%',
    position: 'absolute',
    left: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loader: {
    alignItems: 'center',
    height: 100,
    width: 100,
    justifyContent: 'center',
  },
});

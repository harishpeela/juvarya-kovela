import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginTop:10
  },
  profileContainer: {
    // borderWidth:2,
    flexDirection: 'column',
    alignItems: 'center',
    // minHeight: 'auto',
    height: '30%',
    alignContent: 'center',
    // paddingTop: '10%',
  },
  editPic: {
    backgroundColor: colors.orangeColor,
    height: '6%',
    width: '40%',
    position: 'absolute',
    left: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    fontSize: 10,
  },
  // uploadPic: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderWidth: 3,
  //   borderColor: colors.orangeColor,
  //   borderRadius: 120 / 2,
  //   padding: 1,
  // },
  preViewImageContainer: {
    height: 80,
    width: 80,
    borderRadius: '50%',
  },
  header: {
    marginTop: '7%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '1.5%',
  },
  uploadContainer: {
    marginTop: '6%',
  },
  crossIconContainer: {position: 'absolute', right: -5, zIndex: 100},
  preViewImage: {
    height: 100,
    width: 100,
    // flex: 1,
    borderRadius: 100 / 2,
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: colors.orangeColor,
  },
  loader: {
    alignItems: 'center',
    height: 100,
    width: 100,
    justifyContent: 'center',
  },
  uploadPic: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.orangeColor,
    borderRadius: 120 / 2,
    padding: 1,
  },
  profileImage: {
    alignContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    justifyContent: 'center',
  },
  modal: {
    // height: 400,
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
  },
  model: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '70%',
  },
  modalContent: {
    flexDirection: 'row',
    // borderWidth:1,
    alignItems: 'center',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginHorizontal: '3%',
    paddingVertical: 5,
  },
  modalContentText: {
    fontSize: fontSize.large,
    paddingHorizontal: 15,
    color: colors.black2,
  },
  logoutbtnContainer: {
    marginTop: '1%',
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth:2,
  },
  tabs: {
    marginTop: '4%',
    fontSize: 12,
    marginVertical: 10,
    color: colors.gray4,
  },
  iconContainer: {flex: 0.15},
  profileItemsContainer: {
    width: '60%',
    borderColor: 'red',
  },
  profileItemsHeader: {
    marginLeft: 10
    // borderWidth:2,
  },
});

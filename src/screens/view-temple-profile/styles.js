import {StyleSheet} from 'react-native';
import {colors, fontSize} from '../../common';
export const styles = StyleSheet.create({
  maincontainer: {flex: 1},
  scrolledcontainer: {flex: 1},
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileView: {
    width: 80,
    height: 80,
    borderColor: '#FFA001',
    borderWidth: 2,
    borderRadius: 40,
  },
  firstTabView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  noposttext: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 24,
    fontWeight: '600',
  },
  footerBackground: {
    borderRadius: 25,
    flex: 1,
  },
  footerContainer: {
    paddingHorizontal: 10,
    paddingTop: 30,
    marginTop: '5%',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth:2,
    paddingHorizontal: '1%',
  },
  menuAndAlert: {
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between',
  },
  menu: {
    borderWidth: 0.1,
    borderColor: colors.gray,
    padding: 1,
    backgroundColor: 'white',
    marginLeft: '5%',
  },
  contentDisplay: {
    // borderWidth: 1,
    // margin: 10,
  },
  noPosts: {
    borderWidth: 1,
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100 / 2,
    marginTop: '20%',
    text: {
      fontSize: 18,
      alignSelf: 'center',
      marginTop: 10,
    },
  },
  followtab: {
    flexDirection: 'row',
    // marginTop: '3%',
    justifyContent: 'space-around',
  },
  disPlayContent: {
    marginTop: '-60%',
    paddingVertical: 10,
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
      col: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(88, 88, 88, 0.2)',
        borderRadius: 20,
      },
    },
  },
  titleHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'icomoon',
    color: '#CC4501',
    marginTop: 20,
    textTransform: 'capitalize',
  },
  eventsCard: {
    borderWidth: 1,
    padding: 20,
    marginHorizontal: 10,
    margin: 2,
  },
  ratingText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  bell: {
    backgroundColor: 'white',
    borderRadius: 28 / 2,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellText: {color: 'white', fontWeight: 'bold', alignSelf: 'center'},
  notificationNum: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#CC4501',
    position: 'absolute',
    top: -5,
    left: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingContainer: {
    borderWidth: 20,
  },
  ImagesContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.gray2,
    // paddingTop:'1%',
  },
  horizontalContainer: {
    // borderWidth:2,
  },
  plusContainer: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  modal: {
    height: 250,
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
  line: {
    height: 5,
    alignContent: 'center',
    alignSelf: 'center',
    width: '13%',
    backgroundColor: colors.gray,
    marginVertical: '3%',
    borderRadius: 3,
  },
  postsTab: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    margin: 30,
  },
  seasonal: {
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: colors.orangeColor
  },
  seasonalText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

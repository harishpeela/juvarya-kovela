import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
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
  },
  contentDisplay: {
    // height: '56%',
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
  notificationNum: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: colors.orangeColor,
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
    paddingTop: '1%',
  },
  horizontalContainer: {
    // borderWidth:2,
  },
});

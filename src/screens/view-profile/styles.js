import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  maincontainer: {flex: 1, backgroundColor: 'white'},
  scrolledcontainer: {flex: 1, backgroundColor: 'white'},
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
    justifyContent: 'space-between',
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
  ratingText: {
    fontSize: 20,
  },
  footerBackground: {
    backgroundColor: '#fff',
    borderRadius: 25,
    flex: 1,
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    marginTop: '5%',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contentDisplay: {
    height: '55%',
    marginLeft: 20,
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
    marginTop: '3%',
    alignItems: 'center',
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
});

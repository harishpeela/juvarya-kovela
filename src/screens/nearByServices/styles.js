import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  heading: {
    margin: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15%'
  },
  container: {flex: 1},
  backArrowButton: {
    borderRadius: 20,
    padding: 3,
    backgroundColor: '#f7dcdc',
  },
  headText: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: '15%',
  },
  planCardView1: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: '#FFB3B3',
    elevation: 3,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.2,
    width: 200,
    height: 150,
  },
  cardContainer: {
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: 'lightgray',
  },
  searchTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    width: '75%',
    marginLeft: 30,
  },
  searchTextInput: {fontSize: 18, maxWidth: '75%'},
  iconfeed: {
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  searchTabMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '10%',
    backgroundColor: 'green',
  },
  postView: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
    borderRadius: 20,
    backgroundColor: 'lightgray',
    marginVertical: '2%',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 40,
  },
  description: {
    marginLeft: '5%',
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  noposts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noposttext: {
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
});

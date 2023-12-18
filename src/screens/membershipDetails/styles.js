import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  img: {
    height: '30%',
    width: '100%',
  },
  iconContainer: {
    padding: 7,
    borderRadius: 100,
    backgroundColor: colors.orangeColor,
    marginLeft: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  round2: {
    marginLeft: '85%',
  },
  dataContainer: {
    height: '80%',
    borderRadius: 20,
    elevation: 5,
    backgroundColor: colors.white,
    position: 'absolute',
    width: '100%',
    top: '28%',
  },
  headerView: {
    position: 'absolute',
    top: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '3%',
  },
  container: {
    margin: 10,
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  id: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
    color: 'black',
    textTransform: 'capitalize',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabText: {
    fontWeight: '500',
  },
  data: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

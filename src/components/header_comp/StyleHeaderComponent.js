import { StyleSheet } from 'react-native';
import { colors } from '../../common';

const StyleHeaderComponent = StyleSheet.create({
  innerContainerStyle: {
    flexDirection: 'row',
    width: '100%',
  },
  subContainerStyle: {
    backgroundColor: colors.orangeColor,
    flexDirection: 'row',
    width: '100%',
    paddingTop: '3%',
    paddingBottom: '3%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleViewStyle: {
    flex: 1,
  },
  titleTextStyle: {
    color: colors.white,
    fontSize: 17,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginRight: '2.5%',
  },
  imageRightContainer: {
    padding: '1%',
    paddingRight: '1.5%',
  },
  imageStyleRightSub: {
    height: '8%',
    width: '8%',
  },
});

export { StyleHeaderComponent };

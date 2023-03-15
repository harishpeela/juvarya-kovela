import {StyleSheet} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import {Dimensions} from 'react-native';
export const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backgroundImage: {
    flex: 1,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePanel: {
    backgroundColor: 'rgba(88, 88, 88, 0.8)',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    item: {
      marginHorizontal: 4,
    },
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
  },
  footerContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  contentDisplay: {
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
  sliderTooltip: {
    borderColor: '#FFA001',
    borderWidth: 8 * StyleSheet.hairlineWidth,
    borderRadius: 10 * StyleSheet.hairlineWidth,
    marginHorizontal: 0.43 * windowWidth,
    marginVertical: 17,
  },
  circularButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFA001',
    text: {
      fontSize: 13,
      fontWeight: '400',
      color: 'white',
    },
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FFA001',
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: 'white',
    },
  },
  voidButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderColor: '#585858',
    borderWidth: 1,
    marginRight: 7,
    text: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000',
    },
  },
  footerHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerBody: {
    paddingTop: 20,
  },
  subFooterHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
  },
  footerAction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20,
  },
  controlPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderBottomColor: '#585858',
    borderBottomWidth: 0.5,
    item: {
      alignItems: 'center',
      text: {
        paddingVertical: 5,
      },
      selectedText: {
        paddingVertical: 5,
      },
    },
  },
});

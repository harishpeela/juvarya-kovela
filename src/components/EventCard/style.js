
import { StyleSheet } from "react-native"
import { colors, fontSize } from "../../common"
import { ceil } from "react-native-reanimated"

export const styles = StyleSheet.create({
  Container: {
    height: '100%',

  },
  ImagesContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.gray2,
    // paddingTop:'1%',
  },
  eventsCard: {
    height: 80,
    marginHorizontal: 10,
    borderRadius: 4,
    // borderRadius:(100)/2,
    elevation: 2,
    shadowColor: colors.black,
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: colors.gray2,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  leftContainer: {
    width: '17%',
    height: "90%",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: (100 + 20) / 2,
    borderWidth: 1.5,
    borderColor: colors.orangeColor,
    padding: 1,
  },
  rightContainer: {
    width: "80%",
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  Image: {
    height: "100%",
    width: "100%",
    borderRadius: (100 + 20) / 2,
  },
  firstContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsContainer: {
    flexDirection: 'row',
    width: "20%",
    justifyContent: 'space-around',
    alignItems: "center",
    // justifyContent:'center',
  },
  locationContainer: {
    flexDirection: 'row',
  },
  lastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconText: {
    color: colors.black,
    marginHorizontal: 3,
  },
  lastContainer2: {
    flexDirection: 'row',
  },
  firstContainerText: {
    color: colors.black,
    fontSize: fontSize.medium
  },
  locationText: {
    color: colors.black,
    marginHorizontal: 3,
  }

})
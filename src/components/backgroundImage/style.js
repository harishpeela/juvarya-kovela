import { StyleSheet } from "react-native";import { colors } from "../../common";
;

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200, // adjust as needed
    height: 150, // adjust as needed
    zIndex: -1, // to position the image behind the feed screen content
  },
  backgroundA: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%', // adjust as needed
    height: 220, // adjust as needed
    zIndex: -1, // to position the image behind the feed screen content
    alignSelf: 'center',
    alignContent: "center",
  },
  backgroundImage2Container: {
    width: "100%",
    backgroundColor:colors.black,
  },
  backgroundImage2: {
    position: 'absolute',
    top: -10,
    right: 0,
    width: '100%', // adjust as needed
    height: 300, // adjust as needed
    zIndex: -1, // to position the image behind the feed screen content
    // alignSelf: 'center',
    // alignContent: "center",
    resizeMode: 'cover',
    borderWidth: 3
  },
  backgroundFlower: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 160, // adjust as needed
    height: 180, // adjust as needed
    zIndex: -1, // to position the image behind the feed screen content
  },
});
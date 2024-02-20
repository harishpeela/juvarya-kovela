import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF3E5',
        padding: "2%",
        borderRadius:5,
      },
      textContainer:{
      width:'95%'
      },
      second: {
        width: 'auto',
        maxWidth:'65%',
        flexDirection: 'row',
        alignItems: 'center',
      },
      secondText: {
        fontSize: 14,
        color: colors.black,
        paddingLeft:10,
        fontWeight: 'bold'
      },
      rs: {color: colors.black, fontWeight: 'bold', fontSize: 16, paddingLeft:10
    },
     
})
import { StyleSheet } from "react-native"
import { colors } from "../../common"

export const styles = StyleSheet.create({
    buttonContainer:{
        borderWidth:1,
        padding:2,
        justifyContent:'space-around',
        borderColor:colors.orangeColor,
        elevation:2,
        borderRadius:20,
        shadowOffset:{
            width:1,
            height:1,
        },
        backgroundColor:'#FFF3E5',
        shadowColor:'black'
    },
    third: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius:10,
        padding:2,
      },
})

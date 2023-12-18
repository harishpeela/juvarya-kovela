import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSize } from '../../common'



export const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor:colors.orangeColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.orangeColor,
        shadowColor: colors.black,
        shadowRadius: 5, 
        // elevation:4,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        // paddingHorizontal:'1%',
        paddingVertical:'2%',
        marginHorizontal:'1%',
        marginVertical:'1%',
        width:'23%'
    },
    btnText:{
        color:colors.white,
        textAlign:'center',
        fontWeight:'900',
        fontSize:fontSize.small
    }

})
import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSize } from '../../common'



export const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor:colors.orangeColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: colors.orangeColor3,
        shadowColor: colors.black,
        shadowRadius: 5, 
        // elevation:4,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        paddingHorizontal:'4%',
        paddingVertical:'2%',
        marginHorizontal:'1%',
        marginVertical:'1%'
    },
    btnText:{
        color:colors.orangeColor,
        textAlign:'center',
        fontWeight:'400',
        fontSize:fontSize.small
    }

})
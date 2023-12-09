import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../common'

export const styles = StyleSheet.create({
    container:{
        // borderWidth:1,
        

    },
    input:{
        borderWidth:1,
        borderRadius:10,
        borderColor:colors.gray,
        backgroundColor:colors.gray4
    },
    inputText:{
        color:colors.black,
        paddingVertical:3,
        paddingHorizontal:3
    }
})
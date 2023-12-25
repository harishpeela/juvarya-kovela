import { StyleSheet} from 'react-native'
import { colors, fontSize } from '../../common'

export const styles = StyleSheet.create({
    Header:{
        marginTop:"12%",
        marginHorizontal:10
    },
    textInputContainer:{
        marginHorizontal:'7%',
        marginTop:30
    },
    textInput:{
        borderWidth:1,
        borderRadius:15,
        borderColor:colors.black
    },
    subBtn: {
        backgroundColor: colors.orangeColor,
        elevation:2,
        marginTop:'8%',
        paddingVertical:10,
        borderRadius:25,
        width:'70%',
        alignSelf:'center'
    },
    subBtnText: {
        color: colors.white,
        fontWeight: '900',
        alignContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize:fontSize.h6
    },
    email:{
        color:colors.black,
        marginHorizontal:7,
        marginVertical:5,
        fontSize:fontSize.large,
        fontWeight:'600'
    },
    container:{
        backgroundColor:colors.white,
        height:'100%'
    },
    errorContainer:{
        alignItems:'center'
    },
    errorText:{
        color:'red',
        fontWeight:'600'
    }

})
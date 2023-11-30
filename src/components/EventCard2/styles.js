import { StyleSheet } from 'react-native'
import { colors } from '../../common'

export const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor:colors.orangeColor,
        height: '13%',
        width: '100%',
        borderRadius: 5,
        elevation: 9,
        backgroundColor: 'white',
        shadowColor:colors.black,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    leftContainer: {
        width: '30%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // borderWidth: 3,
        // borderColor: colors.orangeColor

    },
    rightContainer: {
        // borderWidth: 1,
        width: '65%',
        justifyContent:'space-around',
    },
    Image: {
        height: '95%',
        width: "95%",
        borderWidth:2,
        borderColor:colors.orangeColor
    },
    dateContainer:{
        flexDirection:'row',
        // borderWidth:1,
        justifyContent:'space-between',
        width:"95%"
    },
    hrLine:{
        borderWidth:0.2,
        borderColor:colors.gray
    },
    text:{
        color:colors.black
    }

})